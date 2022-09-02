import { SetState, GetState } from "zustand";
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

export type AgreementStoreInput = Agreement1516StoreInput &
  Agreement1527StoreInput;

export type AgreementStoreError = Agreement1516StoreError &
  Agreement1527StoreError;

export type AgreementStoreSlice = Agreement1516StoreSlice &
  Agreement1527StoreSlice;

export const createRootAgreementsStore = (
  set: SetState<MainStore>,
  get: GetState<MainStore>
) => ({
  ...createAgreement1516StoreSalaires(set, get),
  ...createAgreement1527StoreSalaires(set, get),
});
