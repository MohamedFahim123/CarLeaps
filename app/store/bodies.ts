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
  hasFetchError: boolean;
  getBodies: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useBodiesStore = create<UseBodiesStoreIterface>((set, get) => ({
  bodies: [],
  bodiesError: null,
  bodiesLoading: false,
  hasFetchError: false,

  getBodies: async () => {
    const { hasFetchError } = get();
    const currentTime: number = new Date().getTime();

    if (hasFetchError) {
      console.warn("Skipping fetch due to previous error.");
      return;
    }

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
        hasFetchError: false,
      });
    } catch (err) {
      set({
        bodies: [],
        bodiesError: axios.isAxiosError(err)
          ? err?.response?.data?.message || "Error fetching bodies"
          : "Unexpected error occurred!",
        bodiesLoading: false,
        hasFetchError: true,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
