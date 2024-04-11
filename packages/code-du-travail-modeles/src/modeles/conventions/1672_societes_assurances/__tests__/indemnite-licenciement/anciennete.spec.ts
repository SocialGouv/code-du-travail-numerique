import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("Calcul de l'ancienneté : CC 1672", () => {
  describe("Non cadre", () => {
    test.each`
      absences                                                                        | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                           | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }]}            | ${"20/02/2020"} | ${"20/02/2021"} | ${1 - 1 / 12}
      ${[{ durationInMonth: 12, motif: { key: MotifKeys.congesParentalEducation } }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${[{ durationInMonth: 24, motif: { key: MotifKeys.congesParentalEducation } }]} | ${"20/02/2020"} | ${"20/02/2023"} | ${2.5}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC1672);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
          isExecutive: false,
        });

        expect(result?.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Cadre", () => {
    test.each`
      absences                                                                                                               | entryDate       | exitDate        | becameExecutiveAt | expectedAnciennete | expectedExtras
      ${[]}                                                                                                                  | ${"20/02/2020"} | ${"20/02/2021"} | ${undefined}      | ${1}               | ${{}}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde, value: 1 } }]}                                     | ${"20/02/2020"} | ${"20/02/2021"} | ${undefined}      | ${1 - 1 / 12}      | ${{}}
      ${[]}                                                                                                                  | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1}               | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 1 }}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde, value: 1 }, startedAt: "01/05/2020" }]}            | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1}               | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 1 - 1 / 12 }}
      ${[{ durationInMonth: "12", motif: { key: MotifKeys.congesParentalEducation, value: 0.5 }, startedAt: "01/05/2020" }]} | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1}               | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 1 }}
      ${[{ durationInMonth: "24", motif: { key: MotifKeys.congesParentalEducation, value: 0.5 }, startedAt: "01/05/2021" }]} | ${"01/01/2020"} | ${"01/01/2024"} | ${"01/01/2021"}   | ${2.5}             | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 1 }}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde, value: 1 }, startedAt: "01/05/2021" }]}            | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1 - 1 / 12}      | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 1 }}
      ${[{ durationInMonth: "12", motif: { key: MotifKeys.congesParentalEducation, value: 0.5 }, startedAt: "01/05/2021" }]} | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1}               | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 1 }}
      ${[{ durationInMonth: "36", motif: { key: MotifKeys.congesParentalEducation, value: 0.5 }, startedAt: "01/01/2015" }]} | ${"01/01/1990"} | ${"01/01/2020"} | ${"01/01/2010"}   | ${9}               | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 20 }}
      ${[]}                                                                                                                  | ${"01/01/2012"} | ${"01/01/2022"} | ${"01/01/2000"}   | ${10}              | ${{ "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 0 }}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate (cadre depuis : $becameExecutiveAt) en attendant $expectedAnciennete an",
      ({
        absences,
        entryDate,
        exitDate,
        becameExecutiveAt,
        expectedAnciennete,
        expectedExtras,
      }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC1672);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          becameExecutiveAt,
          dateEntree: entryDate,
          dateSortie: exitDate,
          isExecutive: true,
        });

        expect(result?.value).toEqual(expectedAnciennete);
        expect(result?.extraInfos).toEqual(expectedExtras);
      }
    );
  });
});
