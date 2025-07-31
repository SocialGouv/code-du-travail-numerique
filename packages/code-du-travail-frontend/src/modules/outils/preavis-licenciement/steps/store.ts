import { createStore as create, StoreApi, useStore } from "zustand";
import { createContext } from "react";
import { createStatusStore, StatusStoreSlice } from "./Status/store";
import { createAgreementStore, AgreementStoreSlice } from "./Agreement/store";
import { createResultStore, ResultStoreSlice } from "./Result/store";
import {
  createInformationsStore,
  InformationsStoreSlice,
} from "./Informations/store";

export type StoreSliceWrapperPreavisLicenciement<
  T extends object,
  E extends object = T,
> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"]
) => T;

export type MainStore = StatusStoreSlice &
  AgreementStoreSlice &
  InformationsStoreSlice &
  ResultStoreSlice;

export type StepData<T, U> = {
  input: T;
  error: U;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

const createRootSlice = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"]
) => ({
  ...createStatusStore(set, get),
  ...createAgreementStore(set, get),
  ...createInformationsStore(set, get),
  ...createResultStore(set, get),
});

const createStore = () =>
  create(
    (
      set: StoreApi<MainStore>["setState"],
      get: StoreApi<MainStore>["getState"]
    ) => createRootSlice(set, get)
  );

const PreavisLicenciementContext = createContext<StoreApi<MainStore>>(
  {} as StoreApi<MainStore>
);

const { Provider } = PreavisLicenciementContext;

export {
  Provider as PreavisLicenciementProvider,
  createStore as createPreavisLicenciementStore,
  PreavisLicenciementContext,
  useStore as usePreavisLicenciementStore,
};
