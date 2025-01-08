"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

interface menuItem {
  href: string;
  src: string;
  width: number;
  height: number;
  label: string;
  isExternal?: boolean;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [currRegion, setCurrentRegion] = useState<string | undefined>();

  useEffect(() => {
    const region = Cookies.get("region") || "riyadh";
    setCurrentRegion(region);
  }, []);

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
    },
  ];

  return (
    <div className="side-bar">
      <ul className="nav-list">
        {
          menuItems?.map((item, index) => (
            <li key={index}>
              {
                item?.isExternal ? (
                  <a href={item.href}>
                    <Image
                      alt=""
                      src={item.src}
                      width={item.width}
                      height={item.height}
                    />
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={pathname == item.href ? "menuActive" : ""}
                  >
                    <Image
                      alt=""
                      src={item.src}
                      width={item.width}
                      height={item.height}
                    />
                    {item.label}
                  </Link>
                )
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
}
