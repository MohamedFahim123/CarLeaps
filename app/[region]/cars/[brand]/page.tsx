import BrandsMainPage from "@/components/Homes/Brands/BrandsMainPage";
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

  return (
    <>
      <BrandsMainPage brandName={brand} />
    </>
  );
}
