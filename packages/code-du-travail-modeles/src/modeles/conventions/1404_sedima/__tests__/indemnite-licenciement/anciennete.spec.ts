import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("CC 1404", () => {
  describe("Calcul de l'ancienneté pour un non cadre", () => {
    test.each`
      absences                                                                                                                                                                                                    | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                       | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "20/04/2020" }]}                                                                                                     | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 5, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "20/04/2020" }]}                                                                                                     | ${"20/02/2020"} | ${"20/02/2021"} | ${10 / 12}
      ${[{ durationInMonth: 2, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/03/2020" }, { durationInMonth: 2, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/10/2020" }]} | ${"01/08/2020"} | ${"01/08/2021"} | ${11 / 12}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC1404);

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
