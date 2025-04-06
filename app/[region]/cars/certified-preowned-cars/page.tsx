import CpoBrands from "@/components/Homes/CPO/CpoBrands";
import CpoCars from "@/components/Homes/CPO/CpoCars";
import CpoFeatures from "@/components/Homes/CPO/CpoFeatures";
import CpoHero from "@/components/Homes/CPO/CpoHero";
import Banner from "@/components/Homes/ResearchCars/Banner";
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
      <CpoBrands />
      <CpoFeatures />
      <Banner />
    </>
  );
}
