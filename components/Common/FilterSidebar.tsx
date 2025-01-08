"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FilterSidebar() {
  const pathname = usePathname();
  useEffect(() => {
    const filterPopup = document.querySelector(".filter-popup");
    const wrapFixedSidebar = document.querySelector(".wrap-fixed-sidebar");
    const closeButtons = document.querySelectorAll(
      ".close-filters, .sidebar-backdrop"
    );

    const openSidebar = (e: { preventDefault: () => void; }) => {
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

    // Cleanup event listeners when component unmounts
    return () => {
      filterPopup?.removeEventListener("click", openSidebar);
      closeButtons?.forEach((button) =>
        button?.removeEventListener("click", closeSidebar)
      );
    };
  }, [pathname]); // Empty dependency array ensures this runs only on mount/unmount

  return <></>;
}
