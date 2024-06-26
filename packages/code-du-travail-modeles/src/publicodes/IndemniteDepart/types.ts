import type {
  PublicodesIneligibility,
  PublicodesMissingArgs,
  PublicodesResult,
} from "../types";

export type IndemniteDepartResult<TResult> = Omit<
  PublicodesResult<TResult>,
  "detail" | "explanation" | "situation"
>;

export type IndemniteDepartOutput<TResult> =
  | IndemniteDepartResult<TResult>
  | PublicodesIneligibility
  | PublicodesMissingArgs;
