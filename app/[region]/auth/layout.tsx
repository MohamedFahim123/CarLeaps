import { ChildrenPropsInterface } from "@/app/utils/interfaces";
import BackToTop from "@/components/Common/BackToTop";
import FilterSidebar from "@/components/Common/FilterSidebar";
import Footer from "@/components/Footers/Footer";
import Header1 from "@/components/Headers/Header";
import MobileMenu from "@/components/Headers/MobileMenu";


export default function AuthLayout({ children }: ChildrenPropsInterface) {
    return (
        <>
            <MobileMenu />
            <div className="boxcar-wrapper">
                <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
                {children}
                <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
            </div> <FilterSidebar />{" "}
            <BackToTop />
        </>
    );
};