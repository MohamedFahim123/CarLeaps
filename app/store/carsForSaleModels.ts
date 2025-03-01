import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { Features } from "./features";

export interface CarsForSaleModelGallery {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface CarsForSaleModelSpecification {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface CarsForSaleModels {
  id: number;
  name: string;
  make: string;
  make_id: number;
  image: string;
  cover: string;
  status: string;
  specifications: CarsForSaleModelSpecification[];
  features: Features[];
  gallery: CarsForSaleModelGallery[];
}

export interface UseCarsForSaleModelsStoreIterface {
  carsForSaleModels: CarsForSaleModels[];
  carsForSaleModelsError: unknown;
  carsForSaleModelsLoading: boolean;
  hasFetchError: boolean;
  currRegion?: string;
  setModelRegion: (region: string) => void;
  getCarsForSaleModels: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCarsForSaleModelsStore =
  create<UseCarsForSaleModelsStoreIterface>((set, get) => ({
    carsForSaleModels: [],
    carsForSaleModelsError: null,
    carsForSaleModelsLoading: false,
    setModelRegion: (region: string) => {
      set({ currRegion: region, hasFetchError: false });
      lastFetchedTime = 0;
      get().getCarsForSaleModels();
    },
    currRegion: Cookies.get("region"),
    hasFetchError: false,

    getCarsForSaleModels: async () => {
      const { hasFetchError, currRegion } = get();
      const currentTime: number = new Date().getTime();

      if (hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ carsForSaleModelsLoading: true });

      try {
        const res = await axios.get(`${baseUrl}/city-models?t=${currentTime}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            code: currRegion || MainRegionName,
          },
        });

        const carsForSaleModels = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          carsForSaleModels,
          carsForSaleModelsError: null,
          carsForSaleModelsLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          carsForSaleModels: [],
          carsForSaleModelsError: axios.isAxiosError(err)
            ? err?.response?.data?.message || "Error fetching CarsForSaleModels"
            : "Unexpected error occurred!",
          carsForSaleModelsLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
