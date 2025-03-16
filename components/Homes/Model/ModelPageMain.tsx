"use client";

import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import BrandsSpecialSection from "../Brands/BrandsSpecialSection";
import IncentivesSection from "../Brands/IncentivesSection";
import GallerySection from "./GallerySection";
import KeySpecifications from "./KeySpecifications";
import ModelHeroSection from "./ModelHeroSection";
import TrimView from "./TrimView";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { MainRegionName } from "@/app/utils/mainData";
import FactoryWranties from "./FactoryWranties";

const ModelPageMain = ({ model }: { model: number }) => {
  const { selectedMake } = useResearchCarsMakesStore();
  const currRegion: string = Cookies.get("region") || MainRegionName;
  const selectedModel = selectedMake?.models?.find((m) => m.id === model);

  if (!selectedModel || !selectedMake) {
    redirect(`/${currRegion}/cars/research-new-cars`);
  }

  return (
    <>
      {selectedModel ? (
        <>
          <ModelHeroSection selectedMake={selectedMake} model={selectedModel} />
          <KeySpecifications />
          <GallerySection model={selectedModel} />
          <IncentivesSection currRegion={currRegion} />
          <TrimView model={selectedModel} />
          <BrandsSpecialSection />
          {/* <Blogs /> */}
          <FactoryWranties warranties={selectedMake.warranties} />
        </>
      ) : (
        <div>No Model Found</div>
      )}
    </>
  );
};

export default ModelPageMain;
