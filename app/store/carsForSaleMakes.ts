import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";

export interface Incentive {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  type: string;
  expires: string;
}

export interface CarsForSaleMakesCars {
  id: number;
  name: string;
  description: string;
  image: string;
  cover: string;
  status: string;
  incentives: Incentive[];
}

export interface UseCarsForSaleMakesCarsStoreIterface {
  carsForSalemakesCars: CarsForSaleMakesCars[];
  carsForSalemakesCarsError: unknown;
  carsForSalemakesCarsLoading: boolean;
  hasFetchError: boolean;
  currRegion?: string;
  setMakeRegion: (region: string) => void;
  getCarsForSaleMakesCars: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCarsForSaleMakesCarsStore =
  create<UseCarsForSaleMakesCarsStoreIterface>((set, get) => ({
    carsForSalemakesCars: [],
    carsForSalemakesCarsError: null,
    carsForSalemakesCarsLoading: false,
    currRegion: Cookies.get("region"),
    setMakeRegion: (region: string) => {
      set({ currRegion: region, hasFetchError: false });
      lastFetchedTime = 0;
      get().getCarsForSaleMakesCars();
    },
    hasFetchError: false,

    getCarsForSaleMakesCars: async () => {
      const { hasFetchError, currRegion } = get();
      const currentTime: number = new Date().getTime();

      if (hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ carsForSalemakesCarsLoading: true });

      try {
        const res = await axios.get(`${baseUrl}/city-makes?t=${currentTime}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            code: currRegion || MainRegionName,
          },
        });

        const carsForSalemakesCars = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          carsForSalemakesCars,
          carsForSalemakesCarsError: null,
          carsForSalemakesCarsLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          carsForSalemakesCars: [],
          carsForSalemakesCarsError: axios.isAxiosError(err)
            ? err?.response?.data?.message ||
              "Error fetching carsForSalemakesCars"
            : "Unexpected error occurred!",
          carsForSalemakesCarsLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
