"use client";

import { useEffect, useRef, useState } from "react";

import AboutDialog from "@/app/components/AboutDialog";

import { AboutDialogContext } from "./AboutDialogContext";

export function AboutDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const showDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.addEventListener("close", () => setIsOpen(false));
    }
  }, [dialogRef]);

  return (
    <AboutDialogContext.Provider value={{ isDialogOpen: isOpen, showDialog, closeDialog }}>
      {children}
      <AboutDialog dialogRef={dialogRef} />
    </AboutDialogContext.Provider>
  );
}
