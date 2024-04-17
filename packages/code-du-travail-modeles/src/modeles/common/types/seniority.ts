import type {
  CC0016SeniorityProps,
  CC0413SeniorityProps,
  CC650SeniorityProps,
  CC650SeniorityRequiredProps,
  CC1672SeniorityProps,
  CC3248SeniorityProps,
  CC3248SeniorityRequiredProps,
} from "../../conventions";
import type { MotifKeys } from "../motif-keys";
import type {
  DefaultSeniorityProps,
  DefaultSeniorityRequiredProps,
} from "../seniority";
import type { SupportedCc } from "../supported-agreements";

export enum QuestionOuiNon {
  oui = "Oui",
  non = "Non",
}

export enum QuestionOuiNonWithQuote {
  oui = "'Oui'",
  non = "'Non'",
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

export interface ISeniority<T extends SupportedCc> {
  mapSituation: (args: Record<string, string | undefined>) => SeniorityProps<T>;
  mapRequiredSituation: (
    args: Record<string, string | undefined>
  ) => SeniorityRequiredProps<T>;
  computeSeniority: (args: SeniorityProps<T>) => SeniorityResult;
  computeRequiredSeniority: (
    args: SeniorityRequiredProps<T>
  ) => RequiredSeniorityResult;
  getMotifs: () => Motif[];
}

export type SeniorityRequiredProps<T> = T extends SupportedCc.IDCC3248
  ? CC3248SeniorityRequiredProps
  : T extends SupportedCc.IDCC650
  ? CC650SeniorityRequiredProps
  : DefaultSeniorityRequiredProps;

export type SeniorityProps<T> = T extends SupportedCc.IDCC0016
  ? CC0016SeniorityProps
  : T extends SupportedCc.IDCC413
  ? CC0413SeniorityProps
  : T extends SupportedCc.IDCC1672
  ? CC1672SeniorityProps
  : T extends SupportedCc.IDCC3248
  ? CC3248SeniorityProps
  : T extends SupportedCc.IDCC650
  ? CC650SeniorityProps
  : DefaultSeniorityProps;

export type SeniorityResult = {
  value: number;
  extraInfos?: Record<string, number | string>;
};

export type RequiredSeniorityResult = {
  value?: number;
};
