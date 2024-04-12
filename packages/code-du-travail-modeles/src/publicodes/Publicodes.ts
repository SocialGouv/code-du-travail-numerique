import type { Notification, References } from "../modeles/common";
import type { PublicodesData } from "./types";

export interface Publicodes<TResult> {
  readonly data: PublicodesData<TResult>;
  execute: (rule: string) => TResult | undefined;
  calculate: (args: Record<string, string>) => PublicodesData<TResult>;
  // calculate: (args: Record<string, string>) => PublicodesData<TResult>;
  setSituation: (args: Record<string, string>) => PublicodesData<TResult>;
  getNotifications: () => Notification[];
  getNotificationsBloquantes: () => Notification[];
  getReferences: (specificRule?: string) => References[];
}
