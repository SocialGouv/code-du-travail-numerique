import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";

export enum IndemniteDepartType {
  LICENCIEMENT = "licenciement",
  RUPTURE_CONVENTIONNELLE = "rupture conventionnelle",
}

export type StoreSlice<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"],
  options: { type: IndemniteDepartType }
) => T;

export type StoreSlicePublicode<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"],
  options: { simulator: PublicodesSimulator; type: IndemniteDepartType }
) => T;

export const STORAGE_KEY_AGREEMENT = "convention";
