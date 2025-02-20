import { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../context/GlobalContext";


export function useContexts(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useContexts must be used within a GlobalProvider");
  }
  return context;
}
