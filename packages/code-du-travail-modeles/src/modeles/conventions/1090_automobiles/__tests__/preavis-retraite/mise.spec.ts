import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | grade | expectedNotice | expectedUnit
  ${5}      | ${1}  | ${2}           | ${"semaines"}
  ${8}      | ${1}  | ${1}           | ${"mois"}
  ${25}     | ${1}  | ${2}           | ${"mois"}
  ${1}      | ${3}  | ${1}           | ${"mois"}
  ${8}      | ${3}  | ${1}           | ${"mois"}
  ${25}     | ${3}  | ${2}           | ${"mois"}
`(
  "Pour un ouvrier avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice $expectedUnit",
  ({ seniority, grade, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . ouvriers . échelon":
          grade,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result?.value).toEqual(expectedNotice);
    expect(result?.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority | grade | expectedNotice
  ${1}      | ${17} | ${2}
  ${10}     | ${17} | ${2}
  ${24}     | ${17} | ${2}
  ${1}      | ${20} | ${3}
  ${10}     | ${20} | ${3}
  ${24}     | ${20} | ${3}
`(
  "Pour un agents de maîtrise avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, grade, expectedNotice }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . agents de maîtrise . échelon":
          grade,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result?.value).toEqual(expectedNotice);
    expect(result?.unit).toEqual("mois");
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority
  ${1}
  ${10}
  ${24}
`(
  "Pour un cadre de $seniority mois d'ancienneté, son préavis de mise à la retraite doit être 3 mois",
  ({ seniority }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result?.value).toEqual(3);
    expect(result?.unit).toEqual("mois");
    expect(missingArgs).toEqual([]);
  }
);
