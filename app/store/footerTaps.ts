import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";

export interface FooterTap {
  id: number;
  name: string;
  city_id: string;
  city_name: string;
  items: {
    id: number;
    title: string;
    link: string;
  }[];
}

export interface UseFooterTapsStoreIterface {
  footerTaps: FooterTap[];
  footerTapsError: unknown;
  footerTapsLoading: boolean;
  hasFetchError: boolean;
  getFooterTaps: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useFooterTapsStore = create<UseFooterTapsStoreIterface>(
  (set, get) => ({
    footerTaps: [],
    footerTapsError: null,
    footerTapsLoading: false,
    hasFetchError: false,

    getFooterTaps: async () => {
      const { hasFetchError } = get();
      const currentTime: number = new Date().getTime();
      const currRegion: string = Cookies.get("region") || MainRegionName;

      if (hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ footerTapsLoading: true });

      try {
        const res = await axios.get(`${baseUrl}/footer-taps?t=${currentTime}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            code: currRegion,
          },
        });

        const footerTaps = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          footerTaps,
          footerTapsError: null,
          footerTapsLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          footerTaps: [],
          footerTapsError: axios.isAxiosError(err)
            ? err?.response?.data?.message || "Error fetching footer taps"
            : "Unexpected error occurred!",
          footerTapsLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  })
);
