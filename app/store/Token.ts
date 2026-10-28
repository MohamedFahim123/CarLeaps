import axios from "axios";
import { create } from "zustand";

export interface UseTokenStoreInterface {
  token: string | null;
  tokenLoading: boolean;
  tokenError: string | null;
  /** True after first getToken/clearToken — stops Header retry loops when logged out. */
  tokenChecked: boolean;
  getToken: () => Promise<void>;
  clearToken: () => void;
}

export const useTokenStore = create<UseTokenStoreInterface>((set, get) => ({
  token: null,
  tokenLoading: false,
  tokenError: null,
  tokenChecked: false,

  getToken: async () => {
    if (get().tokenLoading) return;

    set({ tokenLoading: true });

    try {
      const res = await axios.get<{ token: string | null }>("/api/get-token");
      const token = res.data?.token || null;

      set({
        token,
        tokenLoading: false,
        tokenChecked: true,
        tokenError: null,
      });
    } catch (err) {
      set({
        token: null,
        tokenLoading: false,
        tokenChecked: true,
        tokenError: axios.isAxiosError(err)
          ? err.response?.data?.error ||
            err.response?.data?.message ||
            "Failed to load token"
          : "Unexpected error",
      });
    }
  },

  clearToken: () => {
    set({
      token: null,
      tokenLoading: false,
      tokenChecked: true,
      tokenError: null,
    });
  },
}));
