import { ARRET_DE_TRAVAIL, DATE_ARRET_DE_TRAVAIL } from "../../../common";
import type { SalaryPeriods } from "../../../common";
import { RuptureConventionnellePublicodes } from "../../../../publicodes";

const salaryPeriods = (value: number): SalaryPeriods[] =>
  Array.from({ length: 12 }, (_, index) => ({
    month: `${index}`,
    value,
  }));

// 10 mois de contrat, dont 3 mois d'arrêt de travail.
const situation = (dateArretTravail?: string) => ({
  absencePeriods: "[]",
  [ARRET_DE_TRAVAIL]: dateArretTravail ? "oui" : "non",
  [DATE_ARRET_DE_TRAVAIL]: dateArretTravail,
  "contrat salarié . indemnité de licenciement . date d'entrée": "01/03/2024",
  "contrat salarié . indemnité de licenciement . date de notification":
    "01/01/2025",
  "contrat salarié . indemnité de licenciement . date de sortie": "01/01/2025",
  "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
    "non",
  salaryPeriods: JSON.stringify(salaryPeriods(3000)),
});

describe("Arrêt de travail au moment de la rupture conventionnelle", () => {
  test("l'arrêt de travail en cours est retiré de l'ancienneté", () => {
    const engine = new RuptureConventionnellePublicodes(
      modelsRuptureConventionnel
    );
    // 1/4 × 3000 × 7/12
    expect(engine.calculate(situation("01/10/2024"))).toResultBeEqual(
      437.5,
      "€"
    );
  });

  test("sans arrêt de travail, l'ancienneté est complète", () => {
    const engine = new RuptureConventionnellePublicodes(
      modelsRuptureConventionnel
    );
    // 1/4 × 3000 × 10/12
    expect(engine.calculate(situation())).toResultBeEqual(625, "€");
  });
});
