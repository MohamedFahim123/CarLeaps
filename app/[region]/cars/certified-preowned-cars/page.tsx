
import Cta from "@/components/Common/Cta";
import Cars from "@/components/Homes/CPO/Cars";
import Features from "@/components/Homes/CPO/Features";
import Hero from "@/components/Homes/CPO/Hero";
import Brands from "@/components/Homes/Home/Brands";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certified PreOwned Cars",
};

export default function CPOPage() {
    return (
        <>
            <div id="nav-mobile"></div>
            <Hero />
            <Cars />
            <Cta />
            <Features />
            <Brands currPage="cpo" />
        </>
    );
};