import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface FuelTypes {
  id: number;
  name: string;
  image: string;
}

export interface UseFuelTypesStoreIterface {
  fuelTypes: FuelTypes[];
  fuelTypesError: unknown;
  fuelTypesLoading: boolean;
  getFuelTypes: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useFuelTypesStore = create<UseFuelTypesStoreIterface>((set) => ({
  fuelTypes: [],
  fuelTypesError: null,
  fuelTypesLoading: false,
  getFuelTypes: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ fuelTypesLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/fuel-types?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const fuelTypes = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        fuelTypes,
        fuelTypesError: null,
        fuelTypesLoading: false,
      });
    } catch (err) {
      set({
        fuelTypes: [],
        fuelTypesError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching fuelTypes" : "Unexpected error occurred!",
        fuelTypesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
