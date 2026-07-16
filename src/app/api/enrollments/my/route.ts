import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { readDb } from "@/lib/db";
import { courses } from "@/data/courses";

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

    const userId = payload.sub;
    const db = readDb();

    // Find and populate courses for matching enrollments
    const userEnrollments = db.enrollments
      .filter((e) => e.userId === userId)
      .map((e) => {
        const course = courses.find((c) => c.id === e.courseId);
        return {
          ...e,
          course: course || null
        };
      });

    return NextResponse.json(userEnrollments);
  } catch (error) {
    console.error("GET my enrollments error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred retrieving enrollments." },
      { status: 500 }
    );
  }
}
