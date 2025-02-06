import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface Bodies {
  id: number;
  name: string;
  image: string;
}

export interface UseBodiesStoreIterface {
  bodies: Bodies[];
  bodiesError: unknown;
  bodiesLoading: boolean;
  getBodies: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useBodiesStore = create<UseBodiesStoreIterface>((set) => ({
  bodies: [],
  bodiesError: null,
  bodiesLoading: false,
  getBodies: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ bodiesLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/bodies?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const bodies = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        bodies,
        bodiesError: null,
        bodiesLoading: false,
      });
    } catch (err) {
      set({
        bodies: [],
        bodiesError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching bodies" : "Unexpected error occurred!",
        bodiesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
