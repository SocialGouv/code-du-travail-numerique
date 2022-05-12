import createContext from "zustand/context";
import { StoreApi } from "zustand";
import { PreavisRetraiteStore } from "./types";

const { Provider, useStore } = createContext<StoreApi<PreavisRetraiteStore>>();

export {
  Provider as PreavisRetraiteProvider,
  useStore as usePreavisRetraiteStore,
};
