import { baseUrl } from "@/app/utils/mainData";
import AboutBrand from "@/components/Homes/Brands/AboutBrand";
import AllCurrentModels from "@/components/Homes/Brands/AllCurrentModels";
import BrandsBanner from "@/components/Homes/Brands/BrandsBanner";
import BrandsChooseUs from "@/components/Homes/Brands/BrandsChooseUs";
import BrandsHeroSection from "@/components/Homes/Brands/BrandsHeroSection";
import BrandsSpecialSection from "@/components/Homes/Brands/BrandsSpecialSection";
import IncentivesSection from "@/components/Homes/Brands/IncentivesSection";
import Blogs from "@/components/Homes/Home/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Brand Details",
};

export default async function BrandsPage({
  params,
}: {
  params: Promise<{
    brand: string;
  }>;
}) {
  const { brand } = await params;
  const selectedBrandReq = await fetch(`${baseUrl}/show-make`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      make_id: brand,
    }),
  });

  const selectedBrandRes = await selectedBrandReq.json();
  const selectedBrand = selectedBrandRes?.data;

  return (
    <>
      {selectedBrand ? (
        <>
          <BrandsHeroSection brand={selectedBrand} />
          <BrandsBanner />
          <IncentivesSection brand={selectedBrand} />
          <AboutBrand brand={selectedBrand} />
          <BrandsChooseUs brand={selectedBrand} />
          <BrandsSpecialSection />
          <Blogs />
          <AllCurrentModels brand={selectedBrand} />
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
}
