import type { LegalSeniorityProps } from "../../base";
import type { CC0016SeniorityProps } from "../../conventions";
import type { MotifKeys } from "../motif-keys";

export enum SupportedCcIndemniteLicenciement {
  IDCC1516 = "IDCC1516",
  IDCC1518 = "IDCC1518",
  IDCC2511 = "IDCC2511",
  IDCC2264 = "IDCC2264",
  IDCC1979 = "IDCC1979",
  IDCC3043 = "IDCC3043",
  IDCC1090 = "IDCC1090",
  IDCC413 = "IDCC413",
  IDCC3127 = "IDCC3127",
  IDCC1351 = "IDCC1351",
  IDCC2941 = "IDCC2941",
  IDCC1597 = "IDCC1597",
  IDCC1486 = "IDCC1486",
  IDCC1527 = "IDCC1527",
  IDCC3239 = "IDCC3239",
  IDCC650 = "IDCC650",
  IDCC2216 = "IDCC2216",
  IDCC0016 = "IDCC16",
  IDCC0573 = "IDCC573",
  IDCC1596 = "IDCC1596",
  IDCC1702 = "IDCC1702",
  IDCC0029 = "IDCC29",
  IDCC0044 = "IDCC44",
  default = "default",
}

export enum QuestionOuiNon {
  oui = "Oui",
  non = "Non",
}

export type Absence = {
  motif: Motif;
  durationInMonth?: number;
  startedAt?: string;
};

export type Motif = {
  key: MotifKeys;
  label: string;
  value: number;
  startAt?: (data: Record<string, string | undefined>) => boolean;
};

export interface ISeniority<T extends SupportedCcIndemniteLicenciement> {
  computeSeniority: (args: SeniorityProps<T>) => SeniorityResult;
}

export type SeniorityProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC0016
    ? CC0016SeniorityProps
    : LegalSeniorityProps;

export type SeniorityResult = {
  value: number;
  extraInfos?: Record<string, number>;
};

export const DISABLE_ABSENCE = [
  "IDCC1090",
  "IDCC1486",
  "IDCC1527",
  "IDCC2216",
  "IDCC2941",
];
