import type { PublicodesData } from "./types";

export interface Publicodes<TResult> {
  readonly data: PublicodesData<TResult>;
  execute: (rule: string) => TResult;
  setSituation: (args: Record<string, any>) => PublicodesData<TResult>;
}
