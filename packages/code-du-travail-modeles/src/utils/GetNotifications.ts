import Engine, { RuleNode } from "publicodes";

export type Notification = {
  dottedName: RuleNode["dottedName"];
  description: RuleNode["rawNode"]["description"];
};

export function getNotifications(engine: Engine): Array<Notification> {
  return Object.values(engine.getParsedRules())
    .filter(
      (rule) =>
        rule.rawNode.type === "notification" &&
        !!engine.evaluate(rule.dottedName).nodeValue
    )
    .map(({ dottedName, rawNode: { description } }) => ({
      dottedName,
      description,
    }));
}
