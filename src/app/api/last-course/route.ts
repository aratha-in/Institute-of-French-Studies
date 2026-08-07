import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * POST /api/last-course
 * Body: { courseId: string }
 * Stores the last visited course so the UI can resume later.
 */
export async function POST(request: Request) {
  const { courseId } = await request.json();
  if (!courseId) {
    return NextResponse.json({ success: false, error: "courseId required" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true, courseId });
  response.cookies.set({
    name: "last_course",
    value: courseId,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
