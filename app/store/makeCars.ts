import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface MakesCars {
  id: number;
  name: string;
  description: string;
  image: string;
  cover: string;
  status: string;
}

export interface UseMakesCarsStoreIterface {
  makesCars: MakesCars[];
  makesCarsError: unknown;
  makesCarsLoading: boolean;
  getMakesCars: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useMakesCarsStore = create<UseMakesCarsStoreIterface>((set) => ({
  makesCars: [],
  makesCarsError: null,
  makesCarsLoading: false,
  getMakesCars: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ makesCarsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/makes?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const makesCars = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        makesCars,
        makesCarsError: null,
        makesCarsLoading: false,
      });
    } catch (err) {
      set({
        makesCars: [],
        makesCarsError: axios.isAxiosError(err)
          ? err?.response?.data?.message || "Error fetching makesCars"
          : "Unexpected error occurred!",
        makesCarsLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
