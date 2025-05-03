"use client";

import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { MainRegionName } from "@/app/utils/mainData";
import Loader from "@/components/Common/Loader";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import IncentivesSection from "../Brands/IncentivesSection";
import FactoryWranties from "./FactoryWranties";
import GallerySection from "./GallerySection";
import KeySpecifications from "./KeySpecifications";
import ModelHeroSection from "./ModelHeroSection";
import TrimView from "./TrimView";

const ModelPageMainCom = ({ model }: { model: string }) => {
  const {
    setSelectedMake,
    researchCarsMakes,
    selectedMake,
    setSelectedModel,
    selectedModel,
    researchCarsMakesLoading,
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
        researchCarsMakes.find(
          (brand) => brand.name.toLowerCase() === MakeId.toLowerCase()
        )!
      );
      if (selectedMake) {
        setSelectedModel(
          selectedMake.models.find(
            (m) => m.name.toLowerCase() === ModelId.toLowerCase()
          )!
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

  if (researchCarsMakesLoading) return <Loader />;

  if (!selectedMake || !selectedModel) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default ModelPageMainCom;
