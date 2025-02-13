"use client";

import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

const Region: string = Cookies.get("region") || MainRegionName;
const dashboardRoutes = [
  `/${Region}/dashboard/profile`,
  `/${Region}/dashboard/add-listings`,
  `/${Region}/dashboard/my-listings`,
];

export default function WithAuth<T extends Record<string, unknown>>(
  WrappedComponent: ComponentType<T>
) {
  return function ProtectedComponent(props: T) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      async function checkAuth() {
        try {
          const response = await fetch("/api/get-token", {
            credentials: "include",
          });

          if (response.ok) {
            if (dashboardRoutes.includes(pathname)) {
              setIsAuthorized(true);
            } else {
              router.push(`/${Region}/dashboard/profile`);
            }
            return;
          }

          setIsAuthorized(false);
          router.push(`/${Region}/auth/login`);
          return;
        } catch (error) {
          console.error("Auth Check Failed:", error);
          setIsAuthorized(false);
          router.push(`/${Region}/auth/login`);
          return;
        } finally {
          setIsLoading(false);
        }
      }

      checkAuth();
    }, [pathname, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isAuthorized === false) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
