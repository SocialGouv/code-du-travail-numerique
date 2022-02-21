import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice | expectedUnit
  ${3}      | ${7}           | ${"jour"}
  ${6}      | ${1}           | ${"mois"}
  ${24}     | ${6}           | ${"mois"}
`(
  "Pour un employé dans la convention collective Boulangerie Patisserie Entreprises Artisanales possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0843'",
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedUnit]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | expectedNotice | expectedUnit
  ${2}      | ${7}           | ${"jour"}
  ${6}      | ${1}           | ${"mois"}
  ${24}     | ${2}           | ${"mois"}
`(
  "Pour un employé dans la convention collective Boulangerie Patisserie Entreprises Artisanales possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0843'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedUnit]);
    expect(result.missingVariables).toEqual({});
  }
);
