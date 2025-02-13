import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/mainData";
import { useTokenStore } from "./Token";

export interface Profile {
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

export interface UseProfileStoreIterface {
  profile: Profile | null;
  profileError: unknown;
  profileLoading: boolean;
  getProfile: () => Promise<void>;
}

let lastFetchedTime: number = 0;
const CACHE_EXPIRATION_TIME: number = 15 * 60 * 1000;

export const useProfileStore = create<UseProfileStoreIterface>((set) => ({
  profile: null,
  profileError: null,
  profileLoading: false,

  getProfile: async () => {
    const currentTime: number = new Date().getTime();
    const { token } = useTokenStore.getState();

    if (!token) {
      return;
    }

    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      set({ profileLoading: false });
      return;
    }

    set({ profileLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/dealer/profile?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = res?.data?.data?.dealer || null;
      lastFetchedTime = currentTime;

      set({
        profile,
        profileError: null,
        profileLoading: false,
      });
    } catch (err) {
      set({
        profile: null,
        profileError: axios.isAxiosError(err) ? err?.response?.data?.message || "Error fetching profile" : "Unexpected error occurred!",
        profileLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
