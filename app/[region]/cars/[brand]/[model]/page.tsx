import { Models } from "@/app/store/allModels";
import { baseUrl } from "@/app/utils/mainData";
import BrandsSpecialSection from "@/components/Homes/Brands/BrandsSpecialSection";
import IncentivesSection from "@/components/Homes/Brands/IncentivesSection";
import Blogs from "@/components/Homes/Home/Blogs";
import GallerySection from "@/components/Homes/Model/GallerySection";
import KeySpecifications from "@/components/Homes/Model/KeySpecifications";
import ModelHeroSection from "@/components/Homes/Model/ModelHeroSection";
import TrimView from "@/components/Homes/Model/TrimView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Model Details",
};

export default async function ModelPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;

  const selectedModelReq = await fetch(`${baseUrl}/show-model`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      model_id: model,
    }),
  });
  const selectedModelRes = await selectedModelReq.json();
  const selectedModel: Models = selectedModelRes?.data;

  return (
    <>
      {selectedModel ? (
        <>
          <ModelHeroSection model={selectedModel} />
          <KeySpecifications />
          <GallerySection model={selectedModel} />
          <IncentivesSection />
          <TrimView model={selectedModel} />
          <BrandsSpecialSection />
          <Blogs />
          {/* <FactoryWranties factoryWranties={selectedModel.factoryWranties} /> */}
        </>
      ) : (
        <div>No Model Found</div>
      )}
    </>
  );
}
