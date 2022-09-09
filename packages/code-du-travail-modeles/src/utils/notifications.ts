import type { RuleNode } from "publicodes";
import type Engine from "publicodes";

import { getElement } from "./element";

export type Notification = {
  dottedName: RuleNode["dottedName"];
  description: RuleNode["rawNode"]["description"];
};

export type OptionsGetElement = {
  specificRule?: string;
  excludeRule?: string;
};

export function getNotifications(
  engine: Engine,
  option?: OptionsGetElement
): Notification[] {
  return getElement(engine, "notification", option);
}

export function getNotificationsBloquantes(
  engine: Engine,
  option?: OptionsGetElement
): Notification[] {
  return getElement(engine, "notification-bloquante", option);
}
