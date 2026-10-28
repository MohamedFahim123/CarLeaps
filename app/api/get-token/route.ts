import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/** Probe endpoint: always 200 so clients can ask "logged in?" without error spam. */
export async function GET() {
  const token = (await cookies()).get("CARS_TOKEN")?.value || null;
  return NextResponse.json({ token });
}
