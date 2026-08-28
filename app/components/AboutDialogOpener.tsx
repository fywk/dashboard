"use client";

import { useContext, useEffect } from "react";

import { AboutDialogContext } from "@/providers/AboutDialogContext";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function AboutDialogOpener({ children, ...props }: Props) {
  const dialogContext = useContext(AboutDialogContext);

  const handleClick = () => {
    if (!dialogContext) return;

    dialogContext.showDialog();
  };

  useEffect(() => {
    if (!dialogContext) return;

    const isOpen = dialogContext.isDialogOpen;

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "i") {
        if (isOpen) {
          dialogContext.closeDialog();
        } else {
          dialogContext.showDialog();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dialogContext]);

  return (
    <button type="button" id="about-dialog-opener" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
