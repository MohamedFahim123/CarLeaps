import { MainRegionName } from "@/app/utils/constants";

export function slugifyCarSegment(value: string): string {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    decoded = value;
  }

  return decoded
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveRegion(region?: string | null): string {
  return region?.trim() || MainRegionName;
}

export function carDetailsHref(
  region: string | undefined | null,
  car: { id: number | string; name?: string | null }
): string {
  const slug = car.name ? slugifyCarSegment(car.name) : "";
  return `/${resolveRegion(region)}/cars/car-details/${slug || car.id}`;
}

export function brandHref(
  region: string | undefined | null,
  brandName: string
): string {
  return `/${resolveRegion(region)}/cars/${slugifyCarSegment(brandName)}`;
}

export function brandModelHref(
  region: string | undefined | null,
  brandName: string,
  modelName: string
): string {
  return `/${resolveRegion(region)}/cars/${slugifyCarSegment(brandName)}/${slugifyCarSegment(modelName)}`;
}
