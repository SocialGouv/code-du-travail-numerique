import { GetState, SetState } from "zustand";
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

export type AgreementStoreInput = Agreement1516StoreInput &
  Agreement1527StoreInput &
  Agreement16StoreInput &
  Agreement29StoreInput;

export type AgreementStoreError = Agreement1516StoreError &
  Agreement1527StoreError &
  Agreement16StoreError &
  Agreement29StoreError;

export type AgreementStoreSlice = Agreement1516StoreSlice &
  Agreement1527StoreSlice &
  Agreement16StoreSlice &
  Agreement29StoreSlice;

export const createRootAgreementsStore = (
  set: SetState<MainStore>,
  get: GetState<MainStore>
) => ({
  ...createAgreement1516StoreSalaires(set, get),
  ...createAgreement1527StoreSalaires(set, get),
  ...createAgreement16StoreSalaires(set, get),
  ...createAgreement29StoreSalaires(set, get),
});
