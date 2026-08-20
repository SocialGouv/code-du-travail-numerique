import { createStore as create, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { createContext } from "react";
import { createAgreementStore, AgreementStoreSlice } from "./Agreement/store";
import {
  createTypeContratStore,
  TypeContratStoreSlice,
} from "./TypeContrat/store";
import {
  createTermeContratStore,
  TermeContratStoreSlice,
} from "./TermeContrat/store";
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
  TypeContratStoreSlice &
  TermeContratStoreSlice &
  RemunerationStoreSlice &
  ResultStoreSlice;

const createRootSlice = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"]
) => ({
  ...createAgreementStore(set, get),
  ...createTypeContratStore(set, get),
  ...createTermeContratStore(set, get),
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
