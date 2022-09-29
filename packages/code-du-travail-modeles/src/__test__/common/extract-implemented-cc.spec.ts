import Engine from "publicodes";

import type { RuleNodeIdcc } from "../../internal/extractSupportedCc";
import { mergePreavisRetraiteModels } from "../../internal/merger";

const engine = new Engine(mergePreavisRetraiteModels());

test("Check all agreements have an cdtn with idcc property", () => {
  Object.values(engine.getParsedRules())
    .filter((rule: any) => {
      const applicableSi = rule.rawNode["applicable si"];
      if (applicableSi !== undefined && typeof applicableSi === "string") {
        return applicableSi.startsWith("convention collective = 'IDCC");
      } else {
        return false;
      }
    })
    .forEach((rule) => {
      const rawNode = rule.rawNode as RuleNodeIdcc;
      expect(rawNode.cdtn).not.toBeUndefined();
      expect(rawNode.cdtn?.idcc).not.toBeUndefined();
    });
});
