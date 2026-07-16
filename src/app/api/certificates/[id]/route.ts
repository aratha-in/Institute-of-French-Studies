import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";
import { courses } from "@/data/courses";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = readDb();

    // Look up by numerical id or certificate code (case-insensitive)
    const certificate = db.certificates.find(
      (c) => c.id.toString() === id || c.certificateNumber.toLowerCase() === id.toLowerCase()
    );

    if (!certificate) {
      return NextResponse.json(
        { message: `Certificate "${id}" not found.` },
        { status: 404 }
      );
    }

    // Find course details
    const course = courses.find((c) => c.id === certificate.courseId);
    certificate.course = course || undefined;

    // Lookup user name (masking details for public lookups)
    const user = db.users.find((u) => u.id === certificate.userId);
    const studentName = user ? user.name : "Registered Student";

    return NextResponse.json({
      id: certificate.id,
      certificateNumber: certificate.certificateNumber,
      studentName,
      courseTitle: course ? course.title : "French Course",
      level: course ? course.level : "",
      issueDate: certificate.issueDate,
      grade: certificate.grade,
      status: certificate.status
    });
  } catch (error) {
    console.error("GET public certificate error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred retrieving certificate details." },
      { status: 500 }
    );
  }
}
