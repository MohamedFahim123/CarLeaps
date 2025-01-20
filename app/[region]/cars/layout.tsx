"use client";

import BackToTop from "@/components/Common/BackToTop";
import FilterSidebar from "@/components/Common/FilterSidebar";
import Footer from "@/components/Footers/Footer";
import Header1 from "@/components/Headers/Header";
import MobileMenu from "@/components/Headers/MobileMenu";
import "@/public/main.scss";
import "photoswipe/dist/photoswipe.css";
import { ChildrenPropsInterface } from "../../utils/interfaces";
import { usePathname } from "next/navigation";

export default function CarsLayout({ children }: ChildrenPropsInterface) {
  const pathName = usePathname();
  const currRegion: string = pathName.split("/")[1];

  const condition: boolean =
    pathName.includes(`/${currRegion}/cars/cars-for-sale/search`) ||
    pathName.includes(`/${currRegion}/cars/car-details`) ||
    pathName.includes(`/${currRegion}/cars/perfect-match`);

  return (
    <>
      <MobileMenu />
      {condition ? (
        <>
          <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
          {children}
          <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
        </>
      ) : (
        <div className="boxcar-wrapper">
          <Header1 headerClass={"boxcar-header"} />
          {children}
          <Footer parentClass={"boxcar-footer footer-style-one"} />
        </div>
      )}
      <FilterSidebar />
      <BackToTop />
    </>
  );
}
