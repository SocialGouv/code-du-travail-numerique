import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);

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
      "contrat salarié . ancienneté": 6,
      "contrat salarié . convention collective": "'IDCC0650'",
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
    })
  );

  const expectedReferences = DepartRetraiteReferences.concat(
    DepartRetraiteMetallurgieReferences
  );
  expect(result).toHaveLength(expectedReferences.length);
  expect(result).toEqual(expect.arrayContaining(expectedReferences));
});

test("Vérification des références juridiques pour un employé en mise à la retraite", () => {
  const result = getReferences(
    engine.setSituation({
      "contrat salarié . ancienneté": 6,
      "contrat salarié . convention collective": "'IDCC0650'",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    })
  );

  const expectedReferences = MiseRetraiteReferences.concat(
    MiseRetraiteMetallurgieReferences
  );
  expect(result).toHaveLength(expectedReferences.length);
  expect(result).toEqual(expect.arrayContaining(expectedReferences));
});
