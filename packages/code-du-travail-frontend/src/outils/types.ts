import { StoreApi } from "zustand";

export enum ToolName {
  INDEMNITE_LICENCIEMENT = "Indemnité de licenciement",
}

export type StoreSlice<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"],
  options: { publicodesRules?: string; toolName: ToolName }
) => T;

export const STORAGE_KEY_AGREEMENT = "convention";
