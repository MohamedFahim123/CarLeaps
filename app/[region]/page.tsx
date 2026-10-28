"use client";

import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { redirect } from "next/navigation";

export default function RegionPage() {
  const region = useRouteRegion();
  return redirect(`/${region}/cars/home`);
}
