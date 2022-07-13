import type { SupportedCcIndemniteLicenciement } from "..";
import type { LegalSeniorityProps } from "./legal";

export type Absence = {
  motif: string;
  durationInMonth?: number;
};

export type Motif = {
  key: string;
  label: string;
  value: number;
};

export interface ISeniority<T extends SupportedCcIndemniteLicenciement> {
  computeSeniority: (args: SeniorityProps<T>) => number;
}

export type SeniorityProps<T> =
  T extends SupportedCcIndemniteLicenciement.IDCC2511
    ? LegalSeniorityProps
    : LegalSeniorityProps;
