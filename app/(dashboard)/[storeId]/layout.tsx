import { UserButton, auth } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Navbar from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  params: { storeId: string };
}
export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const store = await db.store.findFirst({
    where: {
      store_id: params.storeId,
      userId,
    },
  });
  if (!store) {
    return redirect("/");
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
