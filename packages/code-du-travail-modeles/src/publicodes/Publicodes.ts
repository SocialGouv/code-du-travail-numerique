import type { PublicodesData } from "./types";
import type { Notification, References } from "../utils";

export interface Publicodes<TResult> {
  readonly data: PublicodesData<TResult>;
  execute: (rule: string) => TResult;
  setSituation: (args: Record<string, string>) => PublicodesData<TResult>;
  getNotifications: () => Notification[];
  getReferences: () => References[];
}
