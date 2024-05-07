import { createStore as create, StoreApi, useStore } from "zustand";
import {
  AgreementStoreError,
  AgreementStoreInput,
  AgreementStoreSlice,
  createRootAgreementsStore,
} from "./agreements";
import {
  AncienneteStoreError,
  AncienneteStoreInput,
  AncienneteStoreSlice,
  createAncienneteStore,
} from "./steps/Anciennete/store";
import {
  ContratTravailStoreError,
  ContratTravailStoreInput,
  ContratTravailStoreSlice,
  createContratTravailStore,
} from "./steps/ContratTravail/store";
import {
  createResultStore,
  ResultStoreError,
  ResultStoreInput,
  ResultStoreSlice,
} from "./steps/Resultat/store";
import {
  createSalairesStore,
  SalairesStoreError,
  SalairesStoreInput,
  SalairesStoreSlice,
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

import {
  CommonSituationStoreSlice,
  createCommonSituationStore,
} from "../common/situationStore";

import { IndemniteDepartType } from "../types";
import { createContext } from "react";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

export type MainStore = ContratTravailStoreSlice &
  AncienneteStoreSlice &
  SalairesStoreSlice &
  ResultStoreSlice &
  AgreementStoreSlice &
  CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
  CommonInformationsStoreSlice &
  CommonSituationStoreSlice;

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
  type: IndemniteDepartType;
};

const createRootSlice = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"],
  { simulatorName, toolName }
) => ({
  ...createContratTravailStore(set, get, { type: toolName }),
  ...createAncienneteStore(set, get, { type: toolName }),
  ...createSalairesStore(set, get, { type: toolName }),
  ...createResultStore(set, get, { type: toolName }),
  ...createRootAgreementsStore(set, get, { type: toolName }),
  ...createCommonAgreementStore(set, get, { type: toolName, simulator: simulatorName }),
  ...createCommonInformationsStore(set, get, { type: toolName }),
  ...createCommonSituationStore(set, get, { type: toolName }),
});

const createStore = (type: IndemniteDepartType) =>
  create(
    (
      set: StoreApi<MainStore>["setState"],
      get: StoreApi<MainStore>["getState"]
    ) =>
      createRootSlice(set, get, {
        toolName: type,
        simulatorName: type === IndemniteDepartType.RUPTURE_CONVENTIONNELLE
          ? PublicodesSimulator.RUPTURE_CONVENTIONNELLE
          : PublicodesSimulator.INDEMNITE_LICENCIEMENT,
      })
  );

const IndemniteDepartContext = createContext<StoreApi<MainStore>>(
  {} as StoreApi<MainStore>
);

const { Provider } = IndemniteDepartContext;

export {
  Provider as IndemniteDepartProvider,
  createStore as createIndemniteDepartStore,
  IndemniteDepartContext,
  useStore as useIndemniteDepartStore,
};
