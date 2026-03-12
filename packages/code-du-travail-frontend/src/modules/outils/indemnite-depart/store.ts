import { createStore as create, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
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
  CommonInformationsStoreError,
  CommonInformationsStoreInput,
  CommonInformationsStoreSlice,
  createCommonInformationsStore,
} from "./steps/Informations/store";

import {
  CommonSituationStoreSlice,
  createCommonSituationStore,
} from "./situationStore";

import { IndemniteDepartType } from "./types";
import { createContext } from "react";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import {
  CommonAgreementStoreError,
  CommonAgreementStoreInput,
  CommonAgreementStoreSlice,
  createCommonAgreementStore,
} from "./steps/Agreement/store";
import {
  AbsenceStoreError,
  AbsenceStoreInput,
  AbsenceStoreSlice,
  createAbsenceStore,
} from "./steps/Absences";

export type MainStore = AncienneteStoreSlice &
  AbsenceStoreSlice &
  SalairesStoreSlice &
  ResultStoreSlice &
  AgreementStoreSlice &
  CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
  CommonInformationsStoreSlice &
  CommonSituationStoreSlice;

export type StepData<
  T extends
    | AncienneteStoreInput
    | AbsenceStoreInput
    | SalairesStoreInput
    | ResultStoreInput
    | AgreementStoreInput
    | CommonAgreementStoreInput
    | CommonInformationsStoreInput,
  U extends
    | AncienneteStoreError
    | AbsenceStoreError
    | SalairesStoreError
    | ResultStoreError
    | AgreementStoreError
    | CommonAgreementStoreError
    | CommonInformationsStoreError,
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
  ...createAncienneteStore(set, get, { type: toolName }),
  ...createAbsenceStore(set, get, { type: toolName }),
  ...createSalairesStore(set, get, { type: toolName }),
  ...createResultStore(set, get, { type: toolName, simulator: simulatorName }),
  ...createRootAgreementsStore(set, get, { type: toolName }),
  ...createCommonAgreementStore(set, get, {
    type: toolName,
    simulator: simulatorName,
  }),
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
        simulatorName:
          type === IndemniteDepartType.RUPTURE_CONVENTIONNELLE
            ? PublicodesSimulator.RUPTURE_CONVENTIONNELLE
            : PublicodesSimulator.INDEMNITE_LICENCIEMENT,
      })
  );

const IndemniteDepartContext = createContext<StoreApi<MainStore>>(
  {} as StoreApi<MainStore>
);

const { Provider } = IndemniteDepartContext;

const useIndemniteDepartStore = <T>(
  store: StoreApi<MainStore>,
  selector: (state: MainStore) => T
) => useStoreWithEqualityFn(store, selector, shallow);

export {
  Provider as IndemniteDepartProvider,
  createStore as createIndemniteDepartStore,
  IndemniteDepartContext,
  useIndemniteDepartStore,
};
