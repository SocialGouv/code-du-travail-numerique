import type { SupportedCcIndemniteLicenciement } from "..";
import type { LegalSeniorityProps } from "./legal";
import type { MotifKeys } from "./motif-keys";

export type Absence = {
  motif: Motif;
  durationInMonth?: number;
  startedAt?: string;
};

export type Motif = {
  key: MotifKeys;
  label: string;
  value: number;
  startAt?: boolean;
};

export interface ISeniority<T extends SupportedCcIndemniteLicenciement> {
  computeSeniority: (args: SeniorityProps<T>) => number;
}

export type SeniorityProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC2511
  ? LegalSeniorityProps
  : LegalSeniorityProps;

export const DISABLE_ABSENCE = [
  "IDCC1090",
  "IDCC1486",
  "IDCC1527",
  "IDCC2216",
  "IDCC2941",
];
