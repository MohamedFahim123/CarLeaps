"use client";

import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import AboutBrand from "./AboutBrand";
import AllCurrentModels from "./AllCurrentModels";
import BrandsBanner from "./BrandsBanner";
import BrandsChooseUs from "./BrandsChooseUs";
import BrandsHeroSection from "./BrandsHeroSection";
import BrandsSpecialSection from "./BrandsSpecialSection";
import IncentivesSection from "./IncentivesSection";
import { useEffect } from "react";

export default function BrandsMainPage({ brandId }: { brandId: number }) {
  const { researchCarsMakes, researchCarsMakesLoading, setSelectedMake } =
    useResearchCarsMakesStore();
  const selectedBrand = researchCarsMakes.find((brand) => brand.id === brandId);

  useEffect(() => {
    if (selectedBrand) {
      setSelectedMake(selectedBrand);
    }
  }, [brandId, selectedBrand, setSelectedMake]);

  if (researchCarsMakesLoading) return <h1>Loading...</h1>;
  console.log(selectedBrand)

  return (
    <>
      {selectedBrand ? (
        <>
          <BrandsHeroSection brand={selectedBrand} />
          <BrandsBanner brand={selectedBrand} />
          <IncentivesSection brand={selectedBrand} />
          <AboutBrand brand={selectedBrand} />
          <BrandsChooseUs brand={selectedBrand} />
          <BrandsSpecialSection />
          <AllCurrentModels brand={selectedBrand} />
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
}
