"use client";

import { Suspense, useState } from "react";
import SearchedListings from "./SearchedListings";
import SidebarSearch from "./SidebarSearch";
import Loader from "@/components/Common/Loader";

export interface sideBarPropsInterface {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const SearchMainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Suspense fallback={<Loader />}>
      <SidebarSearch
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <SearchedListings
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </Suspense>
  );
};

export default SearchMainPage;
