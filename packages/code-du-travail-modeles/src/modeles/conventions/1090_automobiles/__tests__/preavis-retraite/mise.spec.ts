import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);

test.each`
  seniority | grade | expectedNotice | expectedUnit
  ${5}      | ${1}  | ${14}          | ${"jour"}
  ${8}      | ${1}  | ${1}           | ${"mois"}
  ${25}     | ${1}  | ${2}           | ${"mois"}
  ${1}      | ${3}  | ${1}           | ${"mois"}
  ${8}      | ${3}  | ${1}           | ${"mois"}
  ${25}     | ${3}  | ${2}           | ${"mois"}
`(
  "Pour un ouvrier avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice $expectedUnit",
  ({ seniority, grade, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . ouvriers . échelon": grade,
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
  ${10}     | ${17} | ${2}
  ${24}     | ${17} | ${2}
  ${1}      | ${20} | ${3}
  ${10}     | ${20} | ${3}
  ${24}     | ${20} | ${3}
`(
  "Pour un agents de maîtrise avec un échelon $grade possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, grade, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle . agents de maîtrise . échelon": grade,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
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
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(3);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
