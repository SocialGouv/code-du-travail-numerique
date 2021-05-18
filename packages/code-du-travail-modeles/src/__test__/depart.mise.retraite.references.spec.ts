import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getReferences } from "../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";

const engine = new Engine(mergeModels());

test("Pour un préavis de mise à la retraite, on devrait avoir les références légales d'une mise à la retraite", () => {
  const result = getReferences(
    engine.setSituation({
      "contrat salarié . ancienneté": 12,
      "contrat salarié . mise à la retraite": "oui",
    })
  );

  expect(result).toEqual(expect.arrayContaining(MiseRetraiteReferences));
});

test("Pour un préavis de départ à la retraite, on devrait avoir les références légales d'un départ à la retraite", () => {
  const result = getReferences(
    engine.setSituation({
      "contrat salarié . ancienneté": 12,
      "contrat salarié . mise à la retraite": "non",
    })
  );

  expect(result).toEqual(expect.arrayContaining(DepartRetraiteReferences));
});
