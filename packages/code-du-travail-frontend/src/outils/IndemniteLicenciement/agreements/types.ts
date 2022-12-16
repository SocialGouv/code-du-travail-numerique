import { StoreApi } from "zustand";
import { MainStore } from "../store";
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
  Agreement44StoreInput,
  Agreement44StoreError,
  Agreement44StoreSlice,
  createAgreement44StoreSalaires,
} from "./44-industries-chimiques";
import {
  Agreement2609StoreError,
  Agreement2609StoreInput,
  Agreement2609StoreSlice,
  createAgreement2609StoreSalaires,
} from "./2609-batiment-etam";

export type AgreementStoreInput = Agreement1516StoreInput &
  Agreement1527StoreInput &
  Agreement16StoreInput &
  Agreement29StoreInput &
  Agreement44StoreInput &
  Agreement2609StoreInput;

export type AgreementStoreError = Agreement1516StoreError &
  Agreement1527StoreError &
  Agreement16StoreError &
  Agreement44StoreError &
  Agreement29StoreError &
  Agreement2609StoreError;

export type AgreementStoreSlice = Agreement1516StoreSlice &
  Agreement1527StoreSlice &
  Agreement16StoreSlice &
  Agreement44StoreSlice &
  Agreement29StoreSlice &
  Agreement2609StoreSlice;

export const createRootAgreementsStore = (
  set: StoreApi<MainStore>["setState"],
  get: StoreApi<MainStore>["getState"]
) => ({
  ...createAgreement1516StoreSalaires(set, get),
  ...createAgreement1527StoreSalaires(set, get),
  ...createAgreement16StoreSalaires(set, get),
  ...createAgreement29StoreSalaires(set, get),
  ...createAgreement44StoreSalaires(set, get),
  ...createAgreement2609StoreSalaires(set, get),
});
