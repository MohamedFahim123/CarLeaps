import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface Transmissions {
  id: number;
  name: string;
}

export interface UseTransmissionsStoreIterface {
  transmissions: Transmissions[];
  transmissionsError: unknown;
  transmissionsLoading: boolean;
  getTransmissions: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useTransmissionsStore = create<UseTransmissionsStoreIterface>((set) => ({
  transmissions: [],
  transmissionsError: null,
  transmissionsLoading: false,
  getTransmissions: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ transmissionsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/transmissions?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const transmissions = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        transmissions,
        transmissionsError: null,
        transmissionsLoading: false,
      });
    } catch (err) {
      set({
        transmissions: [],
        transmissionsError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching transmissions" : "Unexpected error occurred!",
        transmissionsLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
