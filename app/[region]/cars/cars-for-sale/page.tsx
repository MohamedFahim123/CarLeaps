
import CarsForSaleBrands from "@/components/Homes/CarsForSale/CarsForSaleBrands";
import CarType from "@/components/Homes/CarsForSale/CarType";
import Features from "@/components/Homes/CarsForSale/Features";
import Hero from "@/components/Homes/CarsForSale/Hero";
import Cars from "@/components/Homes/Home/Cars";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Cars For Sale",
  description: "Find and rent cars at the best prices",
};

export default function CarsForSalePage() {
  return (
    <>
      <Hero />
      <CarType />
      <CarsForSaleBrands />
      <Cars />
      <Features />
    </>
  );
}
