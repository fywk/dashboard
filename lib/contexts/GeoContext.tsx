import { createContext, useContext } from "react";

type GeoContextType = {
  city: string;
  country: string;
};

export const GeoContext = createContext<GeoContextType>({
  city: "",
  country: "",
});

export const useGeoContext = () => useContext(GeoContext);
