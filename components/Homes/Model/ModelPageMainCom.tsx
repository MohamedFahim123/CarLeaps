"use client";

import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import IncentivesSection from "../Brands/IncentivesSection";
import FactoryWranties from "./FactoryWranties";
import GallerySection from "./GallerySection";
import KeySpecifications from "./KeySpecifications";
import ModelHeroSection from "./ModelHeroSection";
import TrimView from "./TrimView";

const ModelPageMainCom = ({ model }: { model: number }) => {
  const {
    setSelectedMake,
    researchCarsMakes,
    selectedMake,
    setSelectedModel,
    selectedModel,
  } = useResearchCarsMakesStore();
  const currRegion: string = Cookies.get("region") || MainRegionName;
  const pathName = usePathname();

  useEffect(() => {
    if (selectedModel) {
      setSelectedModel(selectedModel);
    }
    if (!selectedModel) {
      const segments = pathName.split("/").filter(Boolean);
      const ModelId = segments[segments.length - 1];
      const MakeId = segments[segments.length - 2];

      setSelectedMake(
        researchCarsMakes.find((brand) => brand.id === Number(MakeId))!
      );
      if (selectedMake) {
        setSelectedModel(
          selectedMake.models.find((m) => m.id === Number(ModelId))!
        );
      }
    }
  }, [
    model,
    pathName,
    researchCarsMakes,
    selectedMake,
    selectedModel,
    setSelectedMake,
    setSelectedModel,
  ]);

  if (!selectedMake || !selectedModel) return <h1>Loading...</h1>;

  return (
    <>
      {selectedModel ? (
        <>
          <ModelHeroSection selectedMake={selectedMake} model={selectedModel} />
          <KeySpecifications model={selectedModel} />
          <GallerySection model={selectedModel} />
          <IncentivesSection currRegion={currRegion} />
          <TrimView model={selectedModel} />
          {/* <BrandsSpecialSection /> */}
          {/* <Blogs /> */}
          <FactoryWranties warranties={selectedMake.warranties} />
        </>
      ) : (
        <div>No Model Found</div>
      )}
    </>
  );
};

export default ModelPageMainCom;
