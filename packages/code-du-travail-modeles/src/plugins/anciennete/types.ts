import type { SupportedCcIndemniteLicenciement } from "..";
import type { CC0016SeniorityProps } from "./16_transports_routiers";
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
