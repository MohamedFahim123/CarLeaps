import AboutBrand from "@/components/Homes/Brands/AboutBrand";
import AllCurrentModels from "@/components/Homes/Brands/AllCurrentModels";
import BrandsBanner from "@/components/Homes/Brands/BrandsBanner";
import BrandsBlogs from "@/components/Homes/Brands/BrandsBlogs";
import BrandsChooseUs from "@/components/Homes/Brands/BrandsChooseUs";
import BrandsHeroSection from "@/components/Homes/Brands/BrandsHeroSection";
import BrandsSpecialSection from "@/components/Homes/Brands/BrandsSpecialSection";
import { Brand, Brands } from "@/components/Homes/Brands/Data";
import IncentivesSection from "@/components/Homes/Brands/IncentivesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Details",
};

export default async function BrandsPage({
  params,
}: {
  params: {
    brand: string;
  };
}) {
  const { brand } = await params;
  const selectedBrand: Brand | undefined = Brands?.find(
    (b) => b.slug.toLowerCase() === brand.toLowerCase()
  );

  return (
    <>
      {selectedBrand ? (
        <>
          <BrandsHeroSection brand={selectedBrand} />
          <BrandsBanner brand={selectedBrand} />
          <IncentivesSection incentives={selectedBrand.incentives} />
          <AboutBrand brand={selectedBrand} />
          <BrandsChooseUs brand={selectedBrand} />
          <BrandsSpecialSection />
          <BrandsBlogs blogPosts={selectedBrand.blogPosts} />
          <AllCurrentModels brand={selectedBrand} />
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
}
