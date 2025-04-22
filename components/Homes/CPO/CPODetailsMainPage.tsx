"use client";

import { useCPOCarsMakesStore } from "@/app/store/cpoMakes";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { MainRegionName } from "@/app/utils/mainData";
import { useCallback, useEffect } from "react";
import CpoCars2 from "./CpoCars2";
import CPOChooseUs from "./CPOChooseUs";
import CPODetailsHero from "./CPODetailsHero";
import { useCPOCarsInsideSelectedMakeStore } from "@/app/store/CPOCarsInsideSelectedMake";
import Loader from "@/components/Common/Loader";
const CPODetailsMainPage = ({ brandId }: { brandId: number }) => {
  const { CPOCarsMakes, CPOCarsMakesLoading, setSelectedMake } =
    useCPOCarsMakesStore();

  const {
    getCPOCarsInsideSelectedMake,
    CPOCarsInsideSelectedMake,
    CPOCarsInsideSelectedMakeLoading,
  } = useCPOCarsInsideSelectedMakeStore();

  useCallback(() => {
    if (
      brandId &&
      CPOCarsInsideSelectedMake.length === 0 &&
      !CPOCarsInsideSelectedMakeLoading
    ) {
      getCPOCarsInsideSelectedMake(brandId);
    }
  }, [
    brandId,
    CPOCarsInsideSelectedMake,
    CPOCarsInsideSelectedMakeLoading,
    getCPOCarsInsideSelectedMake,
  ]);
  useEffect(() => {
    getCPOCarsInsideSelectedMake(brandId);
  }, [getCPOCarsInsideSelectedMake, brandId]);

  const { currRegion } = useResearchCarsMakesStore();

  const selectedBrand = CPOCarsMakes?.find((brand) => brand?.id === brandId);

  useEffect(() => {
    if (selectedBrand) {
      setSelectedMake(selectedBrand);
    }
  }, [brandId, selectedBrand, setSelectedMake]);

  if (CPOCarsMakesLoading || CPOCarsInsideSelectedMakeLoading)
    return <Loader />;

  return (
    <>
      {selectedBrand ? (
        <>
          <CPODetailsHero
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          />
          <CPOChooseUs brand={selectedBrand} />
          <CpoCars2 cars={CPOCarsInsideSelectedMake.flatMap((make) => make.cars)} />
          {/* <CPODealerSection
            currRegion={currRegion || MainRegionName}
            brand={selectedBrand}
          /> */}
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default CPODetailsMainPage;
