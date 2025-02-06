import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";

export interface UseConditionStoreIterface {
  condition: string[];
  conditionError: unknown;
  conditionLoading: boolean;
  getCondition: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useConditionStore = create<UseConditionStoreIterface>((set) => ({
  condition: [],
  conditionError: null,
  conditionLoading: false,
  getCondition: async () => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ conditionLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/conditions?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const condition = res?.data?.data?.condition || [];
      lastFetchedTime = currentTime;

      set({
        condition,
        conditionError: null,
        conditionLoading: false,
      });
    } catch (err) {
      set({
        condition: [],
        conditionError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching condition" : "Unexpected error occurred!",
        conditionLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
