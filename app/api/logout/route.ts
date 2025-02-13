import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body?.token;

    const response = NextResponse.json({ message: "Logged out successfully" });

    response.cookies.set("CARS_TOKEN", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
