import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { Car } from "./CarsForSale";
import { useResearchCarsMakesStore } from "./ResearchCarMakes";

export interface CPOCarsInterface {
  body_id: number;
  body_name: string;
  cars: Car[];
}

export interface UseCPOCarsStoreInterface {
  CPOCars: CPOCarsInterface[];
  CPOCarsError: unknown;
  CPOCarsLoading: boolean;
  hasFetchError: boolean;
  getCPOCars: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCPOCarsStore = create<UseCPOCarsStoreInterface>((set, get) => ({
  CPOCars: [],
  CPOCarsError: null,
  CPOCarsLoading: false,
  hasFetchError: false,

  getCPOCars: async () => {
    const { currRegion } = useResearchCarsMakesStore.getState();
    const currentTime: number = new Date().getTime();

    if (!currRegion) {
      Cookies.set("region", MainRegionName);
    }

    if (get().hasFetchError) {
      console.warn("Skipping fetch due to previous error.");
      return;
    }

    if (
      lastFetchedTime !== 0 &&
      currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME
    ) {
      return;
    }

    set({ CPOCarsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/cpo-cars?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          code: currRegion || MainRegionName,
        },
      });

      const CPOCarsCars = res?.data?.data || [];

      lastFetchedTime = currentTime;

      set({
        CPOCars: CPOCarsCars,
        CPOCarsError: null,
        CPOCarsLoading: false,
        hasFetchError: false,
      });
    } catch (err) {
      set({
        CPOCars: [],
        CPOCarsError: axios.isAxiosError(err)
          ? err?.response?.data?.message
          : "Error fetching CPOCars",
        CPOCarsLoading: false,
        hasFetchError: true,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
