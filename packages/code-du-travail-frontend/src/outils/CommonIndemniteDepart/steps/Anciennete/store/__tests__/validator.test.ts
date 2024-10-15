import { MotifKeys } from "@socialgouv/modeles-social";
import { validateStep } from "../validator";

describe("Ancienneté store", () => {
  describe("Absence", () => {
    it("doit retourner une erreur si la durée de l'absence est vide", () => {
      const result = validateStep(
        {
          dateEntree: "01/01/2020",
          dateSortie: "01/03/2022",
          dateNotification: "01/01/2022",
          motifs: [],
          absencePeriods: [
            {
              motif: {
                label: "",
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
            },
          ],
          hasAbsenceProlonge: "oui",
        },
        {},
        {
          publicodesInformations: [],
          isStepHidden: false,
          isStepSalaryHidden: false,
          hasNoMissingQuestions: true,
          informationError: false,
        }
      );
      expect(result.isValid).toBe(false);
      expect(result.errorState.errorAbsencePeriods?.absences).toStrictEqual([
        {
          errorDate: undefined,
          errorDuration: "Veuillez saisir la durée de l'absence",
        },
      ]);
    });

    it("doit retourner une erreur si la date de l'absence est vide", () => {
      const result = validateStep(
        {
          dateEntree: "01/01/2020",
          dateSortie: "01/03/2022",
          dateNotification: "01/01/2022",
          motifs: [],
          absencePeriods: [
            {
              motif: {
                label: "",
                startAt: () => true,
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
              durationInMonth: 2,
            },
          ],
          hasAbsenceProlonge: "oui",
        },
        {},
        {
          publicodesInformations: [],
          isStepHidden: false,
          isStepSalaryHidden: false,
          hasNoMissingQuestions: true,
          informationError: false,
        }
      );
      expect(result.isValid).toBe(false);
      expect(result.errorState.errorAbsencePeriods?.absences).toStrictEqual([
        {
          errorDate: "Veuillez saisir la date de l'absence",
          errorDuration: undefined,
        },
      ]);
    });

    it("doit retourner une erreur si la date de l'absence est avant la date de l'embauche", () => {
      const result = validateStep(
        {
          dateEntree: "01/01/2020",
          dateSortie: "01/03/2022",
          dateNotification: "01/01/2022",
          motifs: [],
          absencePeriods: [
            {
              motif: {
                label: "",
                startAt: () => true,
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
              startedAt: "01/01/2019",
              durationInMonth: 2,
            },
          ],
          hasAbsenceProlonge: "oui",
        },
        {},
        {
          publicodesInformations: [],
          isStepHidden: false,
          isStepSalaryHidden: false,
          hasNoMissingQuestions: true,
          informationError: false,
        }
      );
      expect(result.isValid).toBe(false);
      expect(result.errorState.errorAbsencePeriods?.absences).toStrictEqual([
        {
          errorDate:
            "La date de l'absence doit être comprise entre le 01/01/2020 et le 01/03/2022 (dates de début et de fin de contrat)",
        },
      ]);
    });

    it("ne doit pas retourner d'erreur si l'absence est bien remplie", () => {
      const result = validateStep(
        {
          dateEntree: "01/01/2020",
          dateSortie: "01/03/2022",
          dateNotification: "01/01/2022",
          motifs: [],
          absencePeriods: [
            {
              motif: {
                label: "",
                startAt: () => true,
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
              startedAt: "01/01/2021",
              durationInMonth: 2,
            },
          ],
          hasAbsenceProlonge: "oui",
        },
        {},
        {
          publicodesInformations: [],
          isStepHidden: false,
          isStepSalaryHidden: false,
          hasNoMissingQuestions: true,
          informationError: false,
        }
      );
      expect(result.isValid).toBe(true);
      expect(result.errorState.errorAbsencePeriods?.absences).toBe(undefined);
    });
  });

  describe("Date arrêt de travail", () => {
    it("doit retourner une erreur si la date d'arrêt de travail est avant la date de l'embauche", () => {
      const result = validateStep(
        {
          dateEntree: "01/01/2020",
          dateSortie: "01/03/2022",
          dateNotification: "01/01/2022",
          motifs: [],
          absencePeriods: [
            {
              motif: {
                label: "",
                startAt: () => true,
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
              startedAt: "01/01/2021",
              durationInMonth: 2,
            },
          ],
          hasAbsenceProlonge: "oui",
        },
        {
          dateArretTravail: "01/01/2019",
          arretTravail: "oui",
        },
        {
          publicodesInformations: [],
          isStepHidden: false,
          isStepSalaryHidden: false,
          hasNoMissingQuestions: true,
          informationError: false,
        }
      );
      expect(result.isValid).toBe(false);
      expect(result.errorState.errorDateEntree).toStrictEqual(
        "La date de début de contrat doit se situer avant la date d'arrêt de travail indiquée à l'étape n°2"
      );
    });

    it("doit retourner une erreur si la date d'arrêt de travail est après la date de fin de contrat", () => {
      const result = validateStep(
        {
          dateEntree: "01/01/2020",
          dateSortie: "01/03/2022",
          dateNotification: "01/01/2022",
          motifs: [],
          absencePeriods: [
            {
              motif: {
                label: "",
                startAt: () => true,
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
              startedAt: "01/01/2021",
              durationInMonth: 2,
            },
          ],
          hasAbsenceProlonge: "oui",
        },
        {
          dateArretTravail: "01/01/2023",
          arretTravail: "oui",
        },
        {
          publicodesInformations: [],
          isStepHidden: false,
          isStepSalaryHidden: false,
          hasNoMissingQuestions: true,
          informationError: false,
        }
      );
      expect(result.isValid).toBe(false);
      expect(result.errorState.errorDateSortie).toStrictEqual(
        "La date de fin de contrat doit se situer après la date d'arrêt de travail indiquée à l'étape n°2"
      );
    });
    it("ne doit retourner d'erreur si la date d'arrêt de travail est après la date de fin de contrat mais que l'utilisateur à coché non sur à la question arrêt de travail", () => {
      const result = validateStep(
        {
          dateEntree: "01/01/2020",
          dateSortie: "01/03/2022",
          dateNotification: "01/01/2022",
          motifs: [],
          absencePeriods: [
            {
              motif: {
                label: "",
                startAt: () => true,
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
              startedAt: "01/01/2021",
              durationInMonth: 2,
            },
          ],
          hasAbsenceProlonge: "oui",
        },
        {
          dateArretTravail: "01/01/2023",
          arretTravail: "non",
        },
        {
          publicodesInformations: [],
          isStepHidden: false,
          isStepSalaryHidden: false,
          hasNoMissingQuestions: true,
          informationError: false,
        }
      );
      expect(result.isValid).toBe(true);
    });
  });

  it("ne doit pas retourner une erreur sur l'absence si la date de l'embauche est après la date de sortie", () => {
    const result = validateStep(
      {
        dateEntree: "01/01/2020",
        dateSortie: "01/03/2019",
        dateNotification: "01/01/2019",
        motifs: [],
        absencePeriods: [
          {
            motif: {
              label: "",
              startAt: () => true,
              key: MotifKeys.maladieNonPro,
              value: 1,
            },
            startedAt: "01/01/2021",
            durationInMonth: 2,
          },
        ],
        hasAbsenceProlonge: "oui",
      },
      {},
      {
        publicodesInformations: [],
        isStepHidden: false,
        isStepSalaryHidden: false,
        hasNoMissingQuestions: true,
        informationError: false,
      }
    );
    expect(result.isValid).toBe(false);
    expect(result.errorState.errorAbsencePeriods?.absences).toStrictEqual(
      undefined
    );
  });

  it("date de notification invalide", () => {
    const result = validateStep(
      {
        dateEntree: "01/01/2020",
        dateSortie: "01/03/2024",
        dateNotification: "01/01/72024",
        motifs: [],
        absencePeriods: [],
        hasAbsenceProlonge: "non",
      },
      {},
      {
        publicodesInformations: [],
        isStepHidden: false,
        isStepSalaryHidden: false,
        hasNoMissingQuestions: true,
        informationError: false,
      }
    );
    expect(result.isValid).toBe(false);
    expect(result.errorState.errorDateNotification).toEqual(
      "La date de notification est invalide"
    );
  });
});
