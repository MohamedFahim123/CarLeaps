"use client";

import { useTokenStore } from "@/app/store/Token";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import styles from "./NavStyles.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface menuItem {
  href: string;
  src: string;
  width: number;
  height: number;
  label: string;
  isExternal?: boolean;
  onClick?: () => void;
}

const MobileDashboardMenue = ({
  setShowMenu,
}: {
  setShowMenu: (showMenu: boolean) => void;
}) => {
  const [currRegion, setCurrRegion] = useState<string>(MainRegionName);
  const router = useRouter();

  const { token, clearToken } = useTokenStore();
  const pathname = usePathname();

  const logoutHandler = useCallback(async () => {
    const toastId = toast.loading("Submitting...");
    try {
      const res = await axios.post(
        `${baseUrl}/dealer/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(res?.data?.message, {
        autoClose: 1500,
      });
      clearToken();
      if (res.status === 200) {
        await axios.post("/api/logout", { token: "" });
        window.location.href = "/";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Something went wrong!", {
          autoClose: 1500,
        });
      }
    }
  }, [clearToken, token]);

  useEffect(() => {
    const region: string = Cookies.get("region") || MainRegionName;
    setCurrRegion(region);
  }, []);

  useEffect(() => {
    setShowMenu(true);
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
  }, [setShowMenu]);

  const menuItems: menuItem[] = [
    {
      href: `/${currRegion}/dashboard/profile`,
      src: "/images/icons/dash7.svg",
      width: 18,
      height: 18,
      label: "My Profile",
      onClick: () => {
        setShowMenu(false);
        router.push(`/${currRegion}/dashboard/profile`);
      },
    },
    {
      href: `/${currRegion}/dashboard/my-listings`,
      src: "/images/icons/dash2.svg",
      width: 22,
      height: 22,
      label: "My Listings",
      onClick: () => {
        setShowMenu(false);
        router.push(`/${currRegion}/dashboard/my-listings`);
      },
    },
    {
      href: `/${currRegion}/dashboard/add-listings`,
      src: "/images/icons/dash3.svg",
      width: 22,
      height: 22,
      label: "Add Listings",
      onClick: () => {
        setShowMenu(false);
        router.push(`/${currRegion}/dashboard/add-listings`);
      },
    },
    {
      href: `#`,
      src: "/images/icons/dash8.svg",
      width: 22,
      height: 22,
      label: "Logout",
      isExternal: true,
      onClick: logoutHandler,
    },
  ];

  return (
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
              <div className="logo-inner">
                <div className="logo">
                  <Link href={`/`}>
                    <Image
                      alt=""
                      title="Boxcar"
                      width={108}
                      height={26}
                      src="/images/logo.svg"
                    />
                  </Link>
                </div>
              </div>
              <div
                className={`position-absolute ${styles.navCloseBtn}`}
                onClick={() => setShowMenu(false)}
              >
                <CiSquareRemove className="text-white" size={40} />
              </div>
            </div>
            <hr className="bg-dark mt-0" style={{ height: "1px" }} />
            <ul className="navigation mm-listview pt-0">
              {menuItems?.map((item, index) => (
                <li key={index}>
                  {item?.isExternal ? (
                    <Link
                      href={item.href}
                      onClick={item.onClick}
                      className="logout-button fw-semibold text-danger UnderLinedText px-2 py-3"
                    >
                      <Image
                        alt=""
                        src={item.src}
                        width={item.width}
                        height={item.height}
                      />
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      onClick={item.onClick}
                      href={item.href}
                      className={`p-2 fw-semibold ${
                        pathname == item.href ? "menuActive" : ""
                      }`}
                    >
                      <Image
                        alt=""
                        src={item.src}
                        width={item.width}
                        height={item.height}
                      />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className="overlay-mobile"
        id="mobileOverlay"
        onClick={() => setShowMenu(false)}
      ></div>
    </>
  );
};
export default React.memo(MobileDashboardMenue);
