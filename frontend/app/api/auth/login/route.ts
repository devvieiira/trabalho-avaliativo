import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const token = url.searchParams.get("access_token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return NextResponse.redirect(new URL("/", req.url));
}
