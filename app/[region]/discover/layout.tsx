import FilterSidebar from "@/components/Common/FilterSidebar";
import "@/public/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import MobileMenu from "@/components/Headers/MobileMenu";
import BackToTop from "@/components/Common/BackToTop";
import { ChildrenPropsInterface } from "../../utils/interfaces";
import { Metadata } from "next";
import Footer from "@/components/Footers/Footer";
import Header1 from "@/components/Headers/Header";

export const metadata: Metadata = {
    title: "Valid Cars",
    description: "Your Favorite Cars Portal.",
};

export default function DiscoverLayout({ children }: ChildrenPropsInterface) {
    return (
        <>
            <MobileMenu />
            <div className="boxcar-wrapper">
                <Header1 />
                {children}
                <Footer parentClass="boxcar-footer footer-style-one" />
            </div> <FilterSidebar />{" "}
            <BackToTop />
        </>
    );
}
