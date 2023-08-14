"use client";
import * as z from "zod";
import axios from "axios";
import React, { FC, useState } from "react";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { redirect, useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface SettingFormProps {
  initialData: Store;
}

const SettingForm: FC<SettingFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/store/${params.storeId}`, values);
        router.refresh();
        toast.success("Store updated successfully");
      } else {
        const response = await axios.post<{ store_id: string }>(
          `/api/store`,
          values
        );
        toast.success("Store created successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  }

  const handleOnDelete = async () => {
    try {
      if (params.storeId) {
        await axios.delete(`/api/store/${params.storeId}`);
      }
      setIsOpen(false);
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Make sure you delete all products and categories first.");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => {
          setLoading(false);
        }}
        onConfirm={handleOnDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage Store Preference' />
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => setIsOpen(true)}
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full md:w-1/5'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='store name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default SettingForm;
