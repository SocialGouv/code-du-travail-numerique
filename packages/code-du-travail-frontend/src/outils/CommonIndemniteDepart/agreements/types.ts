import { StoreApi, create } from "zustand";
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
  Agreement2148StoreError,
  Agreement2148StoreInput,
  Agreement2148StoreSlice,
  createAgreement2148StoreSalaires,
} from "./2148-telecommunications";
import {
  Agreement2609StoreError,
  Agreement2609StoreInput,
  Agreement2609StoreSlice,
  createAgreement2609StoreSalaires,
} from "./2609-batiment-etam";
import {
  Agreement2614StoreError,
  Agreement2614StoreInput,
  Agreement2614StoreSlice,
  createAgreement2614StoreSalaires,
} from "./2614-travaux-public";
import {
  Agreement1672StoreError,
  Agreement1672StoreInput,
  Agreement1672StoreSlice,
  createAgreement1672StoreSalaires,
} from "./1672-societes-assurances";
import {
  Agreement1483StoreError,
  Agreement1483StoreInput,
  Agreement1483StoreSlice,
  createAgreement1483StoreSalaires,
} from "./1483-habillement-textiles-commerce-de-detail";
import {
  Agreement1702StoreError,
  Agreement1702StoreInput,
  Agreement1702StoreSlice,
  createAgreement1702StoreSalaires,
} from "./1702-ouvriers-travaux-public";
import {
  Agreement1740StoreError,
  Agreement1740StoreInput,
  Agreement1740StoreSlice,
  createAgreement1740StoreSalaires,
} from "./1740-batiment-region-parisienne";
import {
  Agreement2120StoreError,
  Agreement2120StoreInput,
  Agreement2120StoreSlice,
  createAgreement2120StoreSalaires,
} from "./2120-banques";

export type AgreementStoreInput = Agreement1516StoreInput &
  Agreement1527StoreInput &
  Agreement16StoreInput &
  Agreement44StoreInput &
  Agreement2596StoreInput &
  Agreement2120StoreInput &
  Agreement2148StoreInput &
  Agreement2609StoreInput &
  Agreement1702StoreInput &
  Agreement2614StoreInput &
  Agreement1672StoreInput &
  Agreement1483StoreInput &
  Agreement1740StoreInput;

export type AgreementStoreError = Agreement1516StoreError &
  Agreement1527StoreError &
  Agreement16StoreError &
  Agreement44StoreError &
  Agreement2596StoreError &
  Agreement2120StoreError &
  Agreement2148StoreError &
  Agreement2609StoreError &
  Agreement1702StoreError &
  Agreement2614StoreError &
  Agreement1672StoreError &
  Agreement1483StoreError &
  Agreement1740StoreError;

export type AgreementStoreSlice = Agreement1516StoreSlice &
  Agreement1527StoreSlice &
  Agreement16StoreSlice &
  Agreement44StoreSlice &
  Agreement2614StoreSlice &
  Agreement2596StoreSlice &
  Agreement2120StoreSlice &
  Agreement2148StoreSlice &
  Agreement2609StoreSlice &
  Agreement1483StoreSlice &
  Agreement1702StoreSlice &
  Agreement1672StoreSlice &
  Agreement1740StoreSlice;

export const createRootAgreementsStore = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"],
  options: StoreOptions
) => ({
  ...createAgreement1516StoreSalaires(set, get, options),
  ...createAgreement1527StoreSalaires(set, get, options),
  ...createAgreement16StoreSalaires(set, get, options),
  ...createAgreement44StoreSalaires(set, get, options),
  ...createAgreement2596StoreSalaires(set, get, options),
  ...createAgreement2120StoreSalaires(set, get, options),
  ...createAgreement2148StoreSalaires(set, get, options),
  ...createAgreement2609StoreSalaires(set, get, options),
  ...createAgreement1702StoreSalaires(set, get, options),
  ...createAgreement2614StoreSalaires(set, get, options),
  ...createAgreement1672StoreSalaires(set, get, options),
  ...createAgreement1483StoreSalaires(set, get, options),
  ...createAgreement1740StoreSalaires(set, get, options),
});
