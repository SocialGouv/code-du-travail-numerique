import Engine from "publicodes";

import type { RuleNodeIdcc } from "../internal/ExtractSupportedCc";
import { extractImplementedCc } from "../internal/ExtractSupportedCc";
import { mergeModels } from "../internal/merger";

const engine = new Engine(
  mergeModels([
    "industries_chimiques.yaml",
    "industrie_pharmaceutique.yaml",
    "metallurgie_ingenieurs_cadres.yaml",
    "animation.yaml",
  ])
);

test("Extract all supported CC from the YAML modeles", () => {
  const result = extractImplementedCc(engine);

  expect(result).toEqual(
    expect.arrayContaining([
      { idcc: 176, preavisRetraite: true },
      { idcc: 44, preavisRetraite: true },
      { idcc: 650, preavisRetraite: true },
      { idcc: 1518, preavisRetraite: false },
    ])
  );
});

test("Check all agreements have an cdtn with idcc property", () => {
  Object.values(engine.getParsedRules())
    .filter((rule) => {
      // @ts-expect-error
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
