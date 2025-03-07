"use client";

import { useContext } from "react";

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

  return (
    <button type="button" id="about-dialog-opener" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
