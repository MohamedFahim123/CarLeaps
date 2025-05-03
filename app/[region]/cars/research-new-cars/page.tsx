import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { useResearchFeatruedItemsStore } from "@/app/store/ResearchCarsFeaturedItems";
import Loader from "@/components/Common/Loader";
import Banner from "@/components/Homes/ResearchCars/Banner";
import Cars from "@/components/Homes/ResearchCars/Cars";
import Categories from "@/components/Homes/ResearchCars/Categories";
import Features from "@/components/Homes/ResearchCars/Features";
import Hero from "@/components/Homes/ResearchCars/Hero";
import ResearchCarsBrands from "@/components/Homes/ResearchCars/ResearchCarsBrands";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CarLeaps - Research New Cars",
  description: "Find the best cars for your needs.",
};

export default function ResearchNewCarsPage() {
  const { researchCarsMakesLoading } = useResearchCarsMakesStore.getState();
  const { featuredItemsLoading } = useResearchFeatruedItemsStore.getState();

  if (researchCarsMakesLoading || featuredItemsLoading) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Hero />
      <Categories />
      <ResearchCarsBrands />
      <Features />
      <Cars />
      <Banner />
    </Suspense>
  );
}
