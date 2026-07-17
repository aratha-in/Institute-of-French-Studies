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

    // Query enrollments from Supabase
    const { data: enrollments, error: fetchError } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Supabase my enrollments fetch error:", fetchError);
      return NextResponse.json(
        { message: "Failed to retrieve enrollments from database." },
        { status: 500 }
      );
    }

    // Find and populate courses for matching enrollments and convert to camelCase
    const userEnrollments = enrollments.map((e) => {
      const course = courses.find((c) => c.id === e.course_id);
      return {
        id: e.id,
        userId: e.user_id,
        userEmail: e.user_email,
        courseId: e.course_id,
        enrolledAt: e.enrolled_at,
        status: e.status,
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
