import Engine from "publicodes";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | grade | expectedNotice | expectedUnit
  ${5}      | ${1}  | ${2}           | ${"semaines"}
  ${6}      | ${1}  | ${1}           | ${"mois"}
  ${24}     | ${1}  | ${2}           | ${"mois"}
  ${1}      | ${3}  | ${1}           | ${"mois"}
  ${24}     | ${3}  | ${2}           | ${"mois"}
`(
  "Pour un ouvriers avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice $expectedUnit",
  ({ seniority, grade, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . ouvrier . échelon":
          grade,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedUnit]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | grade | expectedNotice
  ${1}      | ${17} | ${2}
  ${1}      | ${20} | ${3}
  ${24}     | ${20} | ${3}
`(
  "Pour un agents de maîtrise avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, category, grade, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . agents de maîtrise . échelon":
          grade,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test("Pour un cadre (peu importe l'échellon ou l'ancienneté), son préavis de mise à la retraite doit être 3 mois", () => {
  const result = engine
    .setSituation({
      "contrat salarié . convention collective": "'IDCC1090'",
      "contrat salarié . ancienneté": 1,
      "contrat salarié . convention collective . automobiles . catégorie professionnelle":
        "'Cadres'",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    })
    .evaluate("contrat salarié . préavis de retraite");

  expect(result.nodeValue).toEqual(3);
  expect(result.unit?.numerators).toEqual(["mois"]);
  expect(result.missingVariables).toEqual({});
});
