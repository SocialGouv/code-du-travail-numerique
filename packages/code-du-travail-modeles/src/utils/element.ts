import type Engine from "publicodes";

import type { OptionsGetElement } from "./notifications";

export function getElement(
  engine: Engine,
  key: string,
  option?: OptionsGetElement
): { description: string | undefined; dottedName: string }[] {
  return Object.values(engine.getParsedRules())
    .filter(
      (rule) =>
        rule.rawNode.type === key &&
        !!engine.evaluate(rule.dottedName).nodeValue
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
