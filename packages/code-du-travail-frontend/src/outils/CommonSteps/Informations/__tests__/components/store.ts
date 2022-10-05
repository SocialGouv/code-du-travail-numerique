import create, { GetState, SetState, StoreApi } from "zustand";

import createContext from "zustand/context";
import {
  CommonInformationsStoreSlice,
  createCommonInformationsStore,
} from "../../store";
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

const createStore = (publicodesRules: string) =>
  create((set: SetState<MainStore>, get: GetState<MainStore>) =>
    createRootSlice(set, get, publicodesRules)
  );

const { Provider, useStore } = createContext<StoreApi<MainStore>>();

export {
  Provider as InformationTestProvider,
  createStore as createInformationTestStore,
  useStore as useInformationTestStore,
};
