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

    // Check if already enrolled in an Active status in Supabase
    const { data: alreadyEnrolled, error: checkError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .eq("status", "Active")
      .maybeSingle();

    if (checkError) {
      console.error("Supabase enrollment check error:", checkError);
      return NextResponse.json(
        { message: "Failed to check enrollment status." },
        { status: 500 }
      );
    }

    if (alreadyEnrolled) {
      return NextResponse.json(
        { message: "You are already active in this course." },
        { status: 400 }
      );
    }

    // Insert new enrollment in Supabase
    const { data: newEnrollment, error: insertError } = await supabase
      .from("enrollments")
      .insert({
        user_id: userId,
        user_email: email,
        course_id: courseId,
        status: "Active"
      })
      .select("*")
      .single();

    if (insertError) {
      console.error("Supabase insert enrollment error:", insertError);
      return NextResponse.json(
        { message: "Failed to submit enrollment to database." },
        { status: 500 }
      );
    }

    // Populate course details and convert to camelCase for frontend compatibility
    const formattedEnrollment = {
      id: newEnrollment.id,
      userId: newEnrollment.user_id,
      userEmail: newEnrollment.user_email,
      courseId: newEnrollment.course_id,
      enrolledAt: newEnrollment.enrolled_at,
      status: newEnrollment.status,
      course
    };

    return NextResponse.json(formattedEnrollment, { status: 201 });
  } catch (error) {
    console.error("POST enroll API error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during enrollment." },
      { status: 500 }
    );
  }
}
