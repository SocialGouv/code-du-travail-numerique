import { createStore as create, StoreApi, useStore } from "zustand";
import { createContext } from "react";
import {
  createOriginDepartStore,
  OriginDepartStoreError,
  OriginDepartStoreInput,
  OriginDepartStoreSlice,
} from "./OriginStep/store";

export type StoreSliceWrapperPreavisRetraite<
  T extends object,
  E extends object = T
> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"]
) => T;

export type MainStore = OriginDepartStoreSlice;

export type StepData<
  T extends OriginDepartStoreInput,
  U extends OriginDepartStoreError
> = {
  input: T;
  error: U;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

const createRootSlice = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"]
) => ({
  ...createOriginDepartStore(set, get),
});

const createStore = () =>
  create(
    (
      set: StoreApi<MainStore>["setState"],
      get: StoreApi<MainStore>["getState"]
    ) => createRootSlice(set, get)
  );

const PreavisRetraiteContext = createContext<StoreApi<MainStore>>(
  {} as StoreApi<MainStore>
);

const { Provider } = PreavisRetraiteContext;

export {
  Provider as PreavisRetraiteProvider,
  createStore as createPreavisRetraiteStore,
  PreavisRetraiteContext,
  useStore as usePreavisRetraiteStore,
};
