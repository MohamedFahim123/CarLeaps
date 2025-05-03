import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useCitiesStore } from "@/app/store/Cities";
import { useFooterTapsStore } from "@/app/store/footerTaps";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import Loader from "@/components/Common/Loader";
import Cars from "@/components/Homes/Home/Cars";
import Features from "@/components/Homes/Home/Features";
import Features3 from "@/components/Homes/Home/Features3";
import Hero from "@/components/Homes/Home/Hero";
import Banner from "@/components/Homes/ResearchCars/Banner";
import ResearchCarsBrands from "@/components/Homes/ResearchCars/ResearchCarsBrands";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CarLeaps - Home",
  description: "Your Favorite Cars Portal.",
};

export default function HomePage() {
  const { citiesLoading } = useCitiesStore.getState();
  const { researchCarsMakesLoading } = useResearchCarsMakesStore.getState();
  const { carsForSaleLoading } = useCarsForSaleStore.getState();
  const { footerTapsLoading } = useFooterTapsStore.getState();

  if (
    citiesLoading ||
    footerTapsLoading ||
    carsForSaleLoading ||
    researchCarsMakesLoading
  ) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Hero />
      <ResearchCarsBrands />
      <Banner />
      <Cars />
      <Features />
      <Features3 />
    </Suspense>
  );
}
