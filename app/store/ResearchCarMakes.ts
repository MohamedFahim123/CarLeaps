import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { Car, CarDealerInterface } from "./CarsForSale";
import { ModelSpecification } from "./allModels";
import { Feature } from "./features";
import { Incentive } from "./makeCars";

export interface TrimsDetailsInterface {
  id: number;
  name: string;
  model_id: number;
  model: string;
  image: string;
  features: {
    comfort: Feature[];
    seats: Feature[];
    safety: Feature[];
    entertainment: Feature[];
  };
  cities: { price: string; city_id: number; city: string; currency: string }[];
}

export interface ModelsDetailsInterface {
  id: number;
  name: string;
  make_id: number;
  make: string;
  image: string;
  cover: string;
  start_price: number;
  end_price: number;
  status: string;
  specifications: ModelSpecification[];
  gallery: { id: number; model_id: number; model: string; image: string }[];
  trims: TrimsDetailsInterface[];
}

export interface WarrantiesInterface {
  id: number;
  title: string;
  description: string;
  make_id: number;
  make: string;
}

export interface ResearchCarsMakes {
  cars: Car[];
  id: number;
  name: string;
  description: string;
  image: string;
  cover: string;
  status: string;
  incentives: Incentive[];
  warranties: WarrantiesInterface[];
  dealers: CarDealerInterface[];
  models: ModelsDetailsInterface[];
}

export interface UseResearchCarsMakesStoreIterface {
  researchCarsMakes: ResearchCarsMakes[];
  researchCarsMakesError: unknown;
  researchCarsMakesLoading: boolean;
  hasFetchError: boolean;
  currRegion?: string;
  selectedMake?: ResearchCarsMakes;
  setSelectedMake: (make: ResearchCarsMakes) => void;
  setSelectedModel: (model: ModelsDetailsInterface) => void;
  selectedModel: ModelsDetailsInterface | null;
  setResearchMakesRegion: (region: string) => void;
  getResearchCarsMakes: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useResearchCarsMakesStore =
  create<UseResearchCarsMakesStoreIterface>((set, get) => ({
    researchCarsMakes: [],
    researchCarsMakesError: null,
    researchCarsMakesLoading: false,
    setResearchMakesRegion: (region: string) => {
      set({ currRegion: region, hasFetchError: false });
      lastFetchedTime = 0;
      get().getResearchCarsMakes();
    },
    selectedModel: null,
    setSelectedModel: (model: ModelsDetailsInterface) => {
      set({ selectedModel: model });
    },
    setSelectedMake: (make: ResearchCarsMakes) => {
      set({ selectedMake: make });
    },
    currRegion: Cookies.get("region"),
    hasFetchError: false,

    getResearchCarsMakes: async () => {
      const { hasFetchError, currRegion } = get();
      const currentTime: number = new Date().getTime();

      if (hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ researchCarsMakesLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/research-makes?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              code: currRegion || MainRegionName,
            },
          }
        );

        const researchCarsMakes = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          researchCarsMakes,
          researchCarsMakesError: null,
          researchCarsMakesLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          researchCarsMakes: [],
          researchCarsMakesError: axios.isAxiosError(err)
            ? err?.response?.data?.message || "Error fetching ResearchCarsMakes"
            : "Unexpected error occurred!",
          researchCarsMakesLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
