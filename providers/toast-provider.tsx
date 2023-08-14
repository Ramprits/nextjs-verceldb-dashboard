"use client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return <Toaster position='top-center' reverseOrder={false} />;
}
