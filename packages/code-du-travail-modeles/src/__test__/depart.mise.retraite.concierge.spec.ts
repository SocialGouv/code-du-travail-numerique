import Engine from "publicodes";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  accommodation | coefficient | expectedResult | expectedPeriod | seniority
  ${"Non"}      | ${602}      | ${8}           | ${"jours"}     | ${1}
  ${"Non"}      | ${602}      | ${8}           | ${"jours"}     | ${6}
  ${"Non"}      | ${602}      | ${8}           | ${"jours"}     | ${24}
  ${"Non"}      | ${603}      | ${1}           | ${"mois"}      | ${1}
  ${"Non"}      | ${603}      | ${1}           | ${"mois"}      | ${6}
  ${"Non"}      | ${603}      | ${1}           | ${"mois"}      | ${24}
  ${"Oui"}      | ${602}      | ${1}           | ${"mois"}      | ${1}
  ${"Oui"}      | ${602}      | ${1}           | ${"mois"}      | ${6}
  ${"Oui"}      | ${602}      | ${1}           | ${"mois"}      | ${24}
  ${"Oui"}      | ${603}      | ${1}           | ${"mois"}      | ${1}
  ${"Oui"}      | ${603}      | ${1}           | ${"mois"}      | ${6}
  ${"Oui"}      | ${603}      | ${1}           | ${"mois"}      | ${24}
`(
  "Pour un salarié disposant d'une ancienneté $seniority de ce coefficient $coefficient et ayant un logement : $accommodation, son préavis de départ à la retraite devrait être $expectedResult $expectedPeriod",
  ({ accommodation, coefficient, expectedResult, expectedPeriod, seniority }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC1043'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective . gardien concierge . logement": `'${accommodation}'`,
        "contrat salarié . convention collective . gardien concierge . coefficient":
          coefficient,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.missingVariables).toEqual({});
    expect(result.nodeValue).toEqual(expectedResult);
    expect(result.unit?.numerators).toEqual([expectedPeriod]);
  }
);

test.each`
  category         | seniority | expectedResult
  ${"Catégorie A"} | ${12}     | ${1}
  ${"Catégorie B"} | ${12}     | ${6}
  ${"Catégorie A"} | ${24}     | ${2}
  ${"Catégorie B"} | ${24}     | ${6}
`(
  "Pour un salarié de tel $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedResult mois",
  ({ seniority, category, expectedResult }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC1043'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . convention collective . gardien concierge . catégorie professionnelle": `'${category}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.missingVariables).toEqual({});
    expect(result.nodeValue).toEqual(expectedResult);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);
