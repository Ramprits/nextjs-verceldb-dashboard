import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

interface SetupLayoutProps {
  children: ReactNode;
}
export default async function SetupLayout({ children }: SetupLayoutProps) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) {
    return redirect(`/${store.store_id}`);
  }
  return <div>{children}</div>;
}
