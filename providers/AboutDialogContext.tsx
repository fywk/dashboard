import { createContext } from "react";

type AboutDialogContextType = {
  isDialogOpen: boolean;
  showDialog: () => void;
  closeDialog: () => void;
};

export const AboutDialogContext = createContext<AboutDialogContextType | undefined>(undefined);
