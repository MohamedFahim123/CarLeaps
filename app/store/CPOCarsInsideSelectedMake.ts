import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { Car } from "./CarsForSale";
import { useResearchCarsMakesStore } from "./ResearchCarMakes";

export interface CPOCarsInsideSelectedMakeInterface {
  body_id: number;
  body_name: string;
  cars: Car[];
}

export interface UseCPOCarsInsideSelectedMakeStoreInterface {
  CPOCarsInsideSelectedMake: CPOCarsInsideSelectedMakeInterface[];
  CPOCarsInsideSelectedMakeError: unknown;
  CPOCarsInsideSelectedMakeLoading: boolean;
  hasFetchError: boolean;
  getCPOCarsInsideSelectedMake: (makeId: number) => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCPOCarsInsideSelectedMakeStore =
  create<UseCPOCarsInsideSelectedMakeStoreInterface>((set, get) => ({
    CPOCarsInsideSelectedMake: [],
    CPOCarsInsideSelectedMakeError: null,
    CPOCarsInsideSelectedMakeLoading: false,
    hasFetchError: false,
    getCPOCarsInsideSelectedMake: async (makeId: number) => {
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

      set({ CPOCarsInsideSelectedMakeLoading: true });

      try {
        const res = await axios.post(
          `${baseUrl}/cpo-cars?t=${currentTime}`,
          {
            make_id: makeId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              code: currRegion || MainRegionName,
            },
          }
        );

        const CPOCarsCars = res?.data?.data || [];

        lastFetchedTime = currentTime;

        set({
          CPOCarsInsideSelectedMake: CPOCarsCars,
          CPOCarsInsideSelectedMakeError: null,
          CPOCarsInsideSelectedMakeLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          CPOCarsInsideSelectedMake: [],
          CPOCarsInsideSelectedMakeError: axios.isAxiosError(err)
            ? err?.response?.data?.message
            : "Error fetching CPOCarsInsideSelectedMake",
          CPOCarsInsideSelectedMakeLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
