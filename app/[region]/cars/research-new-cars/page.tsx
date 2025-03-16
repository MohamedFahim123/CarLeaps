import Blogs from "@/components/Homes/Home/Blogs";
import Banner from "@/components/Homes/ResearchCars/Banner";
import Cars from "@/components/Homes/ResearchCars/Cars";
import CarsCollection from "@/components/Homes/ResearchCars/CarsCollection";
import Categories from "@/components/Homes/ResearchCars/Categories";
import Features from "@/components/Homes/ResearchCars/Features";
import Hero from "@/components/Homes/ResearchCars/Hero";
import ResearchCarsBrands from "@/components/Homes/ResearchCars/ResearchCarsBrands";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Research New Cars",
  description: "Find the best cars for your needs.",
};

export default function ResearchNewCarsPage() {
  return (
    <>
      <Hero />
      <Categories />
      <ResearchCarsBrands />
      <Features />
      <Cars />
      <Blogs />
      <Banner />
      <CarsCollection />
    </>
  );
}
