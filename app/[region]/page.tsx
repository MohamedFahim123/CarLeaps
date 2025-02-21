"use client";

import { redirect } from "next/navigation";
import { MainRegionName } from "../utils/mainData";
import Cookies from "js-cookie";

export default function RegionPage() {
  const Region = Cookies.get("region") || MainRegionName;

  return redirect(`/${Region}/cars/home`);
}
