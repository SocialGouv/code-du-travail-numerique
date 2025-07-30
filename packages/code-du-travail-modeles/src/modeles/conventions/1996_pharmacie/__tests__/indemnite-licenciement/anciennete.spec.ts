import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("CC 1996", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      testCase                                                               | absences                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${"no absence"}                                                        | ${[]}                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"absence with no values"}                                            | ${[{ motif: { key: MotifKeys.maladieNonPro } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducation } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"12 ans - 5 ans d'absence continue"}                                 | ${[{ durationInMonth: 60, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2018" }]}                                                                                                                                                                                                                                                                                   | ${"01/01/2012"} | ${"01/01/2024"} | ${7.5}
      ${"12 ans - 5 mois sur une année et 4 mois sur une autre"}             | ${[{ durationInMonth: 5, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2018" }, { durationInMonth: 4, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2019" }]}                                                                                                                                                                                | ${"01/01/2012"} | ${"01/01/2024"} | ${12}
      ${"12 ans - 7 mois sur une année et 8 mois sur une autre"}             | ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2018" }, { durationInMonth: 8, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2019" }]}                                                                                                                                                                                | ${"01/01/2012"} | ${"01/01/2024"} | ${11}
      ${"12 ans - 7 mois sur une année et 4 mois sur une autre"}             | ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2018" }, { durationInMonth: 4, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2019" }]}                                                                                                                                                                                | ${"01/01/2012"} | ${"01/01/2024"} | ${11.5}
      ${"12 ans - 7 mois à cheval sur 2 années civiles (<6 mois par année)"} | ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/10/2023" }]}                                                                                                                                                                                                                                                                                    | ${"01/01/2012"} | ${"01/01/2024"} | ${12}
    `(
      "Calcul de l'ancienneté avec $testCase a pour résultat $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC1996);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });
});
