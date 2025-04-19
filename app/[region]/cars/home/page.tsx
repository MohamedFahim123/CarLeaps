import Cars from "@/components/Homes/Home/Cars";
import Features from "@/components/Homes/Home/Features";
import Features3 from "@/components/Homes/Home/Features3";
import Hero from "@/components/Homes/Home/Hero";
import Banner from "@/components/Homes/ResearchCars/Banner";
import ResearchCarsBrands from "@/components/Homes/ResearchCars/ResearchCarsBrands";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Home",
  description: "Your Favorite Cars Portal.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ResearchCarsBrands />
      <Banner />
      <Cars />
      <Features />
      <Features3 />
    </>
  );
}
