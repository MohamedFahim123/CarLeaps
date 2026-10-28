import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface AdStates {
  id: number;
  name: string;
}

export interface UseAdStatesStoreIterface {
  adStates: AdStates[];
  adStatesError: unknown;
  adStatesLoading: boolean;
  adStatesErrorOccurred: boolean;
  getAdStates: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useAdStatesStore = create<UseAdStatesStoreIterface>((set, get) => ({
  adStates: [],
  adStatesError: null,
  adStatesLoading: false,
  adStatesErrorOccurred: false,
  getAdStates: async () => {
    const { adStates, adStatesErrorOccurred } = get();

    if (adStates.length > 0 || adStatesErrorOccurred) {
      return;
    }

    const currentTime: number = new Date().getTime();

    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ adStatesLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/ad-states?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const adStates = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        adStates,
        adStatesError: null,
        adStatesLoading: false,
        adStatesErrorOccurred: false,
      });
    } catch (err) {
      set({
        adStates: [],
        adStatesError: axios.isAxiosError(err)
          ? err?.response?.data?.message || "Error fetching adStates"
          : "Unexpected error occurred!",
        adStatesLoading: false,
        adStatesErrorOccurred: true,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
