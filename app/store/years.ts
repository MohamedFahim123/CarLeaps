import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface Years {
  id: number;
  name: string;
}

export interface UseYearsStoreIterface {
  years: Years[];
  yearsError: unknown;
  yearsLoading: boolean;
  hasFetchError: boolean;
  getYears: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useYearsStore = create<UseYearsStoreIterface>((set, get) => ({
  years: [],
  yearsError: null,
  yearsLoading: false,
  hasFetchError: false,

  getYears: async () => {
    const { hasFetchError } = get();
    const currentTime: number = new Date().getTime();

    if (hasFetchError) {
      return;
    }

    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      set({ yearsLoading: false });
      return;
    }

    set({ yearsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/years?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const years = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        years,
        yearsError: null,
        yearsLoading: false,
        hasFetchError: false,
      });
    } catch (err) {
      set({
        years: [],
        yearsError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching years" : "Unexpected error occurred!",
        yearsLoading: false,
        hasFetchError: true,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
