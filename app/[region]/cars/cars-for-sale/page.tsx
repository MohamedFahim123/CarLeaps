import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import Loader from "@/components/Common/Loader";
import CarsForSaleBrands from "@/components/Homes/CarsForSale/CarsForSaleBrands";
import CarType from "@/components/Homes/CarsForSale/CarType";
import Hero from "@/components/Homes/CarsForSale/Hero";
import Cars from "@/components/Homes/Home/Cars";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CarLeaps - Cars For Sale",
  description: "Find and rent cars at the best prices",
};

export default function CarsForSalePage() {
  const { carsForSaleLoading } = useCarsForSaleStore.getState();

  if (carsForSaleLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Hero />
      <CarType />
      <CarsForSaleBrands />
      <Cars />
    </Suspense>
  );
}
