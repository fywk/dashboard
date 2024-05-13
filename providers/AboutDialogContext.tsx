import { createContext } from "react";

type AboutDialogContextType = {
  showDialog: () => void;
  closeDialog: () => void;
};

export const AboutDialogContext = createContext<AboutDialogContextType | undefined>(undefined);
