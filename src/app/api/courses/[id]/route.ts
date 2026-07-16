import { NextResponse } from "next/server";
import { courses } from "@/data/courses";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = parseInt(id, 10);
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
      return NextResponse.json(
        { message: `Course with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("GET course by ID error:", error);
    return NextResponse.json(
      { message: "An error occurred retrieving the course." },
      { status: 500 }
    );
  }
}
