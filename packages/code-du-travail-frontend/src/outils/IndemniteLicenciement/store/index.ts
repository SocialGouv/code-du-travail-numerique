import create, { SetState, GetState, StoreApi } from "zustand";

import createContext from "zustand/context";
import {
  AncienneteStoreSlice,
  AncienneteStoreInput,
  AncienneteStoreError,
  createAncienneteStore,
} from "./anciennete";
import {
  ContratTravailStoreSlice,
  ContratTravailStoreInput,
  ContratTravailStoreError,
  createContratTravailStore,
} from "./contratTravail";
import {
  ResultStoreSlice,
  createResultStore,
  ResultStoreError,
  ResultStoreInput,
} from "./result";
import {
  SalairesStoreSlice,
  SalairesStoreInput,
  SalairesStoreError,
  createSalairesStore,
} from "./salaires";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
  publicodesRules?: string
) => T;

export type MainStore = ContratTravailStoreSlice &
  AncienneteStoreSlice &
  SalairesStoreSlice &
  ResultStoreSlice;

export type StepData<
  T extends
    | AncienneteStoreInput
    | SalairesStoreInput
    | ContratTravailStoreInput
    | ResultStoreInput,
  U extends
    | AncienneteStoreError
    | SalairesStoreError
    | ContratTravailStoreError
    | ResultStoreError
> = {
  input: T;
  error: U;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

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
