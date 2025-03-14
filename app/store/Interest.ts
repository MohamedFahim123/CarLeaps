import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface Interest {
  id: number;
  name: string;
  image: string;
}

export interface UseInterestsStoreIterface {
  interests: Interest[];
  interestsError: unknown;
  interestsLoading: boolean;
  hasFetchError: boolean;
  getInterests: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useInterestsStore = create<UseInterestsStoreIterface>(
  (set, get) => ({
    interests: [],
    interestsError: null,
    interestsLoading: false,
    hasFetchError: false,

    getInterests: async () => {
      const { hasFetchError } = get();
      const currentTime: number = new Date().getTime();

      if (hasFetchError) {
        return;
      }

      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        set({ interestsLoading: false });
        return;
      }

      set({ interestsLoading: true });

      try {
        const res = await axios.get(`${baseUrl}/interests?t=${currentTime}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const interests = res?.data?.data || [];
        lastFetchedTime = currentTime;

        set({
          interests,
          interestsError: null,
          interestsLoading: false,
          hasFetchError: false,
        });
      } catch (err) {
        set({
          interests: [],
          interestsError: axios.isAxiosError(err)
            ? err?.response?.data?.message || "Error fetching interests"
            : "Unexpected error occurred!",
          interestsLoading: false,
          hasFetchError: true,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  })
);
