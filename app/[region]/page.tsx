"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { setRegionCookie } from "../utils/setRegionCookie";

export default function RegionPage({
  params,
  regionFromCookie,
}: {
  params: Promise<{ region?: string }>;
  regionFromCookie: string;
}) {
  const router = useRouter();

  const resolvedParams = use(params);
  const regionFromUrl = resolvedParams?.region?.toLowerCase();
  const finalRegion = regionFromUrl || regionFromCookie;

  useEffect(() => {
    if (regionFromCookie !== finalRegion) {
      setRegionCookie(finalRegion);
    }

    router.replace(`/${finalRegion}/cars/home`);
  }, [finalRegion, regionFromCookie, router]);

  return null;
}
