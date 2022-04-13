import type Engine from "publicodes";

export function extractCcnIds(engine: Engine): string[] {
  return Object.values(engine.getParsedRules())
    .flatMap((rule: any) => {
      const applicableSi = rule.rawNode["applicable si"];
      return applicableSi && typeof applicableSi == "string"
        ? [applicableSi]
        : [];
    })
    .filter((applicable) => {
      return applicable.startsWith("convention collective = 'IDCC");
    })
    .map((applicableCc) => {
      const regex = /convention collective = '(IDCC[0-9]*)'/gm;
      const m = regex.exec(applicableCc);
      return m ? m[1] : "";
    });
}
