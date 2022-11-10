import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 16", () => {
  describe("Calcul de l'ancienneté pour un non cadre", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ${"20/02/2020"} | ${"20/02/2021"} | ${1 - 1 / 12}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
          isExecutive: false,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté pour un cadre", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | entryDate       | exitDate        | becameExecutiveAt | expectedAnciennete | expectedExtras
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ${"20/02/2020"} | ${"20/02/2021"} | ${undefined}      | ${1}               | ${undefined}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${undefined}      | ${1}               | ${undefined}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 0, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 0, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 0, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, { durationInMonth: 0, motif: { key: MotifKeys.miseAPied } }, { durationInMonth: 0, motif: { key: MotifKeys.congesPaternite } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${undefined}      | ${1}               | ${undefined}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ${"20/02/2020"} | ${"20/02/2021"} | ${undefined}      | ${1 - 1 / 12}      | ${undefined}
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1}               | ${{ "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": 1 }}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde }, startedAt: "01/05/2020" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1}               | ${{ "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": 1 - 1 / 12 }}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde }, startedAt: "01/05/2021" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ${"01/01/2020"} | ${"01/01/2022"} | ${"01/01/2021"}   | ${1 - 1 / 12}      | ${{ "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": 1 }}
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ${"01/01/2012"} | ${"01/01/2022"} | ${"01/01/2000"}   | ${10}              | ${{ "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": 0 }}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({
        absences,
        entryDate,
        exitDate,
        becameExecutiveAt,
        expectedAnciennete,
        expectedExtras,
      }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          becameExecutiveAt,
          dateEntree: entryDate,
          dateSortie: exitDate,
          isExecutive: true,
        });

        expect(result.value).toEqual(expectedAnciennete);
        expect(result.extraInfos).toEqual(expectedExtras);
      }
    );
  });
});
