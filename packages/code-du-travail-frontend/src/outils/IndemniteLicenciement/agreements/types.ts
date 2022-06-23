import { SetState, GetState } from "zustand";
import { MainStore } from "../store";
import {
  Agreement1516StoreError,
  Agreement1516StoreInput,
  Agreement1516StoreSlice,
  createAgreement1516StoreSalaires,
} from "./1516-organismes-formation";

export type AgreementStoreInput = Agreement1516StoreInput;

export type AgreementStoreError = Agreement1516StoreError;

export type AgreementStoreSlice = Agreement1516StoreSlice;

export const createRootAgreementsStore = (
  set: SetState<MainStore>,
  get: GetState<MainStore>
) => ({
  ...createAgreement1516StoreSalaires(set, get),
});
