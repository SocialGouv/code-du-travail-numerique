import {
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("CC 1518", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ${"01/01/2020"} | ${"01/01/2021"} | ${1}
      ${[{ motif: "Absence pour maladie non professionnelle" }, { motif: "Arrêt maladie lié à un accident de trajet" }, { motif: "Congé sabbatique" }, { motif: "Congé pour création d'entreprise" }, { motif: "Congé parental d'éducation" }, { motif: "Congés sans solde" }, { motif: "Grève" }, { motif: "Mise à pied" }, { motif: "Congé de paternité" }]}                                                                                                                                                                                     | ${"20/03/2020"} | ${"20/03/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: "Absence pour maladie non professionnelle" }, { durationInMonth: 1, motif: "Arrêt maladie lié à un accident de trajet" }, { durationInMonth: 1, motif: "Congé sabbatique" }, { durationInMonth: 1, motif: "Congé pour création d'entreprise" }, { durationInMonth: 1, motif: "Congé parental d'éducation" }, { durationInMonth: 1, motif: "Congés sans solde" }, { durationInMonth: 1, motif: "Grève" }, { durationInMonth: 1, motif: "Mise à pied" }, { durationInMonth: 1, motif: "Congé de paternité" }]} | ${"01/02/2020"} | ${"01/02/2022"} | ${1.3333333333333335}
      ${[{ durationInMonth: 2, motif: "Congé parental d'éducation" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC1518
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
