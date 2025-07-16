import { createStore as create, StoreApi, useStore } from "zustand";
import { createContext } from "react";
import { createAgreementStore, AgreementStoreSlice } from "./Agreement/store";
import {
  createInformationsStore,
  InformationsStoreSlice,
} from "./Informations/store";
<<<<<<<< HEAD:packages/code-du-travail-frontend/src/modules/outils/indemnite-precarite/steps/store.ts
import {
  createRemunerationStore,
  RemunerationStoreSlice,
} from "./Remuneration/store";
|||||||| 0ed33d3ab:packages/code-du-travail-frontend/src/outils/PreavisRetraite/steps/store.ts
import { createSeniorityStore, SeniorityStoreSlice } from "./Seniority/store";
========
>>>>>>>> dev:packages/code-du-travail-frontend/src/modules/outils/preavis-demission/steps/store.ts
import { createResultStore, ResultStoreSlice } from "./Result/store";

<<<<<<<< HEAD:packages/code-du-travail-frontend/src/modules/outils/indemnite-precarite/steps/store.ts
export type StoreSliceWrapperIndemnitePrecarite<
|||||||| 0ed33d3ab:packages/code-du-travail-frontend/src/outils/PreavisRetraite/steps/store.ts
export type StoreSliceWrapperPreavisRetraite<
========
export type StoreSliceWrapperPreavisDemission<
>>>>>>>> dev:packages/code-du-travail-frontend/src/modules/outils/preavis-demission/steps/store.ts
  T extends object,
  E extends object = T,
> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"]
) => T;

export type MainStore = AgreementStoreSlice &
  InformationsStoreSlice &
<<<<<<<< HEAD:packages/code-du-travail-frontend/src/modules/outils/indemnite-precarite/steps/store.ts
  RemunerationStoreSlice &
|||||||| 0ed33d3ab:packages/code-du-travail-frontend/src/outils/PreavisRetraite/steps/store.ts
  SeniorityStoreSlice &
========
>>>>>>>> dev:packages/code-du-travail-frontend/src/modules/outils/preavis-demission/steps/store.ts
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
<<<<<<<< HEAD:packages/code-du-travail-frontend/src/modules/outils/indemnite-precarite/steps/store.ts
  ...createRemunerationStore(set, get),
|||||||| 0ed33d3ab:packages/code-du-travail-frontend/src/outils/PreavisRetraite/steps/store.ts
  ...createSeniorityStore(set, get),
========
>>>>>>>> dev:packages/code-du-travail-frontend/src/modules/outils/preavis-demission/steps/store.ts
  ...createResultStore(set, get),
});

const createStore = () =>
  create(
    (
      set: StoreApi<MainStore>["setState"],
      get: StoreApi<MainStore>["getState"]
    ) => createRootSlice(set, get)
  );

<<<<<<<< HEAD:packages/code-du-travail-frontend/src/modules/outils/indemnite-precarite/steps/store.ts
const IndemnitePrecariteContext = createContext<StoreApi<MainStore>>(
|||||||| 0ed33d3ab:packages/code-du-travail-frontend/src/outils/PreavisRetraite/steps/store.ts
const PreavisRetraiteContext = createContext<StoreApi<MainStore>>(
========
const PreavisDemissionContext = createContext<StoreApi<MainStore>>(
>>>>>>>> dev:packages/code-du-travail-frontend/src/modules/outils/preavis-demission/steps/store.ts
  {} as StoreApi<MainStore>
);

<<<<<<<< HEAD:packages/code-du-travail-frontend/src/modules/outils/indemnite-precarite/steps/store.ts
const { Provider } = IndemnitePrecariteContext;
|||||||| 0ed33d3ab:packages/code-du-travail-frontend/src/outils/PreavisRetraite/steps/store.ts
const { Provider } = PreavisRetraiteContext;
========
const { Provider } = PreavisDemissionContext;
>>>>>>>> dev:packages/code-du-travail-frontend/src/modules/outils/preavis-demission/steps/store.ts

export {
<<<<<<<< HEAD:packages/code-du-travail-frontend/src/modules/outils/indemnite-precarite/steps/store.ts
  Provider as IndemnitePrecariteProvider,
  createStore as createIndemnitePrecariteStore,
  IndemnitePrecariteContext,
  useStore as useIndemnitePrecariteStore,
|||||||| 0ed33d3ab:packages/code-du-travail-frontend/src/outils/PreavisRetraite/steps/store.ts
  Provider as PreavisRetraiteProvider,
  createStore as createPreavisRetraiteStore,
  PreavisRetraiteContext,
  useStore as usePreavisRetraiteStore,
========
  Provider as PreavisDemissionProvider,
  createStore as createPreavisDemissionStore,
  PreavisDemissionContext,
  useStore as usePreavisDemissionStore,
>>>>>>>> dev:packages/code-du-travail-frontend/src/modules/outils/preavis-demission/steps/store.ts
};
