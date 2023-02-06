import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  retirement  | seniority | expectedResult
  ${"depart"} | ${5}      | ${3}
  ${"depart"} | ${6}      | ${1}
  ${"depart"} | ${24}     | ${2}
  ${"mise"}   | ${5}      | ${3}
  ${"mise"}   | ${6}      | ${3}
  ${"mise"}   | ${24}     | ${3}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedResult mois",
  ({ retirement, seniority, expectedResult }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1480'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedResult);
    expect(result.unit).toEqual("mois");
    expect(missingArgs).toEqual([]);
  }
);
