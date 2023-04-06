import { StoreApi } from "zustand";
import { MainStore, StoreOptions } from "../store";
import {
  Agreement1516StoreError,
  Agreement1516StoreInput,
  Agreement1516StoreSlice,
  createAgreement1516StoreSalaires,
} from "./1516-organismes-formation";
import {
  Agreement1527StoreError,
  Agreement1527StoreInput,
  Agreement1527StoreSlice,
  createAgreement1527StoreSalaires,
} from "./1527-immobilier";
import {
  Agreement16StoreError,
  Agreement16StoreInput,
  Agreement16StoreSlice,
  createAgreement16StoreSalaires,
} from "./16-transports-routiers";
import {
  Agreement29StoreError,
  Agreement29StoreInput,
  Agreement29StoreSlice,
  createAgreement29StoreSalaires,
} from "./29-hospitalisation-privee-but-non-lucratif";
import {
  Agreement44StoreError,
  Agreement44StoreInput,
  Agreement44StoreSlice,
  createAgreement44StoreSalaires,
} from "./44-industries-chimiques";
import {
  Agreement2596StoreError,
  Agreement2596StoreInput,
  Agreement2596StoreSlice,
  createAgreement2596StoreSalaires,
} from "./2596-coiffure";
import {
  Agreement2609StoreError,
  Agreement2609StoreInput,
  Agreement2609StoreSlice,
  createAgreement2609StoreSalaires,
} from "./2609-batiment-etam";
import {
  Agreement1672StoreError,
  Agreement1672StoreInput,
  Agreement1672StoreSlice,
  createAgreement1672StoreSalaires,
} from "./1672-societes-assurances";

export type AgreementStoreInput = Agreement1516StoreInput &
  Agreement1527StoreInput &
  Agreement16StoreInput &
  Agreement29StoreInput &
  Agreement44StoreInput &
  Agreement2596StoreInput &
  Agreement2609StoreInput &
  Agreement1672StoreInput;

export type AgreementStoreError = Agreement1516StoreError &
  Agreement1527StoreError &
  Agreement16StoreError &
  Agreement44StoreError &
  Agreement29StoreError &
  Agreement2596StoreError &
  Agreement2609StoreError &
  Agreement1672StoreError;

export type AgreementStoreSlice = Agreement1516StoreSlice &
  Agreement1527StoreSlice &
  Agreement16StoreSlice &
  Agreement44StoreSlice &
  Agreement29StoreSlice &
  Agreement2596StoreSlice &
  Agreement2609StoreSlice &
  Agreement1672StoreSlice;

export const createRootAgreementsStore = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"],
  options: StoreOptions
) => ({
  ...createAgreement1516StoreSalaires(set, get, options),
  ...createAgreement1527StoreSalaires(set, get, options),
  ...createAgreement16StoreSalaires(set, get, options),
  ...createAgreement29StoreSalaires(set, get, options),
  ...createAgreement44StoreSalaires(set, get, options),
  ...createAgreement2596StoreSalaires(set, get, options),
  ...createAgreement2609StoreSalaires(set, get, options),
  ...createAgreement1672StoreSalaires(set, get, options),
});
