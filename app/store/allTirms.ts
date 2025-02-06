import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface Trims {
  id: number;
  name: string;
  model: string;
  model_id: number;
  image: string;
}

export interface UseTrimsStoreIterface {
  trims: Trims[];
  trimsError: unknown;
  trimsLoading: boolean;
  getTrims: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useTrimsStore = create<UseTrimsStoreIterface>((set) => ({
  trims: [],
  trimsError: null,
  trimsLoading: false,
  getTrims: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ trimsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/trims?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const trims = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        trims,
        trimsError: null,
        trimsLoading: false,
      });
    } catch (err) {
      set({
        trims: [],
        trimsError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching trims" : "Unexpected error occurred!",
        trimsLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
