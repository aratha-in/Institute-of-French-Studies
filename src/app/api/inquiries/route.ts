import { NextResponse } from "next/server";
import { readDb, writeDb, Inquiry } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please complete all fields in the form." },
        { status: 400 }
      );
    }

    const db = readDb();

    // Generate next inquiry ID
    const nextId = db.inquiries.length > 0
      ? Math.max(...db.inquiries.map((i) => i.id)) + 1
      : 1;

    const newInquiry: Inquiry = {
      id: nextId,
      name,
      email,
      message,
      submittedAt: new Date().toISOString()
    };

    db.inquiries.push(newInquiry);
    writeDb(db);

    return NextResponse.json(
      { message: "Inquiry submitted successfully", id: nextId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST inquiries API error:", error);
    return NextResponse.json(
      { message: "Could not submit inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
