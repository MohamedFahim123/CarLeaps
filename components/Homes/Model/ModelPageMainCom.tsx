"use client";

import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { slugifyCarSegment } from "@/app/lib/cars/paths";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import Loader from "@/components/Common/Loader";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import IncentivesSection from "../Brands/IncentivesSection";
import FactoryWranties from "./FactoryWranties";
import GallerySection from "./GallerySection";
import KeySpecifications from "./KeySpecifications";
import ModelHeroSection from "./ModelHeroSection";
import TrimView from "./TrimView";

function matchesSegment(value: string, segment: string): boolean {
  return (
    slugifyCarSegment(value) === slugifyCarSegment(segment) ||
    value.toLowerCase() === segment.toLowerCase()
  );
}

const ModelPageMainCom = ({ model }: { model: string }) => {
  const {
    setSelectedMake,
    researchCarsMakes,
    selectedMake,
    setSelectedModel,
    selectedModel,
    researchCarsMakesLoading,
  } = useResearchCarsMakesStore();
  const currRegion = useRouteRegion();
  const pathName = usePathname();

  useEffect(() => {
    if (selectedModel) {
      setSelectedModel(selectedModel);
    }
    if (!selectedModel) {
      const segments = pathName.split("/").filter(Boolean);
      const ModelId = segments[segments.length - 1];
      const MakeId = segments[segments.length - 2];

      const make = researchCarsMakes.find((brand) =>
        matchesSegment(brand.name, MakeId)
      );
      if (make) {
        setSelectedMake(make);
        const nextModel = make.models.find((m) => matchesSegment(m.name, ModelId));
        if (nextModel) setSelectedModel(nextModel);
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
