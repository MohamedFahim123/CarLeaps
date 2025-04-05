"use client";

import { useCPOCarsMakesStore } from "@/app/store/cpoMakes";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { MainRegionName } from "@/app/utils/mainData";
import { useEffect } from "react";
import BrandsSpecialSection from "../Brands/BrandsSpecialSection";
import CPOChooseUs from "./CPOChooseUs";
import CPODealerSection from "./CPODealerSection";
import CPODetailsHero from "./CPODetailsHero";

const CPODetailsMainPage = ({ brandId }: { brandId: number }) => {
  const { CPOCarsMakes, CPOCarsMakesLoading, setSelectedMake } =
    useCPOCarsMakesStore();

  const { currRegion } = useResearchCarsMakesStore();

  const selectedBrand = CPOCarsMakes?.find((brand) => brand?.id === brandId);

  useEffect(() => {
    if (selectedBrand) {
      setSelectedMake(selectedBrand);
    }
  }, [brandId, selectedBrand, setSelectedMake]);

  if (CPOCarsMakesLoading) return <h1>Loading...</h1>;

  return (
    <>
      {selectedBrand ? (
        <>
          <CPODetailsHero
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          />
          <CPODealerSection
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          />
          <CPOChooseUs brand={selectedBrand} />
          <BrandsSpecialSection />
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default CPODetailsMainPage;
