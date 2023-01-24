import { StoreApi } from "zustand";

export type StoreSlice<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"]
) => T;

export type StoreSlicePublicode<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"],
  slug: string
) => T;

export const STORAGE_KEY_AGREEMENT = "convention";
