"use client";

import {
  CarSearchFilters,
  parseCarSearchParams,
  toSearchPayload,
} from "@/app/lib/cars/searchFilters";
import { useSearchCarsStore } from "@/app/store/carSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useCarsSearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { carsSearch, carsSearchLoading, getCarsSearch } = useSearchCarsStore();

  const filters = useMemo(
    () => parseCarSearchParams(searchParams),
    [searchParams]
  );
  const filterKey = useMemo(() => JSON.stringify(filters), [filters]);
  const [appliedKey, setAppliedKey] = useState("");

  useEffect(() => {
    let alive = true;
    void getCarsSearch(toSearchPayload(filters)).finally(() => {
      if (alive) setAppliedKey(filterKey);
    });
    return () => {
      alive = false;
    };
  }, [filterKey, filters, getCarsSearch]);

  const setFilter = useCallback(
    (name: keyof CarSearchFilters, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) {
        next.set(name, value);
      } else {
        next.delete(name);
      }
      if (name === "make") {
        next.delete("model");
      }
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams]
  );

  return {
    filters,
    setFilter,
    carsSearch,
    carsSearchLoading: carsSearchLoading || filterKey !== appliedKey,
  };
}
