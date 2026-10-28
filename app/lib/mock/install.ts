import axios, {
  AxiosError,
  getAdapter,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { isMockMode } from "../config/dataMode";
import { handleMockRequest } from "./handlers";

let installed = false;

export function installMockAxios() {
  if (installed || !isMockMode()) return;
  installed = true;

  const originalAdapter = axios.defaults.adapter;

  axios.defaults.adapter = (async (config: InternalAxiosRequestConfig) => {
    const url = String(config.url || "");

    if (url.includes("admin.carleaps.com")) {
      const result = await handleMockRequest(
        config as Parameters<typeof handleMockRequest>[0]
      );
      const response = {
        data: result.data,
        status: result.status,
        statusText: result.statusText,
        headers: result.headers,
        config,
        request: {},
      } as AxiosResponse;

      const validateStatus = config.validateStatus;
      const ok =
        !response.status || !validateStatus || validateStatus(response.status);
      if (!ok) {
        throw new AxiosError(
          `Request failed with status code ${response.status}`,
          String(response.status).startsWith("4")
            ? AxiosError.ERR_BAD_REQUEST
            : AxiosError.ERR_BAD_RESPONSE,
          config,
          {},
          response
        );
      }
      return response;
    }

    const fallback = getAdapter(
      (originalAdapter as AxiosAdapter | AxiosAdapter[] | undefined) || [
        "xhr",
        "http",
        "fetch",
      ]
    );
    return fallback(config);
  }) as AxiosAdapter;
}

installMockAxios();

export { handleMockFetch } from "./handlers";
