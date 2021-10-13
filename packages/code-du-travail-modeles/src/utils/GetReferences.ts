import type Engine from "publicodes";

export type References = {
  article: string;
  url: string;
};

export function getReferences(engine: Engine): References[] {
  return Object.values(engine.getParsedRules())
    .filter(
      (rule) =>
        rule.rawNode.références &&
        engine.evaluate(rule.dottedName).nodeValue !== false
    )
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
