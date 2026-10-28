export type CarSearchFilters = {
  condition: string;
  make: string;
  model: string;
  fuel_type: string;
  body: string;
  ad_state: string;
};

export const EMPTY_CAR_SEARCH_FILTERS: CarSearchFilters = {
  condition: "",
  make: "",
  model: "",
  fuel_type: "",
  body: "",
  ad_state: "",
};

const FILTER_KEYS: (keyof CarSearchFilters)[] = [
  "condition",
  "make",
  "model",
  "fuel_type",
  "body",
  "ad_state",
];

/** Canonical condition labels used in mock inventory. */
const CONDITION_ALIASES: Record<string, string> = {
  new: "New",
  used: "Used",
  certified: "Certified",
  cpo: "Certified",
};

export function normalizeCondition(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return CONDITION_ALIASES[trimmed.toLowerCase()] || trimmed;
}

export function parseCarSearchParams(
  params: URLSearchParams | { get: (key: string) => string | null }
): CarSearchFilters {
  return {
    condition: normalizeCondition(params.get("condition") || ""),
    make: params.get("make") || "",
    model: params.get("model") || "",
    fuel_type: params.get("fuel_type") || "",
    body: params.get("body") || "",
    ad_state: params.get("ad_state") || "",
  };
}

export function buildCarSearchQuery(
  filters: Partial<CarSearchFilters>
): string {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const value = filters[key];
    if (!value) continue;
    params.set(
      key,
      key === "condition" ? normalizeCondition(value) : String(value)
    );
  }
  return params.toString();
}

export function toSearchPayload(
  filters: CarSearchFilters
): Record<string, string> {
  const payload: Record<string, string> = {};
  for (const key of FILTER_KEYS) {
    const value = filters[key];
    if (!value) continue;
    payload[key] =
      key === "condition" ? normalizeCondition(value) : String(value);
  }
  return payload;
}

export function equalsLoose(a: unknown, b: unknown): boolean {
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

export function carSearchHref(
  region: string,
  filters: Partial<CarSearchFilters>
): string {
  const query = buildCarSearchQuery(filters);
  return `/${region}/cars/cars-for-sale/search${query ? `?${query}` : ""}`;
}
