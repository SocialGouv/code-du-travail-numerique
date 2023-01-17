import {
  generateSalaireTempsPleinQuestion,
  generateSameSalaryQuestion,
} from "../utils";
import { OuiNon } from "../../../../common";

describe("generateSameSalaryQuestion", () => {
  it.each([
    [
      "non" as OuiNon,
      [{ month: "janvier" }],
      "Le salaire mensuel brut a-t-il été le même pour le mois précédant la notification du licenciement ?",
    ],
    [
      "oui" as OuiNon,
      [{ month: "janvier" }],
      "Le salaire mensuel brut a-t-il été le même pour le mois précédant l'arrêt de travail ?",
    ],
    [
      "non" as OuiNon,
      [{ month: "janvier" }, { month: "février" }],
      "Le salaire mensuel brut a-t-il été le même durant les 2 derniers mois précédant la notification du licenciement ?",
    ],
    [
      "oui" as OuiNon,
      [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
      "Le salaire mensuel brut a-t-il été le même durant les 3 derniers mois précédant l'arrêt de travail ?",
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
