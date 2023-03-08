import { createContext } from "react";
import { StoreApi, useStore } from "zustand";
import { PreavisRetraiteStore } from "./types";

const PreavisRetraiteContext = createContext<StoreApi<PreavisRetraiteStore>>(
  {} as StoreApi<PreavisRetraiteStore>
);

const { Provider } = PreavisRetraiteContext;

export {
  Provider as PreavisRetraiteProvider,
  PreavisRetraiteContext,
  useStore as usePreavisRetraiteStore,
};
