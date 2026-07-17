import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please complete all fields in the form." },
        { status: 400 }
      );
    }

    // Insert inquiry into Supabase (let Supabase handle ID generation)
    const { data: newInquiry, error } = await supabase
      .from("inquiries")
      .insert({
        name,
        email,
        message
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert inquiry error:", error);
      return NextResponse.json(
        { message: "Could not submit inquiry. Database write failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Inquiry submitted successfully", id: newInquiry.id },
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
