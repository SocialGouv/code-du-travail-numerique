import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const DepartRetraiteMetallurgieReferences = [
  {
    article: "Article 77.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314552?idConteneur=KALICONT000046993250#KALIARTI000046314552",
  },
];
const MiseRetraiteMetallurgieReferences = [
  {
    article: "Article 78.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314557?idConteneur=KALICONT000046993250#KALIARTI000046314557",
  },
];

test("Vérification des références juridiques pour un employé en départ à la retraite", () => {
  engine.setSituation({
    "contrat salarié . ancienneté": "6",
    "contrat salarié . convention collective": "'IDCC3248'",
    "contrat salarié . mise à la retraite": "non",
    "contrat salarié . travailleur handicapé": "non",
  });
  const result = engine.getReferences();

  const expectedReferences = DepartRetraiteReferences.concat(
    DepartRetraiteMetallurgieReferences
  );
  expect(result).toHaveLength(expectedReferences.length);
  expect(result).toEqual(expect.arrayContaining(expectedReferences));
});

test("Vérification des références juridiques pour un employé en mise à la retraite", () => {
  engine.setSituation({
    "contrat salarié . ancienneté": "6",
    "contrat salarié . convention collective": "'IDCC3248'",
    "contrat salarié . mise à la retraite": "oui",
    "contrat salarié . travailleur handicapé": "non",
  });
  const result = engine.getReferences();

  const expectedReferences = MiseRetraiteReferences.concat(
    MiseRetraiteMetallurgieReferences
  );
  expect(result).toHaveLength(expectedReferences.length);
  expect(result).toEqual(expect.arrayContaining(expectedReferences));
});
