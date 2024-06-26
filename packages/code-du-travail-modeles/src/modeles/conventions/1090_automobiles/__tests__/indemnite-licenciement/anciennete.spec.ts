import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("CC 1090", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ motif: { key: MotifKeys.maladieNonPro } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }]}                                                                                                                                                                 | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9583333333333334}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9583333333333334}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/01/2021"} | ${"20/02/2021"} | ${0.041666666666666664}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 8, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                | ${"01/01/1979"} | ${"01/01/2021"} | ${42 - 3 / 12}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 2, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                               | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 6, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                                                                                               | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 7, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 9, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                                                                                              | ${"01/01/1979"} | ${"01/01/2021"} | ${42 - 4 / 12}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 6, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                                                                                              | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 3, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 2, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                            | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
    `(
      "$#) Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC1090);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Avec congé parental total", () => {
    test.each`
      absences                                                                                 | entryDate       | exitDate        | expectedAnciennete
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9583333333333334}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC1090);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedAnciennete);
        expect(result.extraInfos).toEqual({
          "contrat salarié . convention collective . automobiles . indemnité de licenciement . congé parental d'éducation à temps plein":
            "oui",
        });
      }
    );
  });

  describe("Sans congé parental total", () => {
    test.each`
      absences                                                                  | entryDate       | exitDate        | expectedAnciennete
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC1090);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedAnciennete);
        expect(result.extraInfos).toBe(undefined);
      }
    );
  });
});
