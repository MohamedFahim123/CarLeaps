import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MainRegionName } from "./app/utils/constants";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  const regionCookie = req.cookies.get("region");
  const region: string = regionCookie?.value || MainRegionName;
  if (url.pathname === "/") {
    url.pathname = `/${region}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
