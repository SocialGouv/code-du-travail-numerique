import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice
  ${3}      | ${3}
  ${6}      | ${3}
  ${24}     | ${3}
`(
  "Pour un employé dans la convention collective Bâtiment Etam possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . ancienneté": seniority,
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
  ${2}      | ${2}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un employé dans la convention collective Bâtiment Etam possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
