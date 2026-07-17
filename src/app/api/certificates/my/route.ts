import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { supabase } from "@/lib/supabase";
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

    // Query certificates from Supabase
    const { data: certificates, error: fetchError } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Supabase my certificates fetch error:", fetchError);
      return NextResponse.json(
        { message: "Failed to retrieve certificates from database." },
        { status: 500 }
      );
    }

    // Map and populate course details for matching certificates and convert to camelCase
    const userCertificates = certificates.map((c) => {
      const course = courses.find((courseItem) => courseItem.id === c.course_id);
      return {
        id: c.id,
        enrollmentId: c.enrollment_id,
        userId: c.user_id,
        courseId: c.course_id,
        issueDate: c.issue_date,
        grade: c.grade,
        certificateNumber: c.certificate_number,
        status: c.status,
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
