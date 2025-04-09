import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { Car } from "./CarsForSale";
import { useResearchCarsMakesStore } from "./ResearchCarMakes";

export interface UseResearchCarsAuthorizedStoreInterface {
  researchCarsAuthorized: Car[];
  researchCarsAuthorizedError: unknown;
  researchCarsAuthorizedLoading: boolean;
  hasFetchError: boolean;
  getResearchCarsAuthorized: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useResearchCarsAuthorizedStore =
  create<UseResearchCarsAuthorizedStoreInterface>((set, get) => ({
    researchCarsAuthorized: [],
    researchCarsAuthorizedError: null,
    researchCarsAuthorizedLoading: false,
    hasFetchError: false,

    getResearchCarsAuthorized: async () => {
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

      set({ researchCarsAuthorizedLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/authorized-cars?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              code: currRegion || MainRegionName,
            },
          }
        );

        const researchCarsAuthorizedCars = res?.data?.data?.cars || [];

        lastFetchedTime = currentTime;

        set({
          researchCarsAuthorized: researchCarsAuthorizedCars,
          researchCarsAuthorizedError: null,
          researchCarsAuthorizedLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          researchCarsAuthorized: [],
          researchCarsAuthorizedError: axios.isAxiosError(err)
            ? err?.response?.data?.message
            : "Error fetching researchCarsAuthorized",
          researchCarsAuthorizedLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
