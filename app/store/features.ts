import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";
export interface Feature {
  id: number;
  name: string;
  type: string;
}

export interface Features {
  comfort?: Feature[];
  seats?: Feature[];
  safty?: Feature[]; // Keep the typo as "safty" to match the API response
  entertainment?: Feature[];
}

export interface UseFeaturesStoreIterface {
  features: Features;
  featuresError: unknown;
  featuresLoading: boolean;
  getFeatures: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useFeaturesStore = create<UseFeaturesStoreIterface>((set) => ({
  features: [],
  featuresError: null,
  featuresLoading: false,
  getFeatures: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ featuresLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/features?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const features = res?.data?.data || [];
      lastFetchedTime = currentTime;

      set({
        features,
        featuresError: null,
        featuresLoading: false,
      });
    } catch (err) {
      set({
        features: {},
        featuresError: axios.isAxiosError(err)
          ? err?.response?.data?.message || "Error fetching features"
          : "Unexpected error occurred!",
        featuresLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
