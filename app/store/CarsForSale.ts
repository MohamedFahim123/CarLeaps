import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";

export interface CarDealerInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  bio: string;
  address: string;
  sales_hours: string;
  status: string;
  type: string;
  country_id: number;
  country_name: string;
  locale: string;
  cover: string;
  image: string;
  documents: string[];
}

export interface CarFeatures {
  id: number;
  name: string;
  type: string;
  status: string;
}

export interface Car {
  id: number;
  name: string;
  condition: string;
  dealer: CarDealerInterface;
  body: string;
  make: string;
  model: string;
  trim: string;
  transmission: string;
  year: string;
  country: string;
  city: string;
  body_id: number;
  make_id: number;
  model_id: number;
  trim_id: number;
  transmission_id: number;
  year_id: number;
  country_id: number;
  city_id: number;
  price: number;
  offer_price: number;
  mileage: number;
  drive_type: string;
  exterior: string;
  interior: string;
  vin: string;
  engine: string;
  fuel_type: string;
  ad_state: string;
  added_at: string;
  description: string;
  video_link: string;
  status: string;
  main_image: string;
  history: string;
  lat: number;
  lng: number;
  features: CarFeatures[];
  carImagesCount: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  carImages: { image: string }[];
}

export interface UseCarsForSaleStoreInterface {
  carsForSale: Car[];
  carsForSaleError: unknown;
  carsForSaleLoading: boolean;
  currentRegion?: string;
  hasFetchError: boolean;
  setRegion: (region: string) => void;
  getCarsForSale: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useCarsForSaleStore = create<UseCarsForSaleStoreInterface>(
  (set, get) => ({
    carsForSale: [],
    carsForSaleError: null,
    carsForSaleLoading: false,
    currentRegion: Cookies.get("region"),
    hasFetchError: false,

    setRegion: (region: string) => {
      set({ currentRegion: region, hasFetchError: false });
      lastFetchedTime = 0;
      get().getCarsForSale();
    },

    getCarsForSale: async () => {
      const currentTime: number = new Date().getTime();
      const regionCode = get().currentRegion;

      if (!regionCode) {
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

      set({ carsForSaleLoading: true });

      try {
        const res = await axios.get(`${baseUrl}/cars?t=${currentTime}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            code: regionCode || MainRegionName,
          },
        });

        const carsForSale = res?.data?.data?.cars || [];
        lastFetchedTime = currentTime;

        set({
          carsForSale,
          carsForSaleError: null,
          carsForSaleLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          carsForSale: [],
          carsForSaleError: axios.isAxiosError(err)
            ? err?.response?.data?.message
            : "Error fetching carsForSale",
          carsForSaleLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  })
);
