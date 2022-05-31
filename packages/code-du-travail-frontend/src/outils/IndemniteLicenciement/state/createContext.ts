import createContext from "zustand/context";
import { StoreApi } from "zustand";
import { IndemniteLicenciementStore } from "./types";

const { Provider, useStore } =
  createContext<StoreApi<IndemniteLicenciementStore>>();

export {
  Provider as IndemniteLicenciementProvider,
  useStore as useIndemniteLicenciementStore,
};
