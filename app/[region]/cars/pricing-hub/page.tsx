import CpoFeatures from "@/components/Homes/CPO/CpoFeatures";
import Banner from "@/components/Homes/PricingHub/Banner";
import Hero from "@/components/Homes/PricingHub/Hero";
import PricingPlans from "@/components/Homes/PricingHub/PricingPlans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Pricing Hub",
  description: "CarLeaps Offers The Best Prices Ever.",
};

export default function PricingHubPage() {
  return (
    <>
      <Hero />
      <CpoFeatures />
      <PricingPlans />
      <Banner />
      {/* <Blogs /> */}
    </>
  );
}
