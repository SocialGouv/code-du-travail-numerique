import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("CC 2941", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ motif: { key: MotifKeys.maladieNonPro } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducation } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }, { motif: { key: MotifKeys.congesPaternite } }]}                                                                                                                                                                                     | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0.5, motif: { key: MotifKeys.maladieNonPro }, startedAt: "02/02/2011" }, { durationInMonth: 0.75, motif: { key: MotifKeys.maladieNonPro }, startedAt: "02/02/2013" }, { durationInMonth: 2.5, motif: { key: MotifKeys.maladieNonPro }, startedAt: "02/02/2017" }]}                                                                                                                                                                                                                                                                                                                                      | ${"01/01/2008"} | ${"01/01/2021"} | ${12.875}
      ${[{ durationInMonth: 2, motif: { key: MotifKeys.maladieNonPro }, startedAt: "01/08/2022" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ${"01/01/2022"} | ${"01/02/2023"} | ${1}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC2941
        );

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result).toEqual(expectedAnciennete);
      }
    );
  });
});
