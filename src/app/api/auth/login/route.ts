import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { signJwt } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const userId = email.replace("@", "_").replace(/\./g, "_");
    const name = email.split("@")[0];

    // Query user in Supabase
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Supabase fetch user error:", fetchError);
      return NextResponse.json(
        { message: "Database query failed." },
        { status: 500 }
      );
    }

    if (!user) {
      const { error: insertError } = await supabase
        .from("users")
        .insert({ id: userId, email, name });
      
      if (insertError) {
        console.error("Supabase insert user error:", insertError);
        return NextResponse.json(
          { message: "Failed to create user in database." },
          { status: 500 }
        );
      }
    }

    // Generate JWT
    const token = signJwt({
      sub: userId,
      email: email,
      name: name
    });

    return NextResponse.json({
      token,
      user: {
        id: userId,
        email,
        name
      }
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
