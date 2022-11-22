import create, { GetState, SetState, StoreApi } from "zustand";

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
  set: SetState<MainStore>,
  get: GetState<MainStore>,
  publicodesRules: string
) => ({
  ...createCommonInformationsStore(set, get, publicodesRules),
  ...createCommonAgreementStore(set, get, publicodesRules),
});

const createStore = (publicodesRules: any) =>
  create((set: SetState<MainStore>, get: GetState<MainStore>) =>
    createRootSlice(set, get, publicodesRules)
  );

const { Provider, useStore } = createContext<StoreApi<MainStore>>();

export {
  Provider as AgreementTestProvider,
  createStore as createAgreementTestStore,
  useStore as useAgreementTestStore,
};
