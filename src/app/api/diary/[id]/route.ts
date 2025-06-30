import { prisma } from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for updating diary
const updateDiarySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title too long")
    .optional(),
  content: z.string().min(1, "Content is required").optional(),
  coverImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  location: z.string().optional(),
  weatherAtTime: z.any().optional(),
  isPublic: z.boolean().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const diary = await prisma.diary.findUnique({
      where: { id: params.id },
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

    if (!diary) {
      return NextResponse.json({ error: "Diary not found" }, { status: 404 });
    }

    return NextResponse.json(diary);
  } catch (error) {
    console.error("Error fetching diary:", error);
    return NextResponse.json(
      { error: "Failed to fetch diary" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = updateDiarySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    // Check if diary exists
    const existingDiary = await prisma.diary.findUnique({
      where: { id: params.id },
      select: { id: true, authorId: true },
    });

    if (!existingDiary) {
      return NextResponse.json({ error: "Diary not found" }, { status: 404 });
    }

    // Update diary
    const updated = await prisma.diary.update({
      where: { id: params.id },
      data: validationResult.data,
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

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating diary:", error);
    return NextResponse.json(
      { error: "Failed to update diary" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if diary exists
    const existingDiary = await prisma.diary.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!existingDiary) {
      return NextResponse.json({ error: "Diary not found" }, { status: 404 });
    }

    await prisma.diary.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Diary deleted successfully" });
  } catch (error) {
    console.error("Error deleting diary:", error);
    return NextResponse.json(
      { error: "Failed to delete diary" },
      { status: 500 }
    );
  }
}
