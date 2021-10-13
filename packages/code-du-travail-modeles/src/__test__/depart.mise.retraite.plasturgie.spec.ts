import Engine from "publicodes";

import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice
  ${3}      | ${3}
  ${6}      | ${3}
  ${11}     | ${3}
  ${12}     | ${3}
  ${23}     | ${3}
  ${24}     | ${3}
  ${25}     | ${3}
`(
  "Pour un employé cadre dans la plasturgie possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle":
          "'Cadres'",
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
  ${3}      | ${3}
  ${6}      | ${1}
  ${11}     | ${1}
  ${12}     | ${1}
  ${23}     | ${1}
  ${24}     | ${2}
  ${25}     | ${2}
`(
  "Pour un employé cadre dans la plasturgie possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | coefficient | expectedNotice
  ${3}      | ${700}      | ${1}
  ${23}     | ${750}      | ${1}
  ${24}     | ${750}      | ${2}
  ${3}      | ${800}      | ${2}
  ${23}     | ${830}      | ${2}
`(
  "Pour un employé collaborateurs avec un coefficient de $coefficient dans la plasturgie possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, coefficient, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle":
          "'Collaborateurs'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle . Collaborateurs . coefficient":
          coefficient,
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
  seniority | coefficient | expectedNotice
  ${3}      | ${700}      | ${1}
  ${23}     | ${750}      | ${1}
  ${24}     | ${750}      | ${2}
  ${3}      | ${800}      | ${2}
  ${23}     | ${830}      | ${1}
  ${24}     | ${830}      | ${2}
`(
  "Pour un employé collaborateurs avec un coefficient de $coefficient dans la plasturgie possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, coefficient, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle":
          "'Collaborateurs'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle . Collaborateurs . coefficient":
          coefficient,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
