import { PublicodesResult } from "../types";

export type PreavisLicenciementResult<TResult> = Omit<
  PublicodesResult<TResult>,
  "detail" | "explanation" | "situation"
>;
