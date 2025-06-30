import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, username, email, mobileNumber, password } =
      validationResult.data;

    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() },
          { mobileNumber },
        ],
      },
      select: {
        email: true,
        username: true,
        mobileNumber: true,
      },
    });

    if (existingUser) {
      const conflicts: string[] = [];
      if (existingUser.email === email.toLowerCase()) conflicts.push("email");
      if (existingUser.username === username.toLowerCase())
        conflicts.push("username");
      if (existingUser.mobileNumber === mobileNumber)
        conflicts.push("mobile number");

      return NextResponse.json(
        {
          error: "User already exists",
          conflicts: conflicts.join(", "),
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        username: username.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        mobileNumber: mobileNumber.trim(),
        passwordHash,
        role: "user",
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        uid: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "User with this information already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
