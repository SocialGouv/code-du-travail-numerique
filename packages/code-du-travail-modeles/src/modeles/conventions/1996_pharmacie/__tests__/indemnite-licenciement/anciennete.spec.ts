import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 1996", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      testCase                    | absences                                                                                                                                                                                                                                                                                                                                                                                                                                  | entryDate       | exitDate        | expectedAnciennete
      ${"no absence"}             | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"absence with no values"} | ${[{ motif: { key: MotifKeys.maladieNonPro } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducation } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }, { motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"congé parternité ignoré"} | ${[{
    durationInMonth: 2,
    motif: { key: MotifKeys.congesPaternite },
  }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"maladie pro moins de 6 mois"} | ${[{
    durationInMonth: 3,
    motif: { key: MotifKeys.maladieNonPro },
    startedAt: "01/09/2021",
  }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"maladie pro plus de 6 mois mais sur 2 ans"} | ${[{
    durationInMonth: 8,
    motif: { key: MotifKeys.maladieNonPro },
    startedAt: "01/09/2020",
  }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"maladie pro plus de 6 mois sur la même année"} | ${[{
    durationInMonth: 8,
    motif: { key: MotifKeys.maladieNonPro },
    startedAt: "01/03/2020",
  }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${1.8333333333333333}
      ${"2 maladies pro moins de 6 mois sur 2 années distinctes"} | ${[{
    durationInMonth: 4,
    motif: { key: MotifKeys.maladieNonPro },
    startedAt: "01/03/2020",
  }, {
    durationInMonth: 4,
    motif: { key: MotifKeys.maladieNonPro },
    startedAt: "01/03/2021",
  }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${2}
      ${"2 maladies pro moins de 6 mois mais plus de 6 sur une année"} | ${[{
    durationInMonth: 4,
    motif: { key: MotifKeys.maladieNonPro },
    startedAt: "01/01/2021",
  }, {
    durationInMonth: 4,
    motif: { key: MotifKeys.maladieNonPro },
    startedAt: "01/05/2021",
  }]} | ${"20/02/2020"} | ${"20/02/2022"} | ${1.8333333333333333}
    `(
      "Calcul de l'ancienneté avec $testCase a pour résultat $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC1996
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
