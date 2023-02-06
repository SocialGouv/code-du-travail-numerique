import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | expectedNotice | expectedUnit
  ${3}      | ${1}           | ${"semaine"}
  ${6}      | ${1}           | ${"mois"}
  ${24}     | ${6}           | ${"mois"}
`(
  "Pour un employé dans la convention collective Boulangerie Patisserie Entreprises Artisanales possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0843'",
        "contrat salarié . mise à la retraite": "oui",
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
  seniority | expectedNotice | expectedUnit
  ${2}      | ${1}           | ${"semaine"}
  ${6}      | ${1}           | ${"mois"}
  ${24}     | ${2}           | ${"mois"}
`(
  "Pour un employé dans la convention collective Boulangerie Patisserie Entreprises Artisanales possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0843'",
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
