import axios from "axios";
import { create } from "zustand";

export interface UseTokenStoreInterface {
  token: string | null;
  tokenLoading: boolean;
  tokenError: string | null;
  getToken: () => Promise<void>;
  clearToken: () => void;
}

export const useTokenStore = create<UseTokenStoreInterface>((set) => ({
  token: null,
  tokenLoading: false,
  tokenError: null,

  getToken: async () => {
    set({ tokenLoading: true });

    try {
      const tokenResponse = await axios.get("/api/get-token");
      const token = tokenResponse?.data?.token;

      set({
        token,
        tokenLoading: false,
        tokenError: null,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return;
      }
    }
  },

  clearToken: () => set({ token: null }),
}));
