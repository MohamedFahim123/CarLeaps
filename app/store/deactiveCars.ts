import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";
import { CarsTypes, Links, Meta } from "./activecars";
import { useTokenStore } from "./Token";

export interface DeactiveCars {
  cars: CarsTypes[];
  meta: Meta;
  links: Links;
  pages: string[];
}

export interface UseDeactiveCarsStoreInterface {
  deactiveCars: DeactiveCars | null;
  deactiveCarsError: unknown;
  deactiveCarsLoading: boolean;
  hasFetchError: boolean;
  getDeactiveCars: () => Promise<void>;
  searchCars: (params: string) => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useDeactiveCars = create<UseDeactiveCarsStoreInterface>((set, get) => ({
  deactiveCars: null,
  deactiveCarsError: null,
  deactiveCarsLoading: false,
  hasFetchError: false,

  getDeactiveCars: async () => {
    const { hasFetchError } = get();
    const currentTime: number = new Date().getTime();
    const { token } = useTokenStore.getState();

    if (!token) {
      return;
    }

    if (hasFetchError) {
      console.warn("Skipping fetch due to previous error.");
      return;
    }

    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ deactiveCarsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/dealer/deactive-cars?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const deactiveCars = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        deactiveCars,
        deactiveCarsError: null,
        deactiveCarsLoading: false,
        hasFetchError: false,
      });
    } catch (err) {
      set({
        deactiveCars: null,
        deactiveCarsError: axios.isAxiosError(err)
          ? err?.response?.data?.message || "Error fetching DeactiveCars"
          : "Unexpected error occurred!",
        deactiveCarsLoading: false,
        hasFetchError: true,
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
        `${baseUrl}/dealer/search-deactive-cars`,
        { name: params },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const deactiveCars = response?.data?.data || [];

      set({
        deactiveCars,
        deactiveCarsError: null,
        deactiveCarsLoading: false,
        hasFetchError: false,
      });
    } catch (error) {
      toast.error("Failed to search car");
      console.error(error);
    }
  },
}));
