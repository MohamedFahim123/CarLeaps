"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { baseUrl } from "@/app/utils/mainData";
import axios from "axios";
import { useTokenStore } from "@/app/store/Token";

interface menuItem {
  href: string;
  src: string;
  width: number;
  height: number;
  label: string;
  isExternal?: boolean;
  onClick?: () => Promise<void>;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [currRegion, setCurrentRegion] = useState<string | undefined>();
  const { token, clearToken } = useTokenStore();

  useEffect(() => {
    const region = Cookies.get("region") || "riyadh";
    setCurrentRegion(region);
  }, []);

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
      if (res.status === 200) {
        clearToken();
        axios.post("/api/logout", { token: "" });
        window.location.reload();
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

  const menuItems: menuItem[] = [
    {
      href: `/${currRegion}/dashboard/profile`,
      src: "/images/icons/dash7.svg",
      width: 18,
      height: 18,
      label: "My Profile",
    },
    {
      href: `/${currRegion}/dashboard/my-listings`,
      src: "/images/icons/dash2.svg",
      width: 22,
      height: 22,
      label: "My Listings",
    },
    {
      href: `/${currRegion}/dashboard/add-listings`,
      src: "/images/icons/dash3.svg",
      width: 22,
      height: 22,
      label: "Add Listings",
    },
    {
      href: "#",
      src: "/images/icons/dash8.svg",
      width: 18,
      height: 18,
      label: "Logout",
      isExternal: true,
      onClick: logoutHandler,
    },
  ];

  return (
    <div className="side-bar">
      <ul className="nav-list">
        {menuItems?.map((item, index) => (
          <li key={index}>
            {item?.isExternal ? (
              // <a href={item.href}>
              //   <Image alt="" src={item.src} width={item.width} height={item.height} />
              //   {item.label}
              // </a>
              <button onClick={item.onClick} className="logout-button">
                <Image alt="" src={item.src} width={item.width} height={item.height} />
                {item.label}
              </button>
            ) : (
              <Link href={item.href} className={pathname == item.href ? "menuActive" : ""}>
                <Image alt="" src={item.src} width={item.width} height={item.height} />
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
