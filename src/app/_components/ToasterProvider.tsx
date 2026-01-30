"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      containerStyle={{ top: 100 }}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}
