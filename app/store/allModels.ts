import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface ModelGallery {
  id: number;
  name: string;
  image: string;
  description: string;
}
export interface ModelSpecification {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface Models {
  id: number;
  name: string;
  make: string;
  make_id: number;
  image: string;
  cover: string;
  status: string;
  specifications: ModelSpecification[];
  gallery: ModelGallery[];
}

export interface UseModelsStoreIterface {
  models: Models[];
  modelsError: unknown;
  modelsLoading: boolean;
  getModels: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useModelsStore = create<UseModelsStoreIterface>((set) => ({
  models: [],
  modelsError: null,
  modelsLoading: false,
  getModels: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ modelsLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/models?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const models = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        models,
        modelsError: null,
        modelsLoading: false,
      });
    } catch (err) {
      set({
        models: [],
        modelsError: axios.isAxiosError(err)
          ? err?.response?.data?.message || "Error fetching Models"
          : "Unexpected error occurred!",
        modelsLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
