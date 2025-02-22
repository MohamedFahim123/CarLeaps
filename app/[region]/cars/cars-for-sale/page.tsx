import CarType from "@/components/Homes/CarsForSale/CarType";
import Features from "@/components/Homes/CarsForSale/Features";
import Hero from "@/components/Homes/CarsForSale/Hero";
import Cars from "@/components/Homes/Home/Cars";
import ResearchCarsBrands from "@/components/Homes/ResearchCars/ResearchCarsBrands";
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
      <ResearchCarsBrands />
      <Cars />
      <Features />
    </>
  );
}
