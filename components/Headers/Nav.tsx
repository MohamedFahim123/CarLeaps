"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Nav() {
  const [currRegion, setCurrRegion] = useState<string>("riyadh");

  useEffect(() => {
    const region = Cookies.get("region") || "riyadh";
    setCurrRegion(region);
  }, []);

  return (
    <>
      <li>
        <Link href={`/${currRegion}/discover/cars-for-sale`}>
          Cars for Sale
        </Link>
      </li>

      <li>
        <Link href={`/${currRegion}/discover/research-new-cars`}>
          Research new cars
        </Link>
      </li>

      <li>
        <Link href={`/${currRegion}/discover/perfect-match`}>
          Perfect Match
        </Link>
      </li>

      <li>
        <Link href={`/${currRegion}/discover/certified-preowned-cars`}>
          Certified used cars
        </Link>
      </li>

      <li>
        <Link href={`/${currRegion}/discover/pricing-hub`}>
          Pricing Hub
        </Link>
      </li>
    </>
  );
}

export default React.memo(Nav);