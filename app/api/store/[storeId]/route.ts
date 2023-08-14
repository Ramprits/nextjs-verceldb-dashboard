import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Handles a PATCH request to update a store's name in the database.
 *
 * @param req The request object.
 * @param params The parameters object containing the storeId.
 * @returns A JSON response containing the updated store data.
 * @throws If the user is not authenticated, the name is missing, or an error occurs during the update.
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const updatedStore = await db.store.updateMany({
      where: {
        store_id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ store: updatedStore });
  } catch (error) {
    return new NextResponse("something went wrong", { status: 500 });
  }
}
/**
 * Deletes a store from the database.
 *
 * @param req - The request object.
 * @param params - An object containing the storeId of the store to be deleted.
 * @returns A JSON response with the deleted store.
 * @throws If the user is not authorized or if an error occurs during the deletion process.
 */
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const deletedStore = await db.store.deleteMany({
      where: {
        store_id: params.storeId,
        userId,
      },
    });

    return NextResponse.json({ store: deletedStore });
  } catch (error) {
    return new NextResponse("something went wrong", { status: 500 });
  }
}
