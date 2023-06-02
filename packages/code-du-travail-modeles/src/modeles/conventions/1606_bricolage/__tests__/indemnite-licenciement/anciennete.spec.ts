import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 1606", () => {
  describe("Calcul de l'ancienneté requise", () => {
    test.each`
      absences                                                             | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC1606
        );

        const result = seniority.computeRequiredSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateNotification: "01/01/1979",
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });
});
