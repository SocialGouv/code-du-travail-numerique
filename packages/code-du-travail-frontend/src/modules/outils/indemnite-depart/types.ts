import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";

export enum IndemniteDepartType {
  LICENCIEMENT = "Indemnité de licenciement",
  RUPTURE_CONVENTIONNELLE = "Indemnité de rupture conventionnelle",
  // La valeur sert aussi de nom d'action Matomo (`view_step_<valeur>`) : elle
  // doit couvrir les deux origines possibles du départ à la retraite.
  RETRAITE = "Indemnité de départ ou de mise à la retraite",
}

/**
 * Origine du départ à la retraite, saisie à l'étape « Informations ».
 * Pilote à la fois les libellés « départ / mise » et la méthode de calcul.
 */
export type OriginRetraite = "depart-retraite" | "mise-retraite";

export type StoreSlice<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"],
  options: { type: IndemniteDepartType }
) => T;

export type StoreSlicePublicodes<T extends object, E extends object = T> = (
  set: StoreApi<E extends T ? E : E & T>["setState"],
  get: StoreApi<E extends T ? E : E & T>["getState"],
  options: { simulator: PublicodesSimulator; type: IndemniteDepartType }
) => T;

export type AgreementRoute =
  | "not-selected"
  | "agreement"
  | "enterprise"
  | "no-agreement";

export const STORAGE_KEY_AGREEMENT = "convention";

export type Agreement = {
  id: string;
  num: number;
  shortTitle: string;
  slug?: string;
  title: string;
  url?: string;
  highlight?: {
    title: string;
    content: string;
    searchInfo?: string;
  };
  contributions: boolean;
};
