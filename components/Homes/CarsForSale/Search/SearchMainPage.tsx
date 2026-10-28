"use client";

import { useCarsSearchFilters } from "@/app/hooks/useCarsSearchFilters";
import Loader from "@/components/Common/Loader";
import { Suspense, useState } from "react";
import SearchedListings from "./SearchedListings";
import SidebarSearch from "./SidebarSearch";

export interface sideBarPropsInterface {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

function SearchMainPageInner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { filters, setFilter, carsSearch, carsSearchLoading } =
    useCarsSearchFilters();

  return (
    <>
      <SidebarSearch
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        filters={filters}
        setFilter={setFilter}
      />
      <SearchedListings
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        filters={filters}
        setFilter={setFilter}
        carsSearch={carsSearch}
        carsSearchLoading={carsSearchLoading}
      />
    </>
  );
}

const SearchMainPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SearchMainPageInner />
    </Suspense>
  );
};

export default SearchMainPage;
