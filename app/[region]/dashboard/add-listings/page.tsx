import AddListing from "@/components/DashBoard/AddListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Listings",
  description: "",
};

export default function page() {
  return <AddListing />;
}