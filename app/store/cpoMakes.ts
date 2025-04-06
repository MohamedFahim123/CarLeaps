import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { Car, CarDealerInterface } from "./CarsForSale";
import { Incentive } from "./makeCars";
import { useResearchCarsMakesStore } from "./ResearchCarMakes";


export interface WarrantiesInterface {
  id: number;
  title: string;
  description: string;
  make_id: number;
  make: string;
}

export interface CPOCarsMakes {
  video_link: string;
  cars: Car[];
  id: number;
  name: string;
  description: string;
  logo: string;
  cover: string;
  status: string;
  incentives: Incentive[];
  warranties: WarrantiesInterface[];
  dealers: CarDealerInterface[];
}

export interface UseCPOCarsMakesStoreIterface {
  CPOCarsMakes: CPOCarsMakes[];
  CPOCarsMakesError: unknown;
  CPOCarsMakesLoading: boolean;
  hasFetchError: boolean;
  selectedMake?: CPOCarsMakes;
  setSelectedMake: (make: CPOCarsMakes) => void;
  getCPOCarsMakes: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCPOCarsMakesStore = create<UseCPOCarsMakesStoreIterface>(
  (set, get) => ({
    CPOCarsMakes: [],
    CPOCarsMakesError: null,
    CPOCarsMakesLoading: false,
    setSelectedMake: (make: CPOCarsMakes) => {
      set({ selectedMake: make });
    },
    hasFetchError: false,

    getCPOCarsMakes: async () => {
      const { hasFetchError } = get();
      const { currRegion } = useResearchCarsMakesStore.getState();
      const currentTime: number = new Date().getTime();

      if (hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ CPOCarsMakesLoading: true });

      try {
        const res = await axios.get(`${baseUrl}/programs?t=${currentTime}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            code: currRegion || MainRegionName,
          },
        });

        const CPOCarsMakes = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          CPOCarsMakes,
          CPOCarsMakesError: null,
          CPOCarsMakesLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          CPOCarsMakes: [],
          CPOCarsMakesError: axios.isAxiosError(err)
            ? err?.response?.data?.message || "Error fetching CPOCarsMakes"
            : "Unexpected error occurred!",
          CPOCarsMakesLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  })
);
