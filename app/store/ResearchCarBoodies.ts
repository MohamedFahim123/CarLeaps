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
  getResearchBoodies: (id: number) => Promise<void>;
}

export const useResearchBoodiesStore = create<UseResearchBoodiesStoreIterface>(
  (set) => ({
    researchBoodies: null,
    researchBoodiesError: null,
    researchBoodiesLoading: false,
    hasFetchError: false,

    getResearchBoodies: async (id) => {
      const { currRegion } = useResearchCarsMakesStore.getState();
      const currentTime: number = new Date().getTime();

      if (id) {
        set({ researchBoodiesLoading: true });
        try {
          const res = await axios.post(
            `${baseUrl}/research-bodies?t=${currentTime}`,
            { make_id: id },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                code: currRegion || MainRegionName,
              },
            }
          );

          const researchBoodies = res?.data?.data || [];

          set({
            researchBoodies,
            researchBoodiesError: null,
            researchBoodiesLoading: false,
          });
        } catch (err) {
          set({
            researchBoodies: null,
            researchBoodiesError: axios.isAxiosError(err)
              ? err?.response?.data?.message || "Error fetching researchBoodies"
              : "Unexpected error occurred!",
            researchBoodiesLoading: false,
          });

          if (!axios.isAxiosError(err)) {
            toast.error("Unexpected error occurred!");
          }
        }
      }
    },
  })
);
