import Listings from "@/components/DashBoard/Listings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Listings",
  description: "",
};
export default function page() {
  return (
    <>
      <Listings />
    </>
  );
}
