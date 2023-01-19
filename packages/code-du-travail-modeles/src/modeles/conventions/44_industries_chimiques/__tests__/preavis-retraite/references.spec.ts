import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const MiseRetraiteOuvrierCollaborateurReferences = [
  {
    article:
      "Avenant n° 1 Ouvriers et collaborateurs du 11 février 1971 Article 27",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005846394/?idConteneur=KALICONT000005635613",
  },
];

const MiseRetraiteTechniciensReferences = [
  {
    article:
      "Avenant n° 2 Agents de maîtrise et techniciens du 14 mars 1955 Article 20",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005846461/?idConteneur=KALICONT000005635613",
  },
];

const MiseRetraiteCadresReferences = [
  {
    article: "Avenant n°3 Ingénieurs et cadres du 16 juin 1955 Article 4",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005846301/?idConteneur=KALICONT000005635613",
  },
];

test("Vérification des références juridiques pour un employé en départ à la retraite", () => {
  engine.setSituation({
    "contrat salarié . ancienneté": "6",
    "contrat salarié . convention collective": "'IDCC0044'",
    "contrat salarié . mise à la retraite": "non",
    "contrat salarié . travailleur handicapé": "non",
  });
  const result = engine.getReferences();

  expect(result).toEqual(expect.arrayContaining(DepartRetraiteReferences));
});

test.each`
  category                  | expectedReferences
  ${"Ouvriers"}             | ${MiseRetraiteReferences.concat(MiseRetraiteOuvrierCollaborateurReferences)}
  ${"Employés"}             | ${MiseRetraiteReferences.concat(MiseRetraiteOuvrierCollaborateurReferences)}
  ${"Techniciens"}          | ${MiseRetraiteReferences.concat(MiseRetraiteOuvrierCollaborateurReferences)}
  ${"Techniciens groupe 4"} | ${MiseRetraiteReferences.concat(MiseRetraiteTechniciensReferences)}
  ${"Agents de maîtrise"}   | ${MiseRetraiteReferences.concat(MiseRetraiteTechniciensReferences)}
  ${"Ingénieurs"}           | ${MiseRetraiteReferences.concat(MiseRetraiteCadresReferences)}
  ${"Cadres"}               | ${MiseRetraiteReferences.concat(MiseRetraiteCadresReferences)}
`(
  "Vérification des références juridiques pour un $category en mise à la retraite",
  ({ category, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": "5",
      "contrat salarié . convention collective": "'IDCC0044'",
      "contrat salarié . convention collective . industries chimiques . catégorie professionnelle": `'${category}'`,
      "contrat salarié . convention collective . industries chimiques . catégorie professionnelle . ouvriers et collaborateurs . coefficient":
        "200",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
