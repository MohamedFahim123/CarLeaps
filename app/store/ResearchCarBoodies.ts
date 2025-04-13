import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl, MainRegionName } from "../utils/mainData";
import {
  ModelsDetailsInterface,
  useResearchCarsMakesStore,
} from "./ResearchCarMakes";

export interface ResearchBoodies {
  id: number;
  name: string;
  image: string;
  models: {
    body: {
      id: number;
      name: string;
      image: string;
    };
    models: ModelsDetailsInterface[];
  }[];
}

export interface UseResearchBoodiesStoreIterface {
  researchBoodies: ResearchBoodies | null;
  researchBoodiesError: unknown;
  researchBoodiesLoading: boolean;
  hasFetchError: boolean;
  getResearchBoodies: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useResearchBoodiesStore = create<UseResearchBoodiesStoreIterface>(
  (set, get) => ({
    researchBoodies: null,
    researchBoodiesError: null,
    researchBoodiesLoading: false,
    hasFetchError: false,

    getResearchBoodies: async () => {
      const { hasFetchError } = get();
      const { currRegion, selectedMake } = useResearchCarsMakesStore.getState();
      const currentTime: number = new Date().getTime();

      if (hasFetchError) {
        console.warn("Skipping fetch due to previous error.");
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ researchBoodiesLoading: true });

      if (selectedMake) {
        try {
          const res = await axios.post(
            `${baseUrl}/research-bodies?t=${currentTime}`,
            { make_id: selectedMake?.id },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                code: currRegion || MainRegionName,
              },
            }
          );

          const researchBoodies = res?.data?.data || [];
          lastFetchedTime = currentTime;

          set({
            researchBoodies,
            researchBoodiesError: null,
            researchBoodiesLoading: false,
            hasFetchError: false,
          });
        } catch (err) {
          set({
            researchBoodies: null,
            researchBoodiesError: axios.isAxiosError(err)
              ? err?.response?.data?.message || "Error fetching researchBoodies"
              : "Unexpected error occurred!",
            researchBoodiesLoading: false,
            hasFetchError: true,
          });

          if (!axios.isAxiosError(err)) {
            toast.error("Unexpected error occurred!");
          }
        }
      }
    },
  })
);
