import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import Cookies from "js-cookie";

export interface CarsForSaleBoodies {
  id: number;
  name: string;
  image: string;
}

export interface UseCarsForSaleBoodiesStoreIterface {
  carsForSaleBoodies: CarsForSaleBoodies[];
  carsForSaleBoodiesError: unknown;
  carsForSaleBoodiesLoading: boolean;
  hasFetchError: boolean;
  currRegion?: string;
  setBoodiesRegion: (region: string) => void;
  getCarsForSaleBoodies: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCarsForSaleBoodiesStore =
  create<UseCarsForSaleBoodiesStoreIterface>((set, get) => ({
    carsForSaleBoodies: [],
    carsForSaleBoodiesError: null,
    carsForSaleBoodiesLoading: false,
    setBoodiesRegion: (region: string) => {
      set({ currRegion: region, hasFetchError: false });
      lastFetchedTime = 0;
      get().getCarsForSaleBoodies();
    },
    currRegion: Cookies.get("region"),
    hasFetchError: false,

    getCarsForSaleBoodies: async () => {
      const { hasFetchError, currRegion } = get();
      const currentTime: number = new Date().getTime();

      if (hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ carsForSaleBoodiesLoading: true });

      try {
        const res = await axios.get(`${baseUrl}/city-bodies?t=${currentTime}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            code: currRegion || MainRegionName,
          },
        });

        const carsForSaleBoodies = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          carsForSaleBoodies,
          carsForSaleBoodiesError: null,
          carsForSaleBoodiesLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          carsForSaleBoodies: [],
          carsForSaleBoodiesError: axios.isAxiosError(err)
            ? err?.response?.data?.message ||
              "Error fetching carsForSaleBoodies"
            : "Unexpected error occurred!",
          carsForSaleBoodiesLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
