import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface Cities {
  id: number;
  name: string;
  code: string;
  country_id: string;
  country: string;
  currency: string;
}

export interface UseCitiesStoreIterface {
  cities: Cities[];
  citiesError: unknown;
  citiesLoading: boolean;
  getCities: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCitiesStore = create<UseCitiesStoreIterface>((set) => ({
  cities: [],
  citiesError: null,
  citiesLoading: false,
  getCities: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ citiesLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/cities?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const cities = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        cities,
        citiesError: null,
        citiesLoading: false,
      });
    } catch (err) {
      set({
        cities: [],
        citiesError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching cities" : "Unexpected error occurred!",
        citiesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
