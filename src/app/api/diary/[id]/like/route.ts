import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { z } from "zod";

// Validation schema for like request
const likeSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = likeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { userId } = validationResult.data;

    // Check if diary exists
    const diary = await prisma.diary.findUnique({
      where: { id: params.id },
      select: { id: true, likes: true },
    });

    if (!diary) {
      return NextResponse.json({ error: "Diary not found" }, { status: 404 });
    }

    // Check if user already liked the diary
    const existingLike = await prisma.diaryLike.findUnique({
      where: {
        userId_diaryId: {
          userId,
          diaryId: params.id,
        },
      },
    });

    if (existingLike) {
      // Unlike: remove the like
      await prisma.diaryLike.delete({
        where: {
          userId_diaryId: {
            userId,
            diaryId: params.id,
          },
        },
      });

      // Update diary like count
      await prisma.diary.update({
        where: { id: params.id },
        data: { likes: { decrement: 1 } },
      });

      return NextResponse.json({ liked: false, message: "Diary unliked" });
    } else {
      // Like: add the like
      await prisma.diaryLike.create({
        data: {
          userId,
          diaryId: params.id,
        },
      });

      // Update diary like count
      await prisma.diary.update({
        where: { id: params.id },
        data: { likes: { increment: 1 } },
      });

      return NextResponse.json({ liked: true, message: "Diary liked" });
    }
  } catch (error: any) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
