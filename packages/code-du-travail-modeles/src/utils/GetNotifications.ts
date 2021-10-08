import type { RuleNode } from "publicodes";
import type Engine from "publicodes";

export interface Notification {
  dottedName: RuleNode["dottedName"];
  description: RuleNode["rawNode"]["description"];
}

export function getNotifications(engine: Engine): Notification[] {
  return Object.values(engine.getParsedRules())
    .filter(
      (rule) =>
        rule.rawNode.type === "notification" &&
        !!engine.evaluate(rule.dottedName).nodeValue
    )
    .map(({ dottedName, rawNode: { description } }) => ({
      description,
      dottedName,
    }));
}
