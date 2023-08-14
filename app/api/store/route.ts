import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();

  const body = await req.json();
  const { name } = body;

  if (!userId) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  if (!name) {
    return new NextResponse("name is required", { status: 400 });
  }

  const createdStore = await db.store.create({
    data: {
      name,
      userId,
    },
  });
  return NextResponse.json({ store: createdStore });
  try {
  } catch (error) {
    return new NextResponse("somethings went wrong", { status: 500 });
  }
}
