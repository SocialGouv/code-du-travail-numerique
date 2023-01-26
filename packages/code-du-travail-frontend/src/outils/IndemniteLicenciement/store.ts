import create, { StoreApi } from "zustand";

import createContext from "zustand/context";
import {
  createIntroductionStore,
  IntroductionStoreSlice,
} from "./steps/Introduction/store";
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
import {
  CommonInformationsStoreError,
  CommonInformationsStoreInput,
  CommonInformationsStoreSlice,
  createCommonInformationsStore,
} from "../CommonSteps/Informations/store";

import { ToolName } from "../types";

export type MainStore = IntroductionStoreSlice &
  ContratTravailStoreSlice &
  AncienneteStoreSlice &
  SalairesStoreSlice &
  ResultStoreSlice &
  AgreementStoreSlice &
  CommonAgreementStoreSlice &
  CommonInformationsStoreSlice;

export type StepData<
  T extends
    | AncienneteStoreInput
    | SalairesStoreInput
    | ContratTravailStoreInput
    | ResultStoreInput
    | AgreementStoreInput
    | CommonAgreementStoreInput
    | CommonInformationsStoreInput,
  U extends
    | AncienneteStoreError
    | SalairesStoreError
    | ContratTravailStoreError
    | ResultStoreError
    | AgreementStoreError
    | CommonAgreementStoreError
    | CommonInformationsStoreError
> = {
  input: T;
  error: U;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type StoreOptions = {
  publicodesRules?: string;
  toolName: ToolName;
};

const createRootSlice = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"],
  { slug, toolName }
) => ({
  ...createIntroductionStore(set, get, { toolName }),
  ...createContratTravailStore(set, get, { toolName }),
  ...createAncienneteStore(set, get, { toolName }),
  ...createSalairesStore(set, get, { toolName }),
  ...createResultStore(set, get, { toolName }),
  ...createRootAgreementsStore(set, get, { toolName }),
  ...createCommonAgreementStore(set, get, { toolName, slug }),
  ...createCommonInformationsStore(set, get, { toolName }),
});

const createStore = (slug: string, toolName: ToolName) =>
  create(
    (
      set: StoreApi<MainStore>["setState"],
      get: StoreApi<MainStore>["getState"]
    ) => createRootSlice(set, get, { slug, toolName })
  );

const { Provider, useStore } = createContext<StoreApi<MainStore>>();

export {
  Provider as IndemniteLicenciementProvider,
  createStore as createIndemniteLicenciementStore,
  useStore as useIndemniteLicenciementStore,
};
