import type { RuleNode } from "publicodes";
import type Engine from "publicodes";

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
  return Object.values(engine.getParsedRules())
    .filter(
      (rule) =>
        rule.rawNode.type === "notification" &&
        !!engine.evaluate(rule.dottedName).nodeValue
    )
    .filter(
      (rule: any) =>
        !rule.rawNode.cdtn ||
        (rule.rawNode.cdtn && rule.rawNode.cdtn.bloquante !== "oui")
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
    .map(({ dottedName, rawNode: { description } }) => ({
      description,
      dottedName,
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
    .filter(
      (rule: any) => rule.rawNode.cdtn && rule.rawNode.cdtn.bloquante === "oui"
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
    .map(({ dottedName, rawNode: { description } }) => ({
      description,
      dottedName,
    }));
}
