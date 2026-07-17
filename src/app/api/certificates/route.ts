import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { supabase } from "@/lib/supabase";
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

    const userId = payload.sub;

    // Find the enrollment in Supabase
    const { data: enrollment, error: enrollError } = await supabase
      .from("enrollments")
      .select("*")
      .eq("id", enrollmentId)
      .eq("user_id", userId)
      .maybeSingle();

    if (enrollError) {
      console.error("Supabase enrollment fetch error:", enrollError);
      return NextResponse.json(
        { message: "Failed to retrieve enrollment status." },
        { status: 500 }
      );
    }

    if (!enrollment) {
      return NextResponse.json(
        { message: "Enrollment not found or unauthorized access." },
        { status: 404 }
      );
    }

    // Check if certificate already exists for this enrollment
    const { data: existingCert, error: certCheckError } = await supabase
      .from("certificates")
      .select("id")
      .eq("enrollment_id", enrollmentId)
      .maybeSingle();

    if (certCheckError) {
      console.error("Supabase certificate check error:", certCheckError);
      return NextResponse.json(
        { message: "Failed to verify certificate existence." },
        { status: 500 }
      );
    }

    if (existingCert) {
      return NextResponse.json(
        { message: "A certificate has already been issued for this enrollment." },
        { status: 400 }
      );
    }

    // Update enrollment status to Completed
    const { error: updateError } = await supabase
      .from("enrollments")
      .update({ status: "Completed" })
      .eq("id", enrollmentId);

    if (updateError) {
      console.error("Supabase enrollment update error:", updateError);
      return NextResponse.json(
        { message: "Failed to update enrollment status." },
        { status: 500 }
      );
    }

    // Generate certificate details
    const certYear = new Date().getFullYear();
    const certRand = Math.floor(1000 + Math.random() * 9000);
    const certificateNumber = `IFS-${certYear}-${certRand}`;

    const { data: newCertificate, error: insertError } = await supabase
      .from("certificates")
      .insert({
        enrollment_id: enrollmentId,
        user_id: userId,
        course_id: enrollment.course_id,
        grade,
        certificate_number: certificateNumber,
        status: "Active"
      })
      .select("*")
      .single();

    if (insertError) {
      console.error("Supabase insert certificate error:", insertError);
      return NextResponse.json(
        { message: "Failed to issue certificate in database." },
        { status: 500 }
      );
    }

    // Populate course details in response and format fields to camelCase
    const course = courses.find((c) => c.id === enrollment.course_id);
    const formattedCertificate = {
      id: newCertificate.id,
      enrollmentId: newCertificate.enrollment_id,
      userId: newCertificate.user_id,
      courseId: newCertificate.course_id,
      issueDate: newCertificate.issue_date,
      grade: newCertificate.grade,
      certificateNumber: newCertificate.certificate_number,
      status: newCertificate.status,
      course: course || null
    };

    return NextResponse.json(formattedCertificate, { status: 201 });
  } catch (error) {
    console.error("POST issue certificate API error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during certificate issuance." },
      { status: 500 }
    );
  }
}
