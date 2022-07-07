import create, { SetState, GetState, StoreApi } from "zustand";

import createContext from "zustand/context";
import {
  AgreementStoreError,
  AgreementStoreInput,
  AgreementStoreSlice,
  createRootAgreementsStore,
} from "./agreements";
import {
  AncienneteStoreSlice,
  AncienneteStoreInput,
  AncienneteStoreError,
  createAncienneteStore,
} from "./steps/Anciennete/store";
import {
  ContratTravailStoreSlice,
  ContratTravailStoreInput,
  ContratTravailStoreError,
  createContratTravailStore,
} from "./steps/ContratTravail/store";
import {
  ResultStoreSlice,
  createResultStore,
  ResultStoreError,
  ResultStoreInput,
} from "./steps/Resultat/store";
import {
  SalairesStoreSlice,
  SalairesStoreInput,
  SalairesStoreError,
  createSalairesStore,
} from "./steps/Salaires/store";
import {
  CommonAgreementStoreError,
  CommonAgreementStoreInput,
  CommonAgreementStoreSlice,
  createCommonAgreementStore,
} from "../CommonSteps/Agreement/store";

export type MainStore = ContratTravailStoreSlice &
  AncienneteStoreSlice &
  SalairesStoreSlice &
  ResultStoreSlice &
  AgreementStoreSlice &
  CommonAgreementStoreSlice;

export type StepData<
  T extends
    | AncienneteStoreInput
    | SalairesStoreInput
    | ContratTravailStoreInput
    | ResultStoreInput
    | AgreementStoreInput
    | CommonAgreementStoreInput,
  U extends
    | AncienneteStoreError
    | SalairesStoreError
    | ContratTravailStoreError
    | ResultStoreError
    | AgreementStoreError
    | CommonAgreementStoreError
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
  ...createRootAgreementsStore(set, get),
  ...createCommonAgreementStore(set, get),
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
