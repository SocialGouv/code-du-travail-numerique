import type { Notification, References } from "../utils";
import type { PublicodesData } from "./types";

export interface Publicodes<TResult> {
  readonly data: PublicodesData<TResult>;
  execute: (rule: string) => TResult;
  setSituation: (args: Record<string, string>) => PublicodesData<TResult>;
  getNotifications: () => Notification[];
  getReferences: (specificRule?: string) => References[];
}
