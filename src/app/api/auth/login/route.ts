import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
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

    // Read DB to ensure user is stored
    const db = readDb();
    let user = db.users.find((u) => u.id === userId);

    if (!user) {
      user = { id: userId, email, name };
      db.users.push(user);
      writeDb(db);
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
