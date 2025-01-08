"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function MobileMenu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [currRegion, setCurrRegion] = useState<string>("riyadh");

  useEffect(() => {
    const region = Cookies.get("region") || "riyadh";
    setCurrRegion(region);
  }, []);

  useEffect(() => {
    setShowMenu(true);
    const mobileNavigation = document.querySelectorAll('[href="#nav-mobile"]');
    const mobileMenu = document.getElementById("nav-mobile");
    const mobileMenuOverlay = document.getElementById("mobileOverlay");

    mobileMenu?.classList.remove("mm-menu_opened");
    mobileMenuOverlay?.classList.remove("active");

    const toggleActiveClass = (e: { preventDefault: () => void; }) => {
      e?.preventDefault();
      mobileMenu?.classList.toggle("mm-menu_opened");
      mobileMenuOverlay?.classList.toggle("active");
    };

    mobileNavigation.forEach((elm) =>
      elm?.addEventListener("click", toggleActiveClass)
    );

    return () => {
      mobileNavigation.forEach((elm) =>
        elm?.removeEventListener("click", toggleActiveClass)
      );
    };
  }, []);

  const closeMenu = () => {
    const mobileMenu = document.getElementById("nav-mobile");
    const mobileMenuOverlay = document.getElementById("mobileOverlay");
    mobileMenu?.classList.remove("mm-menu_opened");
    mobileMenuOverlay?.classList.remove("active");
  };

  return (
    <>
      <div
        id="nav-mobile"
        className="mm-menu mm-menu_offcanvas mm-menu_position-left mm-menu_ mm-menu_theme-black"
        style={{
          zIndex: 101,
          transition: "0.5s",
        }}
      >
        {
          showMenu && (
            <div className="mm-panels">
              <div
                id="navbar"
              >
                <div className="mm-navbar mm-navbar_sticky">
                  <Link href={`/${currRegion}/discover/home`} className="mm-navbar__title ps-2">
                    <span>ValidCars</span>
                  </Link>
                </div>
                <ul className="navigation mm-listview">
                  <li
                  >
                    <Link
                      href={`/${currRegion}/discover/home`}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/${currRegion}/discover/shop`}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    >
                      Shop
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                      href={`/${currRegion}/discover/perfect-match`}
                    >
                      Perfect Match
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/${currRegion}/discover/certified-preowned-cars`}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    >
                      CPO
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                      href={`/${currRegion}/discover/research-new-cars`}
                    >
                      Research
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                      href={`/${currRegion}/discover/pricing-hub`}
                    >
                      Pricing Hub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
      </div>
      <div
        className="overlay-mobile"
        id="mobileOverlay"
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default React.memo(MobileMenu);