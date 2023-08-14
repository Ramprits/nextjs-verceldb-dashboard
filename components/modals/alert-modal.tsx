"use client";
import React, { FC, useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  if (!client) {
    return null;
  }
  return (
    <Modal
      title='Are you sure?'
      description='This action cannont be undone'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='pt-6 space-x-2 items-center w-full justify-end'>
        <Button
          size={"sm"}
          onClick={onClose}
          disabled={loading}
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={onConfirm}
          disabled={loading}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
