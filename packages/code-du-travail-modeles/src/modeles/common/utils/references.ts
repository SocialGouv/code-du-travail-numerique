import type Engine from "publicodes";

export type References = {
  article: string;
  url: string;
};

export function getReferences(
  engine: Engine,
  specificRule?: string
): References[] {
  const refs = Object.values(engine.getParsedRules());
  return refs
    .filter(
      (rule) =>
        rule.rawNode.références &&
        engine.evaluate(rule.dottedName).nodeValue !== null
    )
    .filter((rules) => {
      if (specificRule) {
        return rules.dottedName.includes(specificRule);
      }
      return true;
    })
    .flatMap(({ rawNode }) => {
      if (rawNode.références) {
        return Object.entries(rawNode.références).map(([key, value]) => {
          return {
            article: key,
            url: value,
          };
        });
      }
      return [];
    });
}
