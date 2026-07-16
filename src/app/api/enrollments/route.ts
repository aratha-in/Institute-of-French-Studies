import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { readDb, writeDb, Enrollment } from "@/lib/db";
import { courses } from "@/data/courses";

export async function POST(request: Request) {
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

    const body = await request.json();
    const courseId = parseInt(body.courseId, 10);

    if (isNaN(courseId)) {
      return NextResponse.json(
        { message: "Invalid Course ID." },
        { status: 400 }
      );
    }

    // Verify course exists
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return NextResponse.json(
        { message: `Course with ID ${courseId} does not exist.` },
        { status: 400 }
      );
    }

    const userId = payload.sub;
    const email = payload.email || "unknown@domain.com";

    const db = readDb();

    // Check if already enrolled in an Active status
    const alreadyEnrolled = db.enrollments.some(
      (e) => e.userId === userId && e.courseId === courseId && e.status === "Active"
    );

    if (alreadyEnrolled) {
      return NextResponse.json(
        { message: "You are already active in this course." },
        { status: 400 }
      );
    }

    // Generate enrollment ID
    const nextId = db.enrollments.length > 0
      ? Math.max(...db.enrollments.map((e) => e.id)) + 1
      : 1;

    const newEnrollment: Enrollment = {
      id: nextId,
      userId,
      userEmail: email,
      courseId,
      enrolledAt: new Date().toISOString(),
      status: "Active"
    };

    db.enrollments.push(newEnrollment);
    writeDb(db);

    // Populate course details in response
    newEnrollment.course = course;

    return NextResponse.json(newEnrollment, { status: 201 });
  } catch (error) {
    console.error("POST enroll API error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during enrollment." },
      { status: 500 }
    );
  }
}
