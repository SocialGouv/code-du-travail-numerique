import create, { StoreApi } from "zustand";

import createContext from "zustand/context";
import {
  CommonInformationsStoreSlice,
  createCommonInformationsStore,
} from "../../../Informations/store";
import {
  CommonAgreementStoreSlice,
  createCommonAgreementStore,
} from "../../../Agreement/store";

export type MainStore = CommonInformationsStoreSlice &
  CommonAgreementStoreSlice;

const createRootSlice = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"],
  publicodesRules: string
) => ({
  ...createCommonInformationsStore(set, get, publicodesRules),
  ...createCommonAgreementStore(set, get, publicodesRules),
});

const createStore = (publicodesRules: any) =>
  create(
    (
      set: StoreApi<MainStore>["setState"],
      get: StoreApi<MainStore>["getState"]
    ) => createRootSlice(set, get, publicodesRules)
  );

const { Provider, useStore } = createContext<StoreApi<MainStore>>();

export {
  Provider as AgreementTestProvider,
  createStore as createAgreementTestStore,
  useStore as useAgreementTestStore,
};
