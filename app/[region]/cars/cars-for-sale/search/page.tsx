import SearchedListings from "@/components/Homes/CarsForSale/Search/SearchedListings";
import SidebarSearch from "@/components/Homes/CarsForSale/Search/SidebarSearch";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Cars For Sale Search",
};

export default function SearchInCarsForSalepage() {
  return (
    <>
      <SidebarSearch />
      <SearchedListings />
    </>
  );
}
