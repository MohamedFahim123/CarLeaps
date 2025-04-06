import CpoCars2 from "@/components/Homes/CPO/CpoCars2";
import Brands from "@/components/Homes/Home/Brands";
import Cars from "@/components/Homes/Home/Cars";
import Facts from "@/components/Homes/Home/Facts";
import Features from "@/components/Homes/Home/Features";
import Features2 from "@/components/Homes/Home/Features2";
import Features3 from "@/components/Homes/Home/Features3";
import Hero from "@/components/Homes/Home/Hero";
import Banner from "@/components/Homes/ResearchCars/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Home",
  description: "Your Favorite Cars Portal.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands currPage="home" />
      <Banner />
      <Cars />
      <Features />
      <Facts />
      <Features2 />
      <CpoCars2 />
      <Features3 />
      {/* <Blogs /> */}
    </>
  );
}
