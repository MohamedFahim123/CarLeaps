"use client";

import { MainRegionName } from "@/app/utils/constants";
import { useParams } from "next/navigation";

/** Region from the `[region]` segment. Same value on the server and the client. */
export function useRouteRegion(): string {
  const params = useParams();
  const region = params?.region;
  if (typeof region === "string" && region) return decodeURIComponent(region);
  if (Array.isArray(region) && region[0]) return decodeURIComponent(region[0]);
  return MainRegionName;
}
