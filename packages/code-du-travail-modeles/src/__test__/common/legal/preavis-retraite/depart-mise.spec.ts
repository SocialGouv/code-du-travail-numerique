import Engine from "publicodes";

import { mergePreavisRetraiteModels } from "../../../../internal/merger";

const engine = new Engine(mergePreavisRetraiteModels());

test.each`
  seniority | expectedNotice
  ${3}      | ${0}
  ${6}      | ${1}
  ${11}     | ${1}
  ${12}     | ${1}
  ${23}     | ${1}
  ${24}     | ${2}
  ${25}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "''",
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
  seniority | expectedNotice
  ${3}      | ${0}
  ${6}      | ${1}
  ${11}     | ${1}
  ${12}     | ${1}
  ${23}     | ${1}
  ${24}     | ${2}
  ${25}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "''",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
