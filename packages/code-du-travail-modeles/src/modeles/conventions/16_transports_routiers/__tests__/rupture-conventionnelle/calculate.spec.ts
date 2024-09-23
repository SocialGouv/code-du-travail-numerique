import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "16"
);

describe("Gestion des multiples types de licenciement pour la CC 16", () => {
  describe("Catégorie pro : Ouvriers ne doit pas demander le type de licenciement", () => {
    test("Demande l'age de l'ouvrier", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle": `'Ouvriers'`,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . ouvrier age"
      );
    });

    test("Ne demande pas d'informations supplémentaires si l'age est renseigné", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle": `'Ouvriers'`,
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . ouvrier age":
          "40",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(null);
    });

    test("Demande s'il a le droit à la retraitre si l'age est supérieur ou égal à 60", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle": `'Ouvriers'`,
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . ouvrier age":
          "60",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . autres licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise"
      );
    });
  });

  describe("[Ouvriers] Autres licenciements", () => {
    test("En comparant avec les autres types qui sont calculés également", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle": `'Ouvriers'`,
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . ouvrier age":
          "56",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2020",
        "contrat salarié . indemnité de licenciement . date de notification":
          "15/01/2023",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "15/01/2023",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2600},{"month":"novembre 2024","value":2600},{"month":"octobre 2024","value":2600},{"month":"septembre 2024","value":2600},{"month":"août 2024","value":2600},{"month":"juillet 2024","value":2600},{"month":"juin 2024","value":2600},{"month":"mai 2024","value":2600},{"month":"avril 2024","value":2600},{"month":"mars 2024","value":2600},{"month":"février 2024","value":2600},{"month":"janvier 2024","value":2600}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(1560, "€");
    });

    test("Les autres types ne sont pas calculés car n'a pas le minimum d'ancienneté requis", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle": `'Ouvriers'`,
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . ouvrier age":
          "56",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2020",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2022",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2022",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2600},{"month":"novembre 2024","value":2600},{"month":"octobre 2024","value":2600},{"month":"septembre 2024","value":2600},{"month":"août 2024","value":2600},{"month":"juillet 2024","value":2600},{"month":"juin 2024","value":2600},{"month":"mai 2024","value":2600},{"month":"avril 2024","value":2600},{"month":"mars 2024","value":2600},{"month":"février 2024","value":2600},{"month":"janvier 2024","value":2600}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(520, "€");
    });
  });

  describe("[Ouvriers] Incapacité temporaire à la conduite", () => {
    test("moins favorable", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle": `'Ouvriers'`,
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . ouvrier age":
          "56",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2010",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2022",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2022",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2600},{"month":"novembre 2024","value":2600},{"month":"octobre 2024","value":2600},{"month":"septembre 2024","value":2600},{"month":"août 2024","value":2600},{"month":"juillet 2024","value":2600},{"month":"juin 2024","value":2600},{"month":"mai 2024","value":2600},{"month":"avril 2024","value":2600},{"month":"mars 2024","value":2600},{"month":"février 2024","value":2600},{"month":"janvier 2024","value":2600}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(2600, "€");
    });
  });

  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Ouvriers", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle": `'Ouvriers'`,
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . ouvrier age":
          "56",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2022",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2022",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2022",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":2600},{"month":"janvier 2024","value":2600}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(28.89, "€");
    });
    test("Ingénieurs et cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
          "'Ingénieurs et cadres'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
          "'Non'",
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . cadre age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(200, "€");
    });

    test("Employés", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . employé ou TAM age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(33.33, "€");
    });

    test("TAM", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
          "'TAM'",
        "contrat salarié . convention collective . transports routiers . rupture conventionnelle . employé ou TAM age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(50, "€");
    });
  });
});
