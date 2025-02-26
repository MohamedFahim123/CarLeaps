import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";
import { useTokenStore } from "./Token";

export interface ImagesTypes {
  image: string;
}

export interface FeaturesTypes {
  id: number;
  name: string;
  type: string;
  status: string;
}

export interface CarsTypes {
  id: number;
  name: string;
  condition: string;
  body_id: number;
  body: string;
  make_id: number;
  make: string;
  model_id: number;
  model: string;
  trim_id: number;
  trim: string;
  transmission_id: number;
  transmission: string;
  year_id: number;
  year: number;
  country_id: number;
  country: string;
  city_id: number;
  city: string;
  price: number;
  offer_price: number;
  mileage: number;
  drive_type: string;
  exterior: string;
  interior: string;
  vin: string;
  video_link: string;
  engine: string;
  fuel_type: string;
  ad_state: string;
  added_at: string;
  description: string;
  status: string;
  main_image: string;
  history: string;
  features: FeaturesTypes[];
  carImagesCount: number;
  carImages: ImagesTypes[];
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ActiveCars {
  cars: CarsTypes[];
  meta: Meta;
  links: Links;
  pages: string[];
}

export interface UseActiveCarsStoreInterface {
  activeCars: ActiveCars | null;
  activeCarsError: unknown;
  activeCarsLoading: boolean;
  hasFetchError: boolean;
  getActiveCars: () => Promise<void>;
  searchCars: (params: string) => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useActiveCars = create<UseActiveCarsStoreInterface>(
  (set, get) => ({
    activeCars: null,
    activeCarsError: null,
    activeCarsLoading: false,
    hasFetchError: false,

    getActiveCars: async () => {
      const currentTime: number = new Date().getTime();
      const { token } = useTokenStore.getState();

      if (!token) {
        return;
      }

      if (get().hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ activeCarsLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/dealer/active-cars?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const activeCars = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          activeCars,
          activeCarsError: null,
          activeCarsLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          activeCars: null,
          activeCarsError: axios.isAxiosError(err)
            ? err?.response?.data?.message || "Error fetching activeCars"
            : "Unexpected error occurred!",
          activeCarsLoading: false,
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
          `${baseUrl}/dealer/search-active-cars`,
          { name: params },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const activeCars = response?.data?.data || [];

        set({
          activeCars,
          activeCarsError: null,
          activeCarsLoading: false,
          hasFetchError: false,
        });
      } catch (error) {
        toast.error("Failed to search car");
        console.error(error);
      }
    },
  })
);
