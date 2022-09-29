import { MotifKeys } from "@socialgouv/modeles-social";
import { validateStep } from "../validator";

describe("Ancienneté store", () => {
  it("doit retourner une erreur si la durée de l'absence est vide", () => {
    const result = validateStep({
      dateEntree: "01/01/2020",
      dateSortie: "01/03/2022",
      dateNotification: "01/01/2022",
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
    });
    expect(result.isValid).toBe(false);
    expect(result.errorState.errorAbsencePeriods?.absences).toStrictEqual([
      {
        errorDate: undefined,
        errorDuration: "Veuillez saisir la durée de l'absence",
      },
    ]);
  });

  it("doit retourner une erreur si la date de l'absence est vide", () => {
    const result = validateStep({
      dateEntree: "01/01/2020",
      dateSortie: "01/03/2022",
      dateNotification: "01/01/2022",
      absencePeriods: [
        {
          motif: {
            label: "",
            startAt: true,
            key: MotifKeys.maladieNonPro,
            value: 1,
          },
          durationInMonth: 2,
        },
      ],
      hasAbsenceProlonge: "oui",
    });
    expect(result.isValid).toBe(false);
    expect(result.errorState.errorAbsencePeriods?.absences).toStrictEqual([
      {
        errorDate: "Veuillez saisir la date de l'absence",
        errorDuration: undefined,
      },
    ]);
  });

  it("doit retourner une erreur si la date de l'absence est avant la date de l'embauche", () => {
    const result = validateStep({
      dateEntree: "01/01/2020",
      dateSortie: "01/03/2022",
      dateNotification: "01/01/2022",
      absencePeriods: [
        {
          motif: {
            label: "",
            startAt: true,
            key: MotifKeys.maladieNonPro,
            value: 1,
          },
          startedAt: "01/01/2019",
          durationInMonth: 2,
        },
      ],
      hasAbsenceProlonge: "oui",
    });
    expect(result.isValid).toBe(false);
    expect(result.errorState.errorAbsencePeriods?.absences).toStrictEqual([
      {
        errorDate:
          "La date de l'absence doit être comprise entre le 01/01/2020 et le 01/03/2022 (date d'entrée et de sortie de l'entreprise))",
      },
    ]);
  });

  it("ne doit pas retourner d'erreur si l'absence est bien remplie", () => {
    const result = validateStep({
      dateEntree: "01/01/2020",
      dateSortie: "01/03/2022",
      dateNotification: "01/01/2022",
      absencePeriods: [
        {
          motif: {
            label: "",
            startAt: true,
            key: MotifKeys.maladieNonPro,
            value: 1,
          },
          startedAt: "01/01/2021",
          durationInMonth: 2,
        },
      ],
      hasAbsenceProlonge: "oui",
    });
    expect(result.isValid).toBe(true);
    expect(result.errorState.errorAbsencePeriods?.absences).toBe(undefined);
  });
});
