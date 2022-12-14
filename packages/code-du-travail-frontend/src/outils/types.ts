import { StoreApi } from "zustand";

export type StoreSlice<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"],
  publicodesRules?: string
) => T;

export const STORAGE_KEY_AGREEMENT = "convention";
