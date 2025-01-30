import ShopList from "@/components/Homes/PerfectMatch/ShopList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Perfect Match",
  description: "Your perfect match for your car",
  keywords: ["perfect match", "CarLeaps", "car search"],
};

export default function PerfectMatchPage() {
  return (
    <>
      <ShopList />
    </>
  );
}
