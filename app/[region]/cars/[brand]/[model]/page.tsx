import BrandsBlogs from "@/components/Homes/Brands/BrandsBlogs";
import BrandsSpecialSection from "@/components/Homes/Brands/BrandsSpecialSection";
import IncentivesSection from "@/components/Homes/Brands/IncentivesSection";
import { MODEL, Models } from "@/components/Homes/Model/data";
import FactoryWranties from "@/components/Homes/Model/FactoryWranties";
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

  const selectedModel: MODEL | undefined = Models.find(
    (el) => el.model.toLowerCase() === model.toLowerCase()
  );

  return (
    <>
      {selectedModel ? (
        <>
          <ModelHeroSection model={selectedModel} />
          <KeySpecifications />
          <GallerySection model={selectedModel} />
          <IncentivesSection incentives={selectedModel.incentives} />
          <TrimView model={selectedModel} />
          <BrandsSpecialSection />
          <BrandsBlogs blogPosts={selectedModel.blogPosts} />
          <FactoryWranties factoryWranties={selectedModel.factoryWranties} />
        </>
      ) : (
        <div>No Model Found</div>
      )}
    </>
  );
}
