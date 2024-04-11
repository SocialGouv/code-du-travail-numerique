import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("Calcul de l'ancienneté CC 1505", () => {
  test.each`
    absences                                                                         | entryDate       | exitDate        | expectedSeniority
    ${[]}                                                                            | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
    ${[{ durationInMonth: "6", motif: { key: MotifKeys.congesParentalEducation } }]} | ${"20/02/2002"} | ${"20/02/2022"} | ${20}
  `(
    "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
    ({ absences, entryDate, exitDate, expectedSeniority }) => {
      const seniority = new SeniorityFactory().create(SupportedCc.IDCC1505);

      const result = seniority.computeSeniority({
        absencePeriods: absences,
        dateEntree: entryDate,
        dateSortie: exitDate,
      });

      expect(result?.value).toEqual(expectedSeniority);
    }
  );
});
