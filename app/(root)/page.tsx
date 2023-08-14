"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Home() {
  const storeModal = useStoreModal()
  useEffect(() => {
    if (!storeModal.isOpen) {
      storeModal.onOpen()
    }
  }, [storeModal])
  
  return (
    <div className='p-4'>
     <h3>Welcome to next.js with clerk</h3>
    </div>
  );
}
