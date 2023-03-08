import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const MiseRetraiteReferencesBad = [
  {
    article: "Titre IV, article 26.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392525#KALIARTI000044392525",
  },
  {
    article: "Titre IV, article 29",
    url: "https://wwww.legifrance.gouv.fr/conv_coll/article/KALIARTI000025805636#KALIARTI000025805636",
  },
].concat(MiseRetraiteReferences);
test("Vérification des références juridiques pour un employéen en depart à la retraite", () => {
  engine.setSituation({
    "contrat salarié . ancienneté": "6",
    "contrat salarié . convention collective": "'IDCC2941'",
    "contrat salarié . convention collective . bad . catégorie professionnelle": `'Employé'`,
    "contrat salarié . mise à la retraite": "non",
    "contrat salarié . travailleur handicapé": "non",
  });
  const result = engine.getReferences();

  expect(result).toHaveLength(DepartRetraiteReferences.length);
  expect(result).toEqual(expect.arrayContaining(DepartRetraiteReferences));
});

test.each`
  category                          | expectedReferences
  ${"Employé"}                      | ${MiseRetraiteReferencesBad}
  ${"Technicien-agent de maîtrise"} | ${MiseRetraiteReferencesBad}
  ${"Cadre"}                        | ${MiseRetraiteReferencesBad}
`(
  "Vérification des références juridiques pour un $category mise à la retraite",
  ({ category, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": "6",
      "contrat salarié . convention collective": "'IDCC2941'",
      "contrat salarié . convention collective . bad . catégorie professionnelle": `'${category}'`,
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
