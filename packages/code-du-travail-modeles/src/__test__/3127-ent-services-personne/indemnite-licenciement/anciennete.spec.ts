import {
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("CC 3127", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ motif: "Absence pour maladie non professionnelle" }, { motif: "Arrêt maladie lié à un accident de trajet" }, { motif: "Congé sabbatique" }, { motif: "Congé pour création d'entreprise" }, { motif: "Congé parental d'éducation" }, { motif: "Congés sans solde" }, { motif: "Grève" }, { motif: "Mise à pied" }, { motif: "Congé de paternité" }]}                                                                                                                                                                                     | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: "Absence pour maladie non professionnelle" }, { durationInMonth: 0, motif: "Arrêt maladie lié à un accident de trajet" }, { durationInMonth: 0, motif: "Congé sabbatique" }, { durationInMonth: 0, motif: "Congé pour création d'entreprise" }, { durationInMonth: 0, motif: "Congé parental d'éducation" }, { durationInMonth: 0, motif: "Congés sans solde" }, { durationInMonth: 0, motif: "Grève" }, { durationInMonth: 0, motif: "Mise à pied" }, { durationInMonth: 0, motif: "Congé de paternité" }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: "Absence pour maladie non professionnelle" }, { durationInMonth: 0, motif: "Arrêt maladie lié à un accident de trajet" }, { durationInMonth: 0, motif: "Congé sabbatique" }, { durationInMonth: 0, motif: "Congé pour création d'entreprise" }, { durationInMonth: 0, motif: "Congé parental d'éducation" }, { durationInMonth: 0, motif: "Congés sans solde" }, { durationInMonth: 0, motif: "Grève" }, { durationInMonth: 0, motif: "Mise à pied" }, { durationInMonth: 0, motif: "Congé de paternité" }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC3127
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
