import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body?.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ message: "Token missing or invalid" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Token stored securely" });

    response.cookies.set("CARS_TOKEN", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    });

    return response;
  } catch (error: unknown) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
