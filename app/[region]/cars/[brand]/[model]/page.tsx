import BrandsBlogs from "@/components/Homes/Brands/BrandsBlogs";
import IncentivesSection from "@/components/Homes/Brands/IncentivesSection";
import { MODEL, Models } from "@/components/Homes/Model/data";
import GallerySection from "@/components/Homes/Model/GallerySection";
import ModelHeroSection from "@/components/Homes/Model/ModelHeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Details",
};

export default function ModelPage({ params }: { params: { model: string } }) {
  const { model } = params;

  const selectedModel: MODEL | undefined = Models.find(
    (el) => el.model.toLowerCase() === model.toLowerCase()
  );

  return (
    <>
      {selectedModel ? (
        <>
          <ModelHeroSection model={selectedModel} />
          <GallerySection model={selectedModel} />
          <BrandsBlogs blogPosts={selectedModel.blogPosts} />
          <IncentivesSection incentives={selectedModel.incentives} />
        </>
      ) : (
        <div>No Model Found</div>
      )}
    </>
  );
}
