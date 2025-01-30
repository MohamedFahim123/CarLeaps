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
        <Header1 headerClass="boxcar-header" />
        {children}
        <Footer parentClass="boxcar-footer footer-style-one" />
      </div>
      <FilterSidebar />
      <BackToTop />
    </>
  );
}
