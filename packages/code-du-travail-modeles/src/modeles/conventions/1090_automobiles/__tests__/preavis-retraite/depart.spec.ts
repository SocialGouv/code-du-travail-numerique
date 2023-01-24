import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | grade | expectedNotice | expectedUnit
  ${5}      | ${1}  | ${2}           | ${"semaines"}
  ${10}     | ${1}  | ${2}           | ${"semaines"}
  ${24}     | ${1}  | ${2}           | ${"semaines"}
  ${5}      | ${3}  | ${1}           | ${"mois"}
  ${10}     | ${3}  | ${1}           | ${"mois"}
  ${24}     | ${3}  | ${1}           | ${"mois"}
`(
  "Pour un ouvrier avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de départ à la retraite doit être $expectedNotice $expectedUnit",
  ({ seniority, grade, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . ouvriers . échelon": grade,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority | grade | expectedNotice
  ${1}      | ${17} | ${2}
  ${6}      | ${17} | ${1}
  ${24}     | ${17} | ${2}
  ${1}      | ${20} | ${3}
  ${6}      | ${20} | ${1}
  ${24}     | ${20} | ${2}
`(
  "Pour un agents de maîtrise avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de départ à la retraite doit être $expectedNotice mois",
  ({ seniority, grade, expectedNotice }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . agents de maîtrise . échelon": grade,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual("mois");
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority | expectedNotice
  ${1}      | ${3}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un cadre avec $expectedNotice mois d'ancienneté, son préavis de mise à la retraite doit être de $expectedNotice mois",
  ({ expectedNotice, seniority }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual("mois");
    expect(missingArgs).toEqual([]);
  }
);
