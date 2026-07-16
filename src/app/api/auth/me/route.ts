import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized: Missing or malformed token." },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyJwt(token);

    if (!payload) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or expired token." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      email: payload.email,
      name: payload.name,
      isAuthenticated: true
    });
  } catch (error) {
    console.error("Auth me API error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
