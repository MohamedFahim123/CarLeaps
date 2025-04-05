import Cta from "@/components/Common/Cta";
import CpoBrands from "@/components/Homes/CPO/CpoBrands";
import CpoCars from "@/components/Homes/CPO/CpoCars";
import CpoFeatures from "@/components/Homes/CPO/CpoFeatures";
import CpoHero from "@/components/Homes/CPO/CpoHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Certified PreOwned Cars",
};

export default function CPOPage() {
  return (
    <>
      <div id="nav-mobile"></div>
      <CpoHero />
      <CpoCars />
      <Cta />
      <CpoFeatures />
      <CpoBrands />
    </>
  );
}
