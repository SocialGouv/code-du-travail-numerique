import { createStore as create, StoreApi, useStore } from "zustand";
import { createContext } from "react";
import {
  createOriginDepartStore,
  OriginDepartStoreSlice,
} from "./OriginStep/store";
import { AgreementStoreSlice } from "./Agreement/store";
import createAgreementStore from "./Agreement/store/store";
import {
  createInformationsStore,
  InformationsStoreSlice,
} from "./Informations/store";
import { createSeniorityStore, SeniorityStoreSlice } from "./Seniority/store";
import { createResultStore, ResultStoreSlice } from "./Result/store";

export type StoreSliceWrapperPreavisRetraite<
  T extends object,
  E extends object = T
> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"]
) => T;

export type MainStore = OriginDepartStoreSlice &
  AgreementStoreSlice &
  InformationsStoreSlice &
  SeniorityStoreSlice &
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
  ...createOriginDepartStore(set, get),
  ...createAgreementStore(set, get),
  ...createInformationsStore(set, get),
  ...createSeniorityStore(set, get),
  ...createResultStore(set, get),
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
