import { GetState, SetState } from "zustand";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
  publicodesRules?: string
) => T;

export const STORAGE_KEY_AGREEMENT = "convention";
