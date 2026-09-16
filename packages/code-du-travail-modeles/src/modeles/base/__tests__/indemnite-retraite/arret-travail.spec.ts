import { IndemniteRetraitePublicodes } from "../../../../publicodes";
import type { SalaryPeriods } from "../../../common";

const MISE_A_LA_RETRAITE =
  "contrat salarié . indemnité de retraite . mise à la retraite";
const ARRET_DE_TRAVAIL =
  "contrat salarié . indemnité de licenciement . arrêt de travail";
const DATE_ARRET_DE_TRAVAIL =
  "contrat salarié . indemnité de licenciement . date d'arrêt de travail";

const salaryPeriods = (value: number): SalaryPeriods[] =>
  Array.from({ length: 12 }, (_, index) => ({
    month: `${index}`,
    value,
  }));

const situation = ({
  dateEntree,
  dateNotification,
  dateSortie,
  dateArretTravail,
  miseALaRetraite = "non",
}: {
  dateEntree: string;
  dateNotification: string;
  dateSortie: string;
  dateArretTravail?: string;
  miseALaRetraite?: "non" | "oui";
}) => ({
  absencePeriods: "[]",
  [ARRET_DE_TRAVAIL]: dateArretTravail ? "oui" : "non",
  [DATE_ARRET_DE_TRAVAIL]: dateArretTravail,
  [MISE_A_LA_RETRAITE]: miseALaRetraite,
  "contrat salarié . indemnité de licenciement . date d'entrée": dateEntree,
  "contrat salarié . indemnité de licenciement . date de notification":
    dateNotification,
  "contrat salarié . indemnité de licenciement . date de sortie": dateSortie,
  "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
    "non",
  salaryPeriods: JSON.stringify(salaryPeriods(2000)),
});

/**
 * Cas de référence : 11 ans et 2 mois de contrat (01/01/2015 → 01/03/2026),
 * dont 2 ans et 2 mois d'arrêt de travail depuis le 01/01/2024. L'arrêt retiré,
 * il reste 9 ans : moins que les 10 ans du barème de l'art. D1237-1.
 */
const DEPART_VOLONTAIRE = {
  dateEntree: "01/01/2015",
  dateNotification: "01/01/2026",
  dateSortie: "01/03/2026",
};

describe("Arrêt de travail au moment du départ ou de la mise à la retraite", () => {
  describe("Départ volontaire", () => {
    test("l'arrêt de travail en cours est retiré de l'ancienneté et fait passer sous les 10 ans", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const result = engine.calculate(
        situation({ ...DEPART_VOLONTAIRE, dateArretTravail: "01/01/2024" })
      );
      expect(result.type).toBe("ineligibility");
      expect(result).toIneligibilityContain("inférieure à 10 ans");
    });

    test("sans arrêt de travail, la même situation ouvre droit à un demi-mois de salaire", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const result = engine.calculate(situation(DEPART_VOLONTAIRE));
      expect(result).toResultBeEqual(1000, "€");
    });

    test("un arrêt de travail non confirmé (réponse « non ») est ignoré même si une date est fournie", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const result = engine.calculate({
        ...situation(DEPART_VOLONTAIRE),
        [DATE_ARRET_DE_TRAVAIL]: "01/01/2024",
      });
      expect(result).toResultBeEqual(1000, "€");
    });

    test("l'arrêt de travail peut faire changer de tranche du barème sans rendre inéligible", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      // 16 ans et 2 mois de contrat : 1 mois de salaire. L'arrêt de 2 ans et
      // 2 mois retiré, 14 ans : un demi-mois.
      const base = { ...DEPART_VOLONTAIRE, dateEntree: "01/01/2010" };
      expect(engine.calculate(situation(base))).toResultBeEqual(2000, "€");
      expect(
        engine.calculate(situation({ ...base, dateArretTravail: "01/01/2024" }))
      ).toResultBeEqual(1000, "€");
    });

    test("l'arrêt de travail s'ajoute aux absences saisies", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      // 10 ans et 2 mois de contrat, arrêt d'un mois : encore 10 ans et 1 mois.
      // Une absence d'un mois de plus passe sous le seuil.
      const base = {
        ...DEPART_VOLONTAIRE,
        dateArretTravail: "01/02/2026",
        dateEntree: "01/01/2016",
      };
      expect(engine.calculate(situation(base))).toResultBeEqual(1000, "€");
      const result = engine.calculate({
        ...situation(base),
        absencePeriods: JSON.stringify([
          { durationInMonth: 2, motif: { key: "absenceCongesSansSolde" } },
        ]),
      });
      expect(result.type).toBe("ineligibility");
    });
  });

  describe("Mise à la retraite", () => {
    // 11 mois de contrat à la date de notification.
    const MISE_A_LA_RETRAITE_SITUATION = {
      dateEntree: "01/01/2025",
      dateNotification: "01/12/2025",
      dateSortie: "01/02/2026",
      miseALaRetraite: "oui" as const,
    };

    test("un arrêt de travail antérieur à la notification est retiré de l'ancienneté requise", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      // 6 mois d'arrêt retirés : 5 mois d'ancienneté requise, sous le seuil.
      const result = engine.calculate(
        situation({
          ...MISE_A_LA_RETRAITE_SITUATION,
          dateArretTravail: "01/06/2025",
        })
      );
      expect(result.type).toBe("ineligibility");
      expect(result).toIneligibilityContain("inférieure à 8 mois");
    });

    test("un arrêt de travail postérieur à la notification ne touche que l'ancienneté du calcul", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      // 13 mois de contrat moins 1 mois d'arrêt (01/01/2026 → 01/02/2026) :
      // 1/4 × 2000 × 12/12.
      const result = engine.calculate(
        situation({
          ...MISE_A_LA_RETRAITE_SITUATION,
          dateArretTravail: "01/01/2026",
        })
      );
      expect(result).toResultBeEqual(500, "€");
    });

    test("sans arrêt de travail, la même situation ouvre droit à l'indemnité", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      // 13 mois de contrat : 1/4 × 2000 × 13/12.
      const result = engine.calculate(situation(MISE_A_LA_RETRAITE_SITUATION));
      expect(result).toResultBeEqual(541.67, "€");
    });
  });

  describe("Ancienneté estimée affichée pendant la saisie", () => {
    test("retire l'arrêt de travail pour la retraite", () => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      expect(
        engine.estimatedSeniority("01/01/2015", "01/03/2026", [], "01/01/2024")
          .value
      ).toBe(9);
      expect(
        engine.estimatedSeniority("01/01/2015", "01/03/2026").value
      ).toBeCloseTo(134 / 12);
    });
  });
});
