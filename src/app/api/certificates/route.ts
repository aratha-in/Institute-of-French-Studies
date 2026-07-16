import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { readDb, writeDb, Certificate } from "@/lib/db";
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
    const enrollmentId = parseInt(body.enrollmentId, 10);
    const grade = body.grade || "A";

    if (isNaN(enrollmentId)) {
      return NextResponse.json(
        { message: "Invalid Enrollment ID." },
        { status: 400 }
      );
    }

    const db = readDb();
    const userId = payload.sub;

    // Find the enrollment
    const enrollmentIndex = db.enrollments.findIndex(
      (e) => e.id === enrollmentId && e.userId === userId
    );

    if (enrollmentIndex === -1) {
      return NextResponse.json(
        { message: "Enrollment not found or unauthorized access." },
        { status: 404 }
      );
    }

    const enrollment = db.enrollments[enrollmentIndex];

    // Check if certificate already exists for this enrollment
    const existingCert = db.certificates.find((c) => c.enrollmentId === enrollmentId);
    if (existingCert) {
      return NextResponse.json(
        { message: "A certificate has already been issued for this enrollment." },
        { status: 400 }
      );
    }

    // Update enrollment status to Completed
    enrollment.status = "Completed";
    db.enrollments[enrollmentIndex] = enrollment;

    // Generate certificate details
    const nextId = db.certificates.length > 0
      ? Math.max(...db.certificates.map((c) => c.id)) + 1
      : 1;

    const certYear = new Date().getFullYear();
    const certRand = Math.floor(1000 + Math.random() * 9000);
    const certificateNumber = `IFS-${certYear}-${certRand}`;

    const newCertificate: Certificate = {
      id: nextId,
      enrollmentId,
      userId,
      courseId: enrollment.courseId,
      issueDate: new Date().toISOString(),
      grade,
      certificateNumber,
      status: "Active"
    };

    db.certificates.push(newCertificate);
    writeDb(db);

    // Populate course details in response
    newCertificate.course = courses.find((c) => c.id === enrollment.courseId);

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    console.error("POST issue certificate API error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during certificate issuance." },
      { status: 500 }
    );
  }
}
