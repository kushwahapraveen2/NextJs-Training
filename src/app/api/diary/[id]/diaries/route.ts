// app/api/user/[id]/diaries/route.ts
import { prisma } from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  const diaries = await prisma.diary.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(diaries);
}
