import React, { FC } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import SettingForm from "./components/setting-form";

interface SettingPageProps {
  params: { storeId: string };
}
const SettingPage: FC<SettingPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const store = await db.store.findFirst({
    where: {
      store_id: params.storeId,
      userId,
    },
  });

  if (!store) return redirect("/");

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
