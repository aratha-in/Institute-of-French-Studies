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

    // Map and populate course details for matching certificates
    const userCertificates = db.certificates
      .filter((c) => c.userId === userId)
      .map((c) => {
        const course = courses.find((courseItem) => courseItem.id === c.courseId);
        return {
          ...c,
          course: course || null
        };
      });

    return NextResponse.json(userCertificates);
  } catch (error) {
    console.error("GET my certificates error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred retrieving certificates." },
      { status: 500 }
    );
  }
}
