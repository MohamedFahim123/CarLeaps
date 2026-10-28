"use client";

import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { useSearchCarsStore } from "@/app/store/carSearch";
import BackToTop from "@/components/Common/BackToTop";
import FilterSidebar from "@/components/Common/FilterSidebar";
import Footer from "@/components/Footers/Footer";
import Header1 from "@/components/Headers/Header";
import MobileMenu from "@/components/Headers/MobileMenu";
import "@/public/main.scss";
import { usePathname } from "next/navigation";
import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import { ChildrenPropsInterface } from "../../utils/interfaces";

export default function CarsLayout({ children }: ChildrenPropsInterface) {
  const pathName = usePathname();
  const routeRegion = useRouteRegion();
  const currRegion: string = routeRegion || pathName.split("/")[1];
  const setCarsRegion = useCarsForSaleStore((s) => s.setRegion);
  const carsRegion = useCarsForSaleStore((s) => s.currentRegion);
  const setResearchRegion = useResearchCarsMakesStore(
    (s) => s.setResearchMakesRegion
  );
  const researchRegion = useResearchCarsMakesStore((s) => s.currRegion);
  const searchRegion = useSearchCarsStore((s) => s.currentRegion);
  const setSearchRegion = useSearchCarsStore.setState;

  useEffect(() => {
    if (carsRegion !== currRegion) setCarsRegion(currRegion);
    if (researchRegion !== currRegion) setResearchRegion(currRegion);
    if (searchRegion !== currRegion) setSearchRegion({ currentRegion: currRegion });
  }, [
    carsRegion,
    currRegion,
    researchRegion,
    searchRegion,
    setCarsRegion,
    setResearchRegion,
    setSearchRegion,
  ]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const condition: boolean =
    pathName.includes(`/${currRegion}/cars/cars-for-sale/search`) ||
    pathName.includes(`/${currRegion}/cars/car-details`) ||
    pathName.includes(`/${currRegion}/cars/perfect-match`);

  return (
    <>
      <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      {condition ? (
        <>
          <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
          {children}
          <Footer parentClass="boxcar-footer footer-style-one" />
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
