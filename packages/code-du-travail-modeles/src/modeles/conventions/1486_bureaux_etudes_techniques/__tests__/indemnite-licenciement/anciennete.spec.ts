import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 1486", () => {
  const seniority = new SeniorityFactory().create(
    SupportedCcIndemniteLicenciement.IDCC1486
  );

  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9583333333333334}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.5416666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 4, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 5, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1 - 1 / 12}
      ${[{ durationInMonth: 8, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 7, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"01/01/1979"} | ${"01/01/2021"} | ${42 - 3 / 12}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 2, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                     | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 6, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                                                                                     | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 7, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 9, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                                                                                    | ${"01/01/1979"} | ${"01/01/2021"} | ${42 - 4 / 12}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 6, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                                                                                    | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 3, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 2, motif: { key: MotifKeys.accidentTrajet } }]}                                                                                                                                                                                                                                                                                                                                                  | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ${"01/01/2022"} | ${"01/02/2023"} | ${1}
    `(
      "$#) Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Utilisation de l'ancienne ou la nouvelle règle de calcul", () => {
    test("avec une date de sortie avant le 01/05/2023", () => {
      const result = seniority.computeSeniority({
        absencePeriods: [],
        dateEntree: "01/01/2020",
        dateSortie: "30/04/2023",
      });

      expect(result.extraInfos).toEqual({
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
          "oui",
      });
    });

    test("avec une date de sortie après le 01/05/2023", () => {
      const result = seniority.computeSeniority({
        absencePeriods: [],
        dateEntree: "01/01/2020",
        dateSortie: "01/05/2023",
      });

      expect(result.extraInfos).toEqual({
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
          "non",
      });
    });
  });
});
