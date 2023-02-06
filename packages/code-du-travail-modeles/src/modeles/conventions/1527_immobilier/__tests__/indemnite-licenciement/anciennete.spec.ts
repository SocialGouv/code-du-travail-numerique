import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 1527", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde }, startedAt: "05/03/2020" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ${"20/02/2020"} | ${"20/02/2021"} | ${1 - 1 / 12}
      ${[{ durationInMonth: 0.99, motif: { key: MotifKeys.congesSansSolde }, startedAt: "05/03/2018" }, { durationInMonth: 0.5, motif: { key: MotifKeys.congesSansSolde }, startedAt: "06/03/2019" }, { durationInMonth: 0.8, motif: { key: MotifKeys.congesSansSolde }, startedAt: "08/05/2020" }]}                                                                                                                                                                                                                                                                                                                                | ${"20/02/2018"} | ${"20/02/2021"} | ${3}
      ${[{ durationInMonth: 0.2, motif: { key: MotifKeys.congesSansSolde }, startedAt: "05/03/2018" }, { durationInMonth: 0.3, motif: { key: MotifKeys.congesSansSolde }, startedAt: "05/09/2018" }, { durationInMonth: 0.5, motif: { key: MotifKeys.congesSansSolde }, startedAt: "05/04/2019" }, { durationInMonth: 0.5, motif: { key: MotifKeys.congesSansSolde }, startedAt: "06/08/2019" }, { durationInMonth: 2, motif: { key: MotifKeys.congesSansSolde }, startedAt: "08/09/2020" }]}                                                                                                                                       | ${"20/02/2018"} | ${"20/02/2021"} | ${3 - 3 / 12}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC1527
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
