"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function FilterSidebar() {
  const pathname = usePathname();
  useEffect(() => {
    const filterPopup = document.querySelector(".filter-popup");
    const wrapFixedSidebar = document.querySelector(".wrap-fixed-sidebar");
    const closeButtons = document.querySelectorAll(
      ".close-filters, .sidebar-backdrop"
    );

    const openSidebar = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      wrapFixedSidebar?.classList.add("active");
    };

    const closeSidebar = () => {
      wrapFixedSidebar?.classList.remove("active");
    };
    closeSidebar();

    filterPopup?.addEventListener("click", openSidebar);
    closeButtons?.forEach((button) =>
      button?.addEventListener("click", closeSidebar)
    );

    return () => {
      filterPopup?.removeEventListener("click", openSidebar);
      closeButtons?.forEach((button) =>
        button?.removeEventListener("click", closeSidebar)
      );
    };
  }, [pathname]);

  return <></>;
}
export default React.memo(FilterSidebar);
