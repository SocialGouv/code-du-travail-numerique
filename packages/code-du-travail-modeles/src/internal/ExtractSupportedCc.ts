import Engine, { Rule } from "publicodes";

type RuleNodeIdcc = Rule & { idcc: number };

export function extractImplementedCc(engine: Engine): Array<number> {
  return Object.values(engine.getParsedRules())
    .flatMap((rule) => (rule.rawNode as RuleNodeIdcc)["idcc"])
    .filter((item) => item !== undefined);
}
