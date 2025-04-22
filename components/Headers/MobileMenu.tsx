"use client";

import { useTokenStore } from "@/app/store/Token";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import styles from "./NavStyles.module.css";

function MobileMenu({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}) {
  const [currRegion, setCurrRegion] = useState<string>(MainRegionName);

  const { token } = useTokenStore();

  useEffect(() => {
    const region: string = Cookies.get("region") || MainRegionName;
    setCurrRegion(region);
  }, []);

  useEffect(() => {
    const mobileNavigation = document.querySelectorAll('[href="#nav-mobile"]');
    const mobileMenu = document.getElementById("nav-mobile");
    const mobileMenuOverlay = document.getElementById("mobileOverlay");

    mobileMenu?.classList.remove("mm-menu_opened");
    mobileMenuOverlay?.classList.remove("active");

    const toggleActiveClass = (e: { preventDefault: () => void }) => {
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
    setShowMenu(false);
  };

  return (
    <>
      {showMenu && (
        <>
          <div
            className="mm-menu mm-menu_offcanvas mm-menu_position-left mm-menu_opened mm-menu_theme-black"
            style={{
              zIndex: 101,
              transition: "0.5s",
            }}
          >
            <div className="mm-panels">
              <div id="navbar">
                <div className="mm-navbar mm-navbar_sticky border-0 mb-0 mx-0 w-100 pe-3 d-flex justify-content-start align-items-center text-start bg-black">
                  {!token ? (
                    <Link
                      onClick={closeMenu}
                      href={`/${currRegion}/auth/login`}
                      title="Login Page"
                      className="box-account text-white text-start d-flex align-items-center gap-2 UnderLinedText"
                      style={{ maxWidth: "100px" }}
                    >
                      <span className="icon m-0">
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_147_6490)">
                            <path
                              d="M7.99998 9.01221C3.19258 9.01221 0.544983 11.2865 0.544983 15.4161C0.544983 15.7386 0.806389 16.0001 1.12892 16.0001H14.871C15.1935 16.0001 15.455 15.7386 15.455 15.4161C15.455 11.2867 12.8074 9.01221 7.99998 9.01221ZM1.73411 14.8322C1.9638 11.7445 4.06889 10.1801 7.99998 10.1801C11.9311 10.1801 14.0362 11.7445 14.2661 14.8322H1.73411Z"
                              fill="white"
                            />
                            <path
                              d="M7.99999 0C5.79171 0 4.12653 1.69869 4.12653 3.95116C4.12653 6.26959 5.86415 8.15553 7.99999 8.15553C10.1358 8.15553 11.8735 6.26959 11.8735 3.95134C11.8735 1.69869 10.2083 0 7.99999 0ZM7.99999 6.98784C6.50803 6.98784 5.2944 5.62569 5.2944 3.95134C5.2944 2.3385 6.43231 1.16788 7.99999 1.16788C9.54259 1.16788 10.7056 2.36438 10.7056 3.95134C10.7056 5.62569 9.49196 6.98784 7.99999 6.98784Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_147_6490">
                              <rect width={16} height={16} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      Sign in
                    </Link>
                  ) : (
                    <>
                      <div className="btn d-flex justify-content-start">
                        <Link
                          href={`/${currRegion}/dashboard/profile`}
                          className={`btn ${styles.btnCarPortal} bg-white px-3 text-white`}
                        >
                          Dealer Portal
                        </Link>
                      </div>
                    </>
                  )}
                  <div
                    className={`position-absolute ${styles.navCloseBtn}`}
                    onClick={closeMenu}
                  >
                    <CiSquareRemove className="text-white" size={40} />
                  </div>
                </div>
                <hr className="bg-dark mt-0" style={{ height: "1px" }} />
                <ul className="navigation mm-listview pt-0">
                  <li>
                    <Link
                      href={`/${currRegion}/cars/home`}
                      onClick={closeMenu}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={closeMenu}
                      href={`/${currRegion}/cars/cars-for-sale`}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    >
                      Cars for sale
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={closeMenu}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                      href={`/${currRegion}/cars/research-new-cars`}
                    >
                      Research
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={closeMenu}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                      href={`/${currRegion}/cars/perfect-match`}
                    >
                      Perfect Match
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={closeMenu}
                      href={`/${currRegion}/cars/certified-preowned-cars`}
                      className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    >
                      Certified used cars
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="overlay-mobile" onClick={closeMenu}></div>
    </>
  );
}

export default MobileMenu;
