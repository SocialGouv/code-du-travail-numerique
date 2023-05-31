import type Engine from "publicodes";

import type {
  NotificationAffichage,
  NotificationRuleNode,
} from "../../../publicodes";

export type Notification = {
  dottedName: NotificationRuleNode["dottedName"];
  description: JSX.Element | NotificationRuleNode["rawNode"]["description"];
  show: NotificationAffichage;
};

export type OptionsGetElement = {
  specificRule?: string;
  excludeRule?: string;
};

export function getNotifications(
  engine: Engine,
  option?: OptionsGetElement
): Notification[] {
  return Object.values(engine.getParsedRules())
    .filter(
      (rule) =>
        rule.rawNode.type === "notification" &&
        !!engine.evaluate(rule.dottedName).nodeValue
    )
    .map((item) => item as NotificationRuleNode)
    .filter(
      (rule) => !rule.rawNode.cdtn || rule.rawNode.cdtn.bloquante !== "oui"
    )
    .filter((rules) => {
      if (option?.specificRule) {
        return rules.dottedName.includes(option.specificRule);
      }
      return true;
    })
    .filter((rules) => {
      if (option?.excludeRule) {
        return !rules.dottedName.includes(option.excludeRule);
      }
      return true;
    })
    .map(({ dottedName, rawNode: { description, cdtn } }) => ({
      description,
      dottedName,
      show: cdtn?.affichage ?? "conventionnel",
    }));
}

export function getNotificationsBloquantes(
  engine: Engine,
  option?: OptionsGetElement
): Notification[] {
  return Object.values(engine.getParsedRules())
    .filter(
      (rule) =>
        rule.rawNode.type === "notification" &&
        !!engine.evaluate(rule.dottedName).nodeValue
    )
    .map((item) => item as NotificationRuleNode)
    .filter(
      (rule) => rule.rawNode.cdtn && rule.rawNode.cdtn.bloquante === "oui"
    )
    .filter((rules) => {
      if (option?.specificRule) {
        return rules.dottedName.includes(option.specificRule);
      }
      return true;
    })
    .filter((rules) => {
      if (option?.excludeRule) {
        return !rules.dottedName.includes(option.excludeRule);
      }
      return true;
    })
    .map(({ dottedName, rawNode: { description, cdtn } }) => ({
      description,
      dottedName,
      show: cdtn?.affichage ?? "conventionnel",
    }));
}
