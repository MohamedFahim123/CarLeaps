
import Cta from "@/components/Common/Cta";
import Brands from "@/components/Homes/home-1/Brands";
import Facts from "@/components/Homes/home-1/Facts";
import Blogs from "@/components/Homes/home-1/Blogs";
import Cars from "@/components/Homes/cpo/Cars";
import Cars2 from "@/components/Homes/cpo/Cars2";
import Features from "@/components/Homes/cpo/Features";
import Features2 from "@/components/Homes/home-1/Features2";
import FooterBanner from "@/components/Homes/cpo/FooterBanner";
import Hero from "@/components/Homes/cpo/Hero";
import Testimonials from "@/components/Homes/home-1/Testimonials";
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
            <Cars2 />
            <Testimonials />
            <Brands currPage="cpo" />
            <Features2 />
            <Facts />
            <Blogs />
            <FooterBanner />
        </>
    );
};