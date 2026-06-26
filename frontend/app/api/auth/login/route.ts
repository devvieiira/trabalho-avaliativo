import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const token = url.searchParams.get("access_token");
  const perfil = url.searchParams.get("perfil");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("perfil", perfil ?? "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  let redirect = "/";

  switch (perfil) {
    case "EMPRESA":
      redirect = "/empresa/vagas";
      break;

    case "ALUNO":
      redirect = "/";
      break;

    case "ADMIN":
      redirect = "/admin";
      break;
  }

  return NextResponse.redirect(new URL(redirect, req.url));
}
