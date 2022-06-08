import create, { SetState, GetState, StoreApi } from "zustand";
import {
  ContratTravailStoreSlice,
  createContratTravailStore,
} from "./contratTravailStore";
import createContext from "zustand/context";
import { AncienneteStoreSlice, createAncienneteStore } from "./ancienneteStore";
import { createSalairesStore, SalairesStoreSlice } from "./salairesStore";
import { createResultStore, ResultStoreSlice } from "./resultStore";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
  publicodesRules?: string
) => T;

export type MainStore = ContratTravailStoreSlice &
  AncienneteStoreSlice &
  SalairesStoreSlice &
  ResultStoreSlice;

const createRootSlice = (
  set: SetState<MainStore>,
  get: GetState<MainStore>,
  publicodesRules: string
) => ({
  ...createContratTravailStore(set, get),
  ...createAncienneteStore(set, get),
  ...createSalairesStore(set, get),
  ...createResultStore(set, get, publicodesRules),
});

const createStore = (publicodesRules: string) =>
  create((set: SetState<MainStore>, get: GetState<MainStore>) =>
    createRootSlice(set, get, publicodesRules)
  );

const { Provider, useStore } = createContext<StoreApi<MainStore>>();

export {
  Provider as IndemniteLicenciementProvider,
  createStore as createIndemniteLicenciementStore,
  useStore as useIndemniteLicenciementStore,
};
