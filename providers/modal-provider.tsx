"use client";
import { useEffect, useState } from "react";
import { StoreModal } from "@/components/modals/store-modal";

export function ModalProvider() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <StoreModal/>
  );
}
