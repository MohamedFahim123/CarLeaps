import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";
import { Features } from "./features";

export interface Trims {
  id: number;
  name: string;
  model: string;
  model_id: number;
  image: string;
  features: Features;
}

export interface UseTrimsStoreIterface {
  trims: Trims[];
  trimsError: unknown;
  trimsLoading: boolean;
  hasFetchError: boolean;
  getTrims: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useTrimsStore = create<UseTrimsStoreIterface>((set, get) => ({
  trims: [],
  trimsError: null,
  trimsLoading: false,
  hasFetchError: false,

  getTrims: async () => {
    const { hasFetchError } = get();
    const currentTime: number = new Date().getTime();

    if (hasFetchError) {
      console.warn("Skipping fetch due to previous error.");
      return;
    }

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
        hasFetchError: false,
      });
    } catch (err) {
      set({
        trims: [],
        trimsError: axios.isAxiosError(err)
          ? err?.response?.data?.message || "Error fetching trims"
          : "Unexpected error occurred!",
        trimsLoading: false,
        hasFetchError: true,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
