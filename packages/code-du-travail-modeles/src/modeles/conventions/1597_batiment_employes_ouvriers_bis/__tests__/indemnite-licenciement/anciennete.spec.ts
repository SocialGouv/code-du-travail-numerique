import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 1597", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                              | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                 | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro } }]}  | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.accidentTrajet } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC1597
        );

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
