// app/actions/setRegionCookie.js
"use server";

import { cookies } from "next/headers";

export async function setRegionCookie(region: string) {
  (await cookies()).set("region", region, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: true,
  });
}
