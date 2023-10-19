import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 1516", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${"01/01/2020"} | ${"01/01/2021"} | ${1}
      ${[{ motif: { key: MotifKeys.maladieNonPro } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducation } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }]}                                                                                                                                                                                                                                                                | ${"20/03/2020"} | ${"20/03/2021"} | ${1}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: "1", motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: "1", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, { durationInMonth: "1", motif: { key: MotifKeys.miseAPied } }]}                                                                                | ${"01/01/2000"} | ${"01/01/2023"} | ${22.416666666666668}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: "1", motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: "35", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, { durationInMonth: "1", motif: { key: MotifKeys.miseAPied } }]}                                                                               | ${"01/01/2000"} | ${"01/01/2023"} | ${22.416666666666668}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: "1", motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: "36", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, { durationInMonth: "1", motif: { key: MotifKeys.miseAPied } }]}                                                                               | ${"01/01/2000"} | ${"01/01/2023"} | ${22.416666666666668}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: "1", motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: "18", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "18", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, { durationInMonth: "1", motif: { key: MotifKeys.miseAPied } }]} | ${"01/01/2000"} | ${"01/01/2023"} | ${22.416666666666668}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: "1", motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: "37", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, { durationInMonth: "1", motif: { key: MotifKeys.miseAPied } }]}                                                                               | ${"01/01/2000"} | ${"01/01/2023"} | ${22.375}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: "1", motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: "1", motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: "18", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "19", motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: "1", motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, { durationInMonth: "1", motif: { key: MotifKeys.miseAPied } }]} | ${"01/01/2000"} | ${"01/01/2023"} | ${22.375}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC1516
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
