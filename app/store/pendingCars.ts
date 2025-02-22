import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";
import { CarsTypes, Links, Meta } from "./activecars";
import { useTokenStore } from "./Token";

export interface PendingCars {
  cars: CarsTypes[];
  meta: Meta;
  links: Links;
  pages: string[];
}

export interface UsePendingCarsStoreInterface {
  pendingCars: PendingCars | null;
  pendingCarsError: unknown;
  pendingCarsLoading: boolean;
  getPendingCars: () => Promise<void>;
  searchCars: (params: string) => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const usePendingCars = create<UsePendingCarsStoreInterface>((set) => ({
  pendingCars: null,
  pendingCarsError: null,
  pendingCarsLoading: false,
  getPendingCars: async () => {
    const currentTime: number = new Date().getTime();
    const { token } = useTokenStore.getState();

    if (!token) {
      return;
    }
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ pendingCarsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/dealer/pending-cars?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const pendingCars = res?.data?.data || [];

      lastFetchedTime = currentTime;

      set({
        pendingCars,
        pendingCarsError: null,
        pendingCarsLoading: false,
      });
    } catch (err) {
      set({
        pendingCars: null,
        pendingCarsError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching PendingCars" : "Unexpected error occurred!",
        pendingCarsLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
  searchCars: async (params) => {
    const { token } = useTokenStore.getState();
    try {
      const response = await axios.post(
        `${baseUrl}/dealer/search-pending-cars`,
        { name: params },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const pendingCars = response?.data?.data || [];
      set({
        pendingCars,
        pendingCarsError: null,
        pendingCarsLoading: false,
      });
    } catch (error) {
      toast.error("Failed to search car");
      console.error(error);
    }
  },
}));
