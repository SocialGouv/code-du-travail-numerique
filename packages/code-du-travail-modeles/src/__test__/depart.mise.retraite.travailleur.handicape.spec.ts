import Engine from "publicodes";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice
  ${3}      | ${0}
  ${6}      | ${2}
  ${24}     | ${3}
`(
  "Pour un employé handicapé possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "''",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "oui",
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
  ${6}      | ${2}
  ${24}     | ${3}
`(
  "Pour un employé handicapé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "''",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
