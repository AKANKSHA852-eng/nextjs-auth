// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Signup successful" },
      { status: 201 }
    );

  } catch (error: any) {
    // 👇 YAHI SABSE IMPORTANT HAI
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    console.error("SIGNUP ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}