import type { Evaluation, Unit } from "publicodes";
import type {
  PublicodesIneligibility,
  PublicodesMissingArgs,
  PublicodesResult,
} from "../types";

export type PublicodesCalculateResult = {
  value: Evaluation<number>;
  unit?: Unit;
  ineligibility?: string;
};

export type BuilderResult<TResult> = Omit<
  PublicodesResult<TResult>,
  "detail" | "explanation" | "situation"
>;

export type CalculateOutput<TResult> =
  | BuilderResult<TResult>
  | PublicodesIneligibility
  | PublicodesMissingArgs;
