'use client';

import BackToTop from "@/components/Common/BackToTop";
import FilterSidebar from "@/components/Common/FilterSidebar";
import Footer from "@/components/Footers/Footer";
import Header1 from "@/components/Headers/Header";
import MobileMenu from "@/components/Headers/MobileMenu";
import "@/public/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { ChildrenPropsInterface } from "../../utils/interfaces";
import { usePathname } from "next/navigation";

export default function CarsLayout({ children }: ChildrenPropsInterface) {
    const pathName = usePathname();
    const currRegion = pathName.split('/')[1];
    const conditionForRadiusHeaderAndFooter = (pathName === `/${currRegion}/cars/perfect-match`);

    return (
        <>
            <MobileMenu />
            <div className="boxcar-wrapper">
                <Header1 headerClass={"boxcar-header"} />
                {children}
                <Footer parentClass={conditionForRadiusHeaderAndFooter ? "boxcar-footer footer-style-one v1 cus-st-1" : "boxcar-footer footer-style-one"} />
            </div>
            <FilterSidebar />
            <BackToTop />
        </>
    );
}
