import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getReferences } from "../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";

const engine = new Engine(mergeModels());

const MiseRetraiteMetallurgieReferences = [
  {
    article: "Article 32.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023173750/?idConteneur=KALICONT000005635842",
  },
];
const DepartRetraiteMetallurgieReferences = [
  {
    article: "Article 31.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023173739/?idConteneur=KALICONT000005635842",
  },
];

test("Vérification des références juridiques pour un employé en départ à la retraite", () => {
  const result = getReferences(
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC0650'",
      "contrat salarié . ancienneté": 6,
      "contrat salarié . mise à la retraite": "non",
    })
  );

  expect(result).toEqual(
    expect.arrayContaining(
      DepartRetraiteReferences.concat(DepartRetraiteMetallurgieReferences)
    )
  );
});

test("Vérification des références juridiques pour un employé en mise à la retraite", () => {
  const result = getReferences(
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC0650'",
      "contrat salarié . ancienneté": 6,
      "contrat salarié . mise à la retraite": "oui",
    })
  );

  expect(result).toEqual(
    expect.arrayContaining(
      MiseRetraiteReferences.concat(MiseRetraiteMetallurgieReferences)
    )
  );
});
