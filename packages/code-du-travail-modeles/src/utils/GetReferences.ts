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

export function getReferencesIndemnite(engine: Engine): any[] {
  return Object.values(engine.getParsedRules())
    .filter(
      (rule: any) =>
        rule.rawNode["références-indemnité"] &&
        engine.evaluate(rule.dottedName).nodeValue !== false
    )
    .flatMap(({ rawNode }: any) => {
      if (rawNode["références-indemnité"]) {
        return Object.entries(rawNode["références-indemnité"]).map(
          ([key, value]) => {
            return {
              article: key,
              url: value,
            };
          }
        );
      }
      return [];
    });
}
