"use client";

import { useState } from "react";
import SearchedListings from "./SearchedListings";
import SidebarSearch from "./SidebarSearch";

export interface sideBarPropsInterface {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const SearchMainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <SidebarSearch
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <SearchedListings
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default SearchMainPage;
