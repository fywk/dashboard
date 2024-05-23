"use client";

import { useRef } from "react";

import AboutDialog from "@/app/components/AboutDialog";

import { AboutDialogContext } from "./AboutDialogContext";

export function AboutDialogProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const showDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <AboutDialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      <AboutDialog dialogRef={dialogRef} />
    </AboutDialogContext.Provider>
  );
}
