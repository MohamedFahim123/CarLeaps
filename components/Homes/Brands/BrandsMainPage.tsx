"use client";

import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { MainRegionName } from "@/app/utils/mainData";
import { useEffect } from "react";
import AboutBrand from "./AboutBrand";
import AllCurrentModels from "./AllCurrentModels";
import BrandsBanner from "./BrandsBanner";
import BrandsHeroSection from "./BrandsHeroSection";
import IncentivesSection from "./IncentivesSection";

export default function BrandsMainPage({ brandName }: { brandName: string }) {
  const {
    researchCarsMakes,
    researchCarsMakesLoading,
    setSelectedMake,
    currRegion,
  } = useResearchCarsMakesStore();
  const selectedBrand = researchCarsMakes.find(
    (brand) => brand.name.toLowerCase() === brandName.toLowerCase()
  );

  useEffect(() => {
    if (selectedBrand) {
      setSelectedMake(selectedBrand);
    }
  }, [brandName, selectedBrand, setSelectedMake]);

  if (researchCarsMakesLoading) return <h1>Loading...</h1>;

  return (
    <>
      {selectedBrand ? (
        <>
          <BrandsHeroSection
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          />
          <BrandsBanner
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          />
          <IncentivesSection
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          />
          <AboutBrand
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          />
          {/* <BrandsChooseUs brand={selectedBrand} /> */}
          {/* <BrandsSpecialSection /> */}
          <AllCurrentModels brand={selectedBrand} />
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
}
