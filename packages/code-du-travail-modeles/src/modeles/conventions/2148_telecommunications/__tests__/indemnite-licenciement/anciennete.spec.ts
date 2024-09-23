import { SeniorityFactory, SupportedCc } from "../../../../common";

describe("CC 2148 - Calcul de l'ancienneté", () => {
  test.each`
    entryDate       | exitDate        | expectedAnciennete
    ${"20/02/2020"} | ${"01/08/2020"} | ${0.4166666666666667}
    ${"20/02/2020"} | ${"01/02/2021"} | ${0.9166666666666666}
    ${"20/02/2020"} | ${"20/02/2021"} | ${1}
    ${"20/02/2020"} | ${"20/05/2021"} | ${1}
    ${"20/02/2020"} | ${"20/02/2022"} | ${2}
    ${"20/02/2020"} | ${"20/12/2022"} | ${2}
    ${"20/02/2020"} | ${"18/02/2022"} | ${1}
  `(
    "$#) Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
    ({ entryDate, exitDate, expectedAnciennete }) => {
      const seniority = new SeniorityFactory().create(SupportedCc.IDCC2148);

      const result = seniority.computeSeniority({
        absencePeriods: [],
        dateEntree: entryDate,
        dateSortie: exitDate,
      });

      expect(result.value).toEqual(expectedAnciennete);
    }
  );
});
