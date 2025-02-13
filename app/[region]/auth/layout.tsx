"use client";

import BackToTop from "@/components/Common/BackToTop";
import FilterSidebar from "@/components/Common/FilterSidebar";
import Footer from "@/components/Footers/Footer";
import Header1 from "@/components/Headers/Header";
import MobileMenu from "@/components/Headers/MobileMenu";
import WithoutAuth from "@/components/ProtectedRoute/WithoutAuth";
import { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
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
export default WithoutAuth(AuthLayout);
