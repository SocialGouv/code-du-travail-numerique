import { PreavisRetraitePublicodes } from "../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | expectedNotice | expectedUnit
  ${3}      | ${0}           | ${"semaines"}
  ${6}      | ${1}           | ${"mois"}
  ${11}     | ${1}           | ${"mois"}
  ${12}     | ${1}           | ${"mois"}
  ${23}     | ${1}           | ${"mois"}
  ${24}     | ${2}           | ${"mois"}
  ${25}     | ${2}           | ${"mois"}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation({
      "contrat salarié . ancienneté": seniority.toString(),
      "contrat salarié . convention collective": "''",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority | expectedNotice | expectedUnit
  ${3}      | ${0}           | ${"semaines"}
  ${6}      | ${1}           | ${"mois"}
  ${11}     | ${1}           | ${"mois"}
  ${12}     | ${1}           | ${"mois"}
  ${23}     | ${1}           | ${"mois"}
  ${24}     | ${2}           | ${"mois"}
  ${25}     | ${2}           | ${"mois"}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "''",
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
    });

    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
  }
);
