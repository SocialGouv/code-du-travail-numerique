import Engine from "publicodes";

import type { RuleNodeIdcc } from "../../internal/extractSupportedCc";

import modeles from "../../../src/__test__/output/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);

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
