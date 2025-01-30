import { ChildrenPropsInterface } from "@/app/utils/interfaces";
import Footer from "@/components/Footers/Footer";
import HeaderDashboard from "@/components/Headers/HeaderDashboard";

export default function DashboardLayout({ children }: ChildrenPropsInterface) {
  return (
    <div style={{ background: "var(--theme-color-dark)" }}>
      <HeaderDashboard />
      {children}
      <Footer parentClass="boxcar-footer footer-style-one v2" />
    </div>
  );
}
