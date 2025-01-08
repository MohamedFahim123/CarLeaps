import Cta from "@/components/Common/Cta";
import Blogs from "@/components/Homes/home-1/Blogs";
import Brands from "@/components/Homes/home-1/Brands";
import Cars from "@/components/Homes/home-1/Cars";
import Cars2 from "@/components/Homes/cpo/Cars2";
import Facts from "@/components/Homes/home-1/Facts";
import Features from "@/components/Homes/home-1/Features";
import Features2 from "@/components/Homes/home-1/Features2";
import Features3 from "@/components/Homes/home-1/Features3";
import Hero from "@/components/Homes/home-1/Hero";
import Testimonials from "@/components/Homes/home-1/Testimonials";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Valid Cars",
  description: "Your Favorite Cars Portal.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands currPage="home" />
      <Cars />
      <Features />
      <Facts />
      <Features2 />
      <Cars2 />
      <Features3 />
      <Testimonials />
      <Blogs />
      <Cta />
    </>
  );
}
