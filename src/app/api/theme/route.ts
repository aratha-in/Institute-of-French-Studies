import { NextResponse } from "next/server";


export async function GET() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "theme",
    value: "dark",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
