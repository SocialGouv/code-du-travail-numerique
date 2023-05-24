import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 1702", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                   | ${"01/01/2020"} | ${"01/01/2021"} | ${1}
      ${[{ durationInMonth: "2", motif: { key: MotifKeys.maladieNonPro } }]}  | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }]} | ${"01/01/2020"} | ${"31/12/2020"} | ${1}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC1702
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
