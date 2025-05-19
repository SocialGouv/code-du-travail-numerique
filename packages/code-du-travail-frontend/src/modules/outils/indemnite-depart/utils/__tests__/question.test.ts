import { OuiNon } from "../../common";
import {
  generateResultSalaireTempsPlein,
  generateResultSameSalary,
  generateSalaireTempsPleinQuestion,
  generateSameSalaryQuestion,
  generateSameSalaryQuestionSubLabel,
} from "../question";
import { IndemniteDepartType } from "../../types";

describe("question.ts", () => {
  describe("generateSameSalaryQuestion", () => {
    it.each([
      [
        IndemniteDepartType.LICENCIEMENT,
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Le salaire mensuel brut a-t-il été le même pour le mois précédant la notification du licenciement&nbsp;?",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Le salaire mensuel brut a-t-il été le même pour le mois précédant l'arrêt de travail&nbsp;?",
      ],
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Le salaire mensuel brut a-t-il été le même durant les 2 derniers mois précédant la fin du contrat&nbsp;?",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Le salaire mensuel brut a-t-il été le même durant les 3 derniers mois précédant l'arrêt de travail&nbsp;?",
      ],
    ])(
      "should return the correct question",
      (type, arretTravail, salaryPeriods, expected) => {
        expect(
          generateSameSalaryQuestion(type, arretTravail, salaryPeriods)
        ).toBe(expected);
      }
    );
  });

  describe("generateSalaireTempsPleinQuestion", () => {
    it.each([
      [
        IndemniteDepartType.LICENCIEMENT,
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut du dernier mois et primes du dernier mois précédant la notification du licenciement",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut du dernier mois et primes du dernier mois précédant l'arrêt de travail",
      ],
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Salaires mensuels bruts des 2 derniers mois et primes des 2 derniers mois précédant la fin du contrat",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Salaires mensuels bruts des 3 derniers mois et primes des 3 derniers mois précédant l'arrêt de travail",
      ],
    ])(
      "should return the correct question",
      (type, arretTravail, salaryPeriods, expected) => {
        expect(
          generateSalaireTempsPleinQuestion(type, arretTravail, salaryPeriods)
        ).toBe(expected);
      }
    );
  });

  describe("generateResultSameSalary", () => {
    it.each([
      [
        IndemniteDepartType.LICENCIEMENT,
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut identique précédant la notification du licenciement",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut identique précédant l'arrêt de travail",
      ],
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Salaire mensuel brut identique durant les 2 derniers mois précédant la fin du contrat",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Salaire mensuel brut identique durant les 3 derniers mois précédant l'arrêt de travail",
      ],
    ])(
      "should return the correct result",
      (type, arretTravail, salaryPeriods, expected) => {
        expect(
          generateResultSameSalary(type, arretTravail, salaryPeriods)
        ).toBe(expected);
      }
    );
  });

  describe("generateResultSalaireTempsPlein", () => {
    it.each([
      [
        IndemniteDepartType.LICENCIEMENT,
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut perçu le dernier mois précédant la notification du licenciement",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }],
        "Salaire mensuel brut perçu le dernier mois précédant l'arrêt de travail",
      ],
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }],
        "Salaires mensuels bruts perçus au cours des 2 derniers mois précédant la fin du contrat",
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "oui" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Salaires mensuels bruts perçus au cours des 3 derniers mois précédant l'arrêt de travail",
      ],
    ])(
      "should return the correct result",
      (type, arretTravail, salaryPeriods, expected) => {
        expect(
          generateResultSalaireTempsPlein(type, arretTravail, salaryPeriods)
        ).toBe(expected);
      }
    );
  });

  describe("generateSameSalaryQuestionSubLabel", () => {
    it.each([
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        "non" as OuiNon,
        [{ month: "janvier" }],
        "Pour l'estimation, vous pouvez saisir les derniers mois connus avant la demande d'homologation. Attention, l'indemnité versée devra être calculée sur le mois précédant la rupture du contrat.",
      ],
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        "non" as OuiNon,
        [{ month: "janvier" }, { month: "février" }, { month: "mars" }],
        "Pour l'estimation, vous pouvez saisir les derniers mois connus avant la demande d'homologation. Attention, l'indemnité versée devra être calculée sur les 3 mois précédant la rupture du contrat.",
      ],
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        undefined,
        [{ month: "janvier" }, { month: "février" }],
        "Pour l'estimation, vous pouvez saisir les derniers mois connus avant la demande d'homologation. Attention, l'indemnité versée devra être calculée sur les 2 mois précédant la rupture du contrat.",
      ],
      [
        IndemniteDepartType.RUPTURE_CONVENTIONNELLE,
        "oui" as OuiNon,
        [{ month: "janvier" }],
        undefined,
      ],
      [
        IndemniteDepartType.LICENCIEMENT,
        "non" as OuiNon,
        [{ month: "janvier" }],
        undefined,
      ],
    ])(
      "should return the correct subLabel for type %s, arretTravail %s, and salaryPeriods with %i month(s)",
      (type, arretTravail, salaryPeriods, expected) => {
        expect(
          generateSameSalaryQuestionSubLabel(type, arretTravail, salaryPeriods)
        ).toBe(expected);
      }
    );
  });
});
