import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 2609", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                               | entryDate       | exitDate        | expectedSeniority
      ${[]}                                                                  | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: "2", motif: { key: MotifKeys.maladieNonPro } }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedSeniority }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC2609
        );

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedSeniority);
      }
    );
  });
});
