import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { Car } from "./CarsForSale";

export interface SearchData {
  condition?: string;
  make?: string;
  model?: string;
  fuel_type?: string;
  body?: string;
}

export interface UseSearchCarsStoreIterface {
  carsSearch: Car[];
  carsSearchError: unknown;
  carsSearchLoading: boolean;
  currentRegion?: string;
  getCarsSearch: (data: SearchData) => Promise<void>;
}

export const useSearchCarsStore = create<UseSearchCarsStoreIterface>(
  (set, get) => ({
    carsSearch: [],
    carsSearchError: null,
    carsSearchLoading: false,
    currentRegion: Cookies.get("region"),
    getCarsSearch: async (data) => {
      const currentTime: number = new Date().getTime();
      const regionCode = get().currentRegion;

      if (!regionCode) {
        Cookies.set("region", MainRegionName);
      }

      set({ carsSearchLoading: true });

      try {
        const res = await axios.post(
          `${baseUrl}/cars?t=${currentTime}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              code: regionCode || MainRegionName,
            },
          }
        );

        const carsSearch = res?.data?.data?.cars || [];

        set({
          carsSearch,
          carsSearchError: null,
          carsSearchLoading: false,
        });
      } catch (err) {
        set({
          carsSearch: [],
          carsSearchError: axios.isAxiosError(err)
            ? err?.response?.data?.message
            : "Error fetching carsSearch",
          carsSearchLoading: false,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  })
);
