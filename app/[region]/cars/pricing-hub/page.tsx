import Features from "@/components/Homes/CPO/Features";
import Blogs from "@/components/Homes/Home/Blogs";
import Banner from "@/components/Homes/PricingHub/Banner";
import Hero from "@/components/Homes/PricingHub/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Pricing Hub',
    description: 'Valid Cars Offers The Best Prices Ever.',
};

export default function PricingHubPage() {
    return (
        <>
            <Hero />
            <Features />
            <Banner />
            <Blogs />
        </>
    );
};