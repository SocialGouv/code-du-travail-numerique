import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 2120", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ motif: { key: MotifKeys.maladieNonPro } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }]}                                                                                                                                                                 | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.5}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducationTempsPlein } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
    `(
      "$#) Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC2120
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

  describe("Calcul du nombre de semestres", () => {
    test.each`
      entryDate       | exitDate        | expectedSemesterBefore2002 | expectedSemesterAfter2002
      ${"01/01/1995"} | ${"31/12/2001"} | ${14}                      | ${0}
      ${"20/02/2020"} | ${"20/02/2021"} | ${0}                       | ${38}
      ${"01/01/2002"} | ${"20/02/2023"} | ${0}                       | ${42}
      ${"01/01/2002"} | ${"01/06/2023"} | ${0}                       | ${42}
      ${"01/01/2002"} | ${"01/07/2023"} | ${0}                       | ${43}
      ${"01/01/1960"} | ${"20/02/2023"} | ${84}                      | ${42}
      ${"01/01/1980"} | ${"20/02/2024"} | ${44}                      | ${44}
    `(
      "$#) Calcul de les extrasInfos avec $entryDate et $exitDate en attendant $expectedSemesterBefore2002 semestres avant 2002 et $expectedSemesterAfter2002 semestres après 2002",
      ({
        entryDate,
        exitDate,
        expectedSemesterBefore2002,
        expectedSemesterAfter2002,
      }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC2120
        );

        const result = seniority.computeSeniority({
          absencePeriods: [],
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        // console.log(result.extraInfos);

        expect(
          result.extraInfos?.[
            "contrat salarié . convention collective . banque . semestres complets avant 2002"
          ]
        ).toEqual(expectedSemesterBefore2002);

        expect(
          result.extraInfos?.[
            "contrat salarié . convention collective . banque . semestres complets après 2002"
          ]
        ).toEqual(expectedSemesterAfter2002);
      }
    );
  });
});
