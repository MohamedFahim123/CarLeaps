
import Cta from "@/components/Common/Cta";
import Cars from "@/components/Homes/cpo/Cars";
import Features from "@/components/Homes/cpo/Features";
import Hero from "@/components/Homes/cpo/Hero";
import Brands from "@/components/Homes/home-1/Brands";
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