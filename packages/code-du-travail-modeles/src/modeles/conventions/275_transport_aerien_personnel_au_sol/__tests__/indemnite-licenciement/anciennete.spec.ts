import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("CC 275", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"01/01/2020"} | ${"01/01/2021"} | ${1}
      ${[{ motif: { key: MotifKeys.maladieNonPro } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducation } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }]}                                                                                                                                                                                 | ${"20/03/2020"} | ${"20/03/2021"} | ${1}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: "1", motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: "1", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, { durationInMonth: "1", motif: { key: MotifKeys.miseAPied } }]} | ${"01/02/2020"} | ${"01/02/2022"} | ${1.4166666666666667}
      ${[{ durationInMonth: "2", motif: { key: MotifKeys.congesParentalEducation } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ${"20/01/2022"} | ${"20/02/2023"} | ${1}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC275);

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
