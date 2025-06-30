import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Validation schema for creating diary
const createDiarySchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
  coverImage: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      // Limit base64 image size to 5MB
      if (val.startsWith("data:image/")) {
        const base64Length = val.length - val.indexOf(",") - 1;
        const sizeInBytes = Math.ceil((base64Length * 3) / 4);
        return sizeInBytes <= 5 * 1024 * 1024; // 5MB limit
      }
      return true;
    }, "Image size must be less than 5MB"),
  images: z.array(z.string()).optional(),
  location: z.string().optional(),
  weatherAtTime: z.any().optional(),
  isPublic: z.boolean().default(false),
  authorId: z.string().uuid("Invalid author ID"),
});

// Validation schema for getting diaries
const getDiariesSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate user ID
    const validationResult = getDiariesSchema.safeParse({ userId });
    if (!validationResult.success) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, isActive: true },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "User not found or inactive" },
        { status: 404 }
      );
    }

    // Get diaries with pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [diaries, total] = await Promise.all([
      prisma.diary.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          coverImage: true,
          images: true,
          location: true,
          weatherAtTime: true,
          isPublic: true,
          likes: true,
          authorId: true,
          createdAt: true,
        },
      }),
      prisma.diary.count({
        where: { authorId: userId },
      }),
    ]);

    return NextResponse.json({
      diaries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching diaries:", error);
    return NextResponse.json(
      { error: "Failed to fetch diaries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = createDiarySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const {
      title,
      content,
      coverImage,
      images = [],
      location,
      weatherAtTime,
      isPublic = false,
      authorId,
    } = validationResult.data;

    // Verify author exists
    const author = await prisma.user.findUnique({
      where: { id: authorId },
      select: { id: true, isActive: true },
    });

    if (!author || !author.isActive) {
      return NextResponse.json({ error: "Invalid author" }, { status: 400 });
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists
    const existingDiary = await prisma.diary.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existingDiary) {
      return NextResponse.json(
        { error: "A diary with this title already exists" },
        { status: 409 }
      );
    }

    // Create diary
    const diary = await prisma.diary.create({
      data: {
        id: uuidv4(),
        title: title.trim(),
        slug,
        content: content.trim(),
        coverImage: coverImage?.trim() || "",
        images,
        location: location?.trim() || "",
        weatherAtTime,
        isPublic,
        authorId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        coverImage: true,
        images: true,
        location: true,
        weatherAtTime: true,
        isPublic: true,
        likes: true,
        authorId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(diary, { status: 201 });
  } catch (error: any) {
    console.error("Error creating diary:", error);

    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A diary with this title already exists" },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create diary" },
      { status: 500 }
    );
  }
}
