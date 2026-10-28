import AddListing from "@/components/DashBoard/AddListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Add Listings",
  description: "",
};

export default function AddListingPage() {
  return <AddListing />;
}
