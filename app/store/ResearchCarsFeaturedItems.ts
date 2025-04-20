import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import { useResearchCarsMakesStore } from "./ResearchCarMakes";

export interface FeaturedItem {
  id: number;
  name: string;
  image: string;
  link: string;
}

export interface ResearchFeaturedItems {
  id: number;
  name: string;
  items: FeaturedItem[];
}

export interface UseResearchFeaturedItemsStoreIterface {
  featuredItems: ResearchFeaturedItems[];
  featuredItemsError: unknown;
  featuredItemsLoading: boolean;
  hasFetchError: boolean;
  getFeaturedItems: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useResearchFeatruedItemsStore =
  create<UseResearchFeaturedItemsStoreIterface>((set, get) => ({
    featuredItems: [],
    featuredItemsError: null,
    featuredItemsLoading: false,
    hasFetchError: false,

    getFeaturedItems: async () => {
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

      set({ featuredItemsLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/featured-items?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              code: currRegion || MainRegionName,
            },
          }
        );

        const featuredItems = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          featuredItems,
          featuredItemsError: null,
          featuredItemsLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          featuredItems: [],
          featuredItemsError: axios.isAxiosError(err)
            ? err?.response?.data?.message || "Error fetching featuredItems"
            : "Unexpected error occurred!",
          featuredItemsLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
