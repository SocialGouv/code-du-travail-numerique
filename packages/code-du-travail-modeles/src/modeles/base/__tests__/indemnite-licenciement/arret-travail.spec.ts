import {
  ARRET_DE_TRAVAIL,
  DATE_ARRET_DE_TRAVAIL,
  MotifKeys,
  SeniorityFactory,
  SupportedCc,
} from "../../../common";
import type { SalaryPeriods } from "../../../common";
import { IndemniteLicenciementPublicodes } from "../../../../publicodes";

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
}: {
  dateEntree: string;
  dateNotification: string;
  dateSortie: string;
  dateArretTravail?: string;
}) => ({
  absencePeriods: "[]",
  [ARRET_DE_TRAVAIL]: dateArretTravail ? "oui" : "non",
  [DATE_ARRET_DE_TRAVAIL]: dateArretTravail,
  "contrat salarié . indemnité de licenciement . date d'entrée": dateEntree,
  "contrat salarié . indemnité de licenciement . date de notification":
    dateNotification,
  "contrat salarié . indemnité de licenciement . date de sortie": dateSortie,
  "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
    "non",
  salaryPeriods: JSON.stringify(salaryPeriods(2000)),
});

describe("Arrêt de travail au moment du licenciement", () => {
  describe("Indemnité légale", () => {
    // 11 ans et 2 mois de contrat, dont 2 ans et 2 mois d'arrêt : 9 ans.
    const LICENCIEMENT = {
      dateEntree: "01/01/2015",
      dateNotification: "01/01/2026",
      dateSortie: "01/03/2026",
    };

    test("l'arrêt de travail en cours est retiré de l'ancienneté", () => {
      const engine = new IndemniteLicenciementPublicodes(
        modelsIndemniteLicenciement
      );
      // 1/4 × 2000 × 9
      const result = engine.calculate(
        situation({ ...LICENCIEMENT, dateArretTravail: "01/01/2024" })
      );
      expect(result).toResultBeEqual(4500, "€");
    });

    test("sans arrêt de travail, la même situation donne l'ancienneté complète", () => {
      const engine = new IndemniteLicenciementPublicodes(
        modelsIndemniteLicenciement
      );
      // 1/4 × 2000 × 10 + 1/3 × 2000 × (134/12 − 10)
      const result = engine.calculate(situation(LICENCIEMENT));
      expect(result).toResultBeEqual(5777.78, "€");
    });

    test("un arrêt de travail non confirmé (réponse « non ») est ignoré même si une date est fournie", () => {
      const engine = new IndemniteLicenciementPublicodes(
        modelsIndemniteLicenciement
      );
      const result = engine.calculate({
        ...situation(LICENCIEMENT),
        [DATE_ARRET_DE_TRAVAIL]: "01/01/2024",
      });
      expect(result).toResultBeEqual(5777.78, "€");
    });

    test("un arrêt de travail antérieur à la notification est retiré de l'ancienneté requise", () => {
      const engine = new IndemniteLicenciementPublicodes(
        modelsIndemniteLicenciement
      );
      // 11 mois à la notification, moins 6 mois d'arrêt : sous les 8 mois.
      const result = engine.calculate(
        situation({
          dateArretTravail: "01/06/2025",
          dateEntree: "01/01/2025",
          dateNotification: "01/12/2025",
          dateSortie: "01/02/2026",
        })
      );
      expect(result.type).toBe("ineligibility");
    });

    test("un arrêt de travail postérieur à la notification ne touche que l'ancienneté du calcul", () => {
      const engine = new IndemniteLicenciementPublicodes(
        modelsIndemniteLicenciement
      );
      // 13 mois de contrat moins 1 mois d'arrêt : 1/4 × 2000 × 12/12.
      const result = engine.calculate(
        situation({
          dateArretTravail: "01/01/2026",
          dateEntree: "01/01/2025",
          dateNotification: "01/12/2025",
          dateSortie: "01/02/2026",
        })
      );
      expect(result).toResultBeEqual(500, "€");
    });

    test("l'ancienneté estimée pendant la saisie retire aussi l'arrêt de travail", () => {
      const engine = new IndemniteLicenciementPublicodes(
        modelsIndemniteLicenciement
      );
      expect(
        engine.estimatedSeniority("01/01/2015", "01/03/2026", [], "01/01/2024")
          .value
      ).toBe(9);
      expect(
        engine.estimatedSeniority("01/01/2015", "01/03/2026").value
      ).toBeCloseTo(134 / 12);
    });
  });

  describe("Ancienneté conventionnelle", () => {
    const args = {
      [ARRET_DE_TRAVAIL]: "oui",
      [DATE_ARRET_DE_TRAVAIL]: "01/01/2024",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2015",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2026",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/03/2026",
    };
    const agreements = Object.values(SupportedCc).filter(
      (idcc) => idcc !== SupportedCc.default
    );

    test.each(agreements)(
      "%s : l'arrêt de travail suit le traitement de la maladie non professionnelle",
      (idcc) => {
        const seniority = new SeniorityFactory().create(idcc);
        const maladieNonPro = seniority
          .getMotifs()
          .find((motif) => motif.key === MotifKeys.maladieNonPro);

        const { absencePeriods } = seniority.mapSituation(args);
        const { absencePeriods: requiredAbsencePeriods } =
          seniority.mapRequiredSituation(args);

        if (!maladieNonPro) {
          // Cette convention n'exclut pas la maladie non professionnelle :
          // l'arrêt n'a pas d'effet.
          expect(absencePeriods).toEqual([]);
          expect(requiredAbsencePeriods).toEqual([]);
          return;
        }
        expect(absencePeriods).toEqual([
          expect.objectContaining({
            durationInMonth: 26,
            motif: expect.objectContaining({
              key: MotifKeys.maladieNonPro,
              value: maladieNonPro.value,
            }),
            startedAt: "01/01/2024",
          }),
        ]);
        expect(requiredAbsencePeriods).toEqual([
          expect.objectContaining({ durationInMonth: 24 }),
        ]);
      }
    );
  });
});
