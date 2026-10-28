"use client";
import Footer from "@/components/Footers/Footer";
import HeaderDashboard from "@/components/Headers/HeaderDashboard";
import WithAuth from "@/components/ProtectedRoute/WithAuth";
import { PropsWithChildren } from "react";

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div style={{ background: "var(--theme-color-dark)" }}>
      <HeaderDashboard />
      {children}
      <Footer parentClass="boxcar-footer footer-style-one v2" />
    </div>
  );
}
export default WithAuth(DashboardLayout);
