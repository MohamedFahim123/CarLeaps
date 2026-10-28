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

export function carDetailsHref(
  region: string,
  car: { id: number | string; name?: string | null }
): string {
  const slug = car.name ? slugifyCarSegment(car.name) : "";
  return `/${region}/cars/car-details/${slug || car.id}`;
}

export function brandHref(region: string, brandName: string): string {
  return `/${region}/cars/${slugifyCarSegment(brandName)}`;
}

export function brandModelHref(
  region: string,
  brandName: string,
  modelName: string
): string {
  return `/${region}/cars/${slugifyCarSegment(brandName)}/${slugifyCarSegment(modelName)}`;
}
