import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { courses } from "@/data/courses";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Look up by numerical id or certificate code (case-insensitive) in Supabase
    let query = supabase.from("certificates").select("*");
    const numericalId = parseInt(id, 10);

    if (!isNaN(numericalId)) {
      query = query.or(`id.eq.${numericalId},certificate_number.ilike.${id}`);
    } else {
      query = query.ilike("certificate_number", id);
    }

    const { data: certificate, error: certError } = await query.maybeSingle();

    if (certError) {
      console.error("Supabase single certificate query error:", certError);
      return NextResponse.json(
        { message: "Failed to query certificate from database." },
        { status: 500 }
      );
    }

    if (!certificate) {
      return NextResponse.json(
        { message: `Certificate "${id}" not found.` },
        { status: 404 }
      );
    }

    // Find course details
    const course = courses.find((c) => c.id === certificate.course_id);

    // Lookup user name (masking details for public lookups) from Supabase
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("name")
      .eq("id", certificate.user_id)
      .maybeSingle();

    if (userError) {
      console.error("Supabase user fetch error for certificate:", userError);
    }

    const studentName = user ? user.name : "Registered Student";

    return NextResponse.json({
      id: certificate.id,
      certificateNumber: certificate.certificate_number,
      studentName,
      courseTitle: course ? course.title : "French Course",
      level: course ? course.level : "",
      issueDate: certificate.issue_date,
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
