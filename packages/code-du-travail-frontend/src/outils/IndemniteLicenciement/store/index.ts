import create, { SetState, GetState, StoreApi } from "zustand";
import {
  ContratTravailStoreSlice,
  createContratTravailStore,
} from "./contratTravailStore";
import createContext from "zustand/context";
import { AncienneteStoreSlice, createAncienneteStore } from "./ancienneteStore";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

type MainStore = ContratTravailStoreSlice & AncienneteStoreSlice;

const createRootSlice = (
  set: SetState<MainStore>,
  get: GetState<MainStore>
) => ({
  ...createContratTravailStore(set, get),
  ...createAncienneteStore(set, get),
});

const createStore = (rules: string) => create(createRootSlice);

const { Provider, useStore } = createContext<StoreApi<MainStore>>();

export {
  Provider as IndemniteLicenciementProvider,
  createStore as createIndemniteLicenciementStore,
  useStore as useIndemniteLicenciementStore,
};
