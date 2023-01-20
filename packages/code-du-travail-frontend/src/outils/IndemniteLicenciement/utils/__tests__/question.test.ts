import { OuiNon } from "../../common";
import {
  generateResultSalaireTempsPlein,
  generateResultSameSalary,
  generateSalaireTempsPleinQuestion,
  generateSameSalaryQuestion,
} from "../question";

describe("question.ts", () => {
  describe("generateSameSalaryQuestion", () => {
    it.each([
      [
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Le salaire mensuel brut a-t-il été le même pour le mois précédant la notification du licenciement&nbsp;?",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Le salaire mensuel brut a-t-il été le même pour le mois précédant l'arrêt de travail&nbsp;?",
      ],
      [
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Le salaire mensuel brut a-t-il été le même durant les 2 derniers mois précédant la notification du licenciement&nbsp;?",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Le salaire mensuel brut a-t-il été le même durant les 3 derniers mois précédant l'arrêt de travail&nbsp;?",
      ],
    ])(
      "should return the correct question",
      (arretTravail, salaryPeriods, expected) => {
        expect(generateSameSalaryQuestion(arretTravail, salaryPeriods)).toBe(
          expected
        );
      }
    );
  });

  describe("generateSalaireTempsPleinQuestion", () => {
    it.each([
      [
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut du dernier mois et primes du dernier mois précédant la notification du licenciement",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut du dernier mois et primes du dernier mois précédant l'arrêt de travail",
      ],
      [
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Salaire mensuel brut des 2 derniers mois et primes des 2 derniers mois précédant la notification du licenciement",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Salaire mensuel brut des 3 derniers mois et primes des 3 derniers mois précédant l'arrêt de travail",
      ],
    ])(
      "should return the correct question",
      (arretTravail, salaryPeriods, expected) => {
        expect(
          generateSalaireTempsPleinQuestion(arretTravail, salaryPeriods)
        ).toBe(expected);
      }
    );
  });

  describe("generateResultSameSalary", () => {
    it.each([
      [
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut identique précédant la notification du licenciement",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut identique précédant l'arrêt de travail",
      ],
      [
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Salaire mensuel brut identique durant les 2 derniers mois précédant la notification du licenciement",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Salaire mensuel brut identique durant les 3 derniers mois précédant l'arrêt de travail",
      ],
    ])(
      "should return the correct result",
      (arretTravail, salaryPeriods, expected) => {
        expect(generateResultSameSalary(arretTravail, salaryPeriods)).toBe(
          expected
        );
      }
    );
  });

  describe("generateResultSalaireTempsPlein", () => {
    it.each([
      [
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut perçu le dernier mois précédant la notification du licenciement",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut perçu le dernier mois précédant l'arrêt de travail",
      ],
      [
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Salaires mensuels bruts perçus au cours des 2 derniers mois précédant la notification du licenciement",
      ],
      [
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Salaires mensuels bruts perçus au cours des 3 derniers mois précédant l'arrêt de travail",
      ],
    ])(
      "should return the correct result",
      (arretTravail, salaryPeriods, expected) => {
        expect(
          generateResultSalaireTempsPlein(arretTravail, salaryPeriods)
        ).toBe(expected);
      }
    );
  });
});
