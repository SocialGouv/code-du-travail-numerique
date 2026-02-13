import { createStore as create, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { createContext } from "react";
import { createAgreementStore, AgreementStoreSlice } from "./Agreement/store";
import {
  createInformationsStore,
  InformationsStoreSlice,
} from "./Informations/store";
import {
  createRemunerationStore,
  RemunerationStoreSlice,
} from "./Remuneration/store";
import { createResultStore, ResultStoreSlice } from "./Result/store";

export type StoreSliceWrapperIndemnitePrecarite<
  T extends object,
  E extends object = T,
> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"]
) => T;

export type MainStore = AgreementStoreSlice &
  InformationsStoreSlice &
  RemunerationStoreSlice &
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
  ...createAgreementStore(set, get),
  ...createInformationsStore(set, get),
  ...createRemunerationStore(set, get),
  ...createResultStore(set, get),
});

const createStore = () =>
  create(
    (
      set: StoreApi<MainStore>["setState"],
      get: StoreApi<MainStore>["getState"]
    ) => createRootSlice(set, get)
  );

const IndemnitePrecariteContext = createContext<StoreApi<MainStore>>(
  {} as StoreApi<MainStore>
);

const { Provider } = IndemnitePrecariteContext;

const useIndemnitePrecariteStore = <T>(
  store: StoreApi<MainStore>,
  selector: (state: MainStore) => T
) => useStoreWithEqualityFn(store, selector, shallow);

export {
  Provider as IndemnitePrecariteProvider,
  createStore as createIndemnitePrecariteStore,
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
};
