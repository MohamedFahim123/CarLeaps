import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("CARS_TOKEN")?.value || "";

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  return NextResponse.json({ token });
}
