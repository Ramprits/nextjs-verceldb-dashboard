"use client";
import React, { FC } from "react";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface SettingFormProps {
  initialData: Store;
}
const SettingForm: FC<SettingFormProps> = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage Store Preference' />
        <Button variant={"destructive"} size={"icon"} onClick={() => {}}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default SettingForm;
