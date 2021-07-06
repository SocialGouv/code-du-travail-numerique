import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { extractImplementedCc } from "../internal/ExtractSupportedCc";

const engine = new Engine(
  mergeModels([
    "industries_chimiques.yaml",
    "industrie_pharmaceutique.yaml",
    "metallurgie_ingenieurs_cadres.yaml",
  ])
);

test("Extract all supported CC from the YAML modeles", () => {
  const result = extractImplementedCc(engine);

  expect(result).toEqual(expect.arrayContaining([176, 44, 650]));
});

test("Check all convention collective has a IDCC property", () => {
  Object.values(engine.getParsedRules())
    .filter((rule) => {
      // @ts-ignore
      const applicableSi = rule.rawNode["applicable si"];
      if (applicableSi !== undefined && typeof applicableSi === "string") {
        return applicableSi.startsWith("convention collective = 'IDCC");
      } else {
        return false;
      }
    })
    .forEach((rule) => {
      // @ts-ignore
      expect(rule.rawNode["idcc"]).not.toBeUndefined();
    });
});
