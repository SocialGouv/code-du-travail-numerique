import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";

export enum IndemniteDepartType {
  INDEMNITE_LICENCIEMENT = "Indemnité de licenciement",
  RUPTURE_CONVENTIONNELLE = "Rupture conventionnelle",
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
