import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("CC 176", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                    | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                       | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 5, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "20/04/2020" }]}                                                                                                     | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/03/2020" }]}                                                                                                     | ${"20/02/2020"} | ${"20/02/2022"} | ${17 / 12}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/08/2020" }, { durationInMonth: 4, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/03/2020" }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${17 / 12}
      ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/11/2020" }]}                                                                                                     | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/07/2021" }]}                                                                                                     | ${"01/01/2020"} | ${"01/01/2023"} | ${3}
      ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/07/2021" }]}                                                                                                     | ${"01/01/2020"} | ${"01/01/2023"} | ${3}
      ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "15/06/2021" }]}                                                                                                     | ${"01/01/2020"} | ${"01/01/2023"} | ${2.4561943874058865}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC0176);

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
