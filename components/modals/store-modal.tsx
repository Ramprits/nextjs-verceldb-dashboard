"use client";
import React, { useState } from "react";
import axios from "axios";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export function StoreModal() {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await axios.post<{ store_id: string }>(
        "/api/store",
        values
      );
      toast.success("Store created");
      window.location.assign(`/${response?.data?.store_id}`);
    } catch (error) {
      console.log("[Create store error]", error);
      toast.error("Somethings went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Please enter store name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center gap-2 justify-end'>
            <Button
              type='button'
              variant={"destructive"}
              onClick={storeModal.onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
