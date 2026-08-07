import { NextResponse } from "next/server";


/**
 * GET /api/locale?lang=en-US
 * Sets the preferred language/locale for the user.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("lang") || "en-US";

  const response = NextResponse.json({ success: true, locale });
  response.cookies.set({
    name: "locale",
    value: locale,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
