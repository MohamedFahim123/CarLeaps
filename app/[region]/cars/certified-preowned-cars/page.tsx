
import Cta from "@/components/Common/Cta";
import CpoCars from "@/components/Homes/CPO/CpoCars";
import CpoFeatures from "@/components/Homes/CPO/CpoFeatures";
import CpoHero from "@/components/Homes/CPO/CpoHero";
import Brands from "@/components/Homes/Home/Brands";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certified PreOwned Cars",
};

export default function CPOPage() {
    return (
        <>
            <div id="nav-mobile"></div>
            <CpoHero />
            <CpoCars />
            <Cta />
            <CpoFeatures />
            <Brands currPage="cpo" />
        </>
    );
};