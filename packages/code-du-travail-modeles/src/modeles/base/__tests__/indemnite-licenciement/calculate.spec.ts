import { IndemniteLicenciementPublicodes } from "../../../../publicodes";
import type { SalaryPeriods } from "../../../common";

const engine = new IndemniteLicenciementPublicodes(modelsIndemniteLicenciement);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que l'ancienneté peut être remplacer par les dates en input", () => {
    const { result, missingArgs } = engine.calculate({
      absencePeriods: "[]",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(1000);
    expect(result.unit?.numerators).toEqual(["€"]);
  });

  test("Vérifier qu'un missing args s'affiche lorsque la date d'entrée est manquante", () => {
    const { missingArgs } = engine.calculate({
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs[0].name).toEqual(
      "contrat salarié . indemnité de licenciement . date d'entrée"
    );
  });

  test("Vérifier que l'ancienneté est bien calculé avec les congés", () => {
    const { result, missingArgs } = engine.calculate({
      absencePeriods: JSON.stringify([
        { motif: { key: "absenceMaladieNonPro" }, value: 6 },
      ]),
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/04/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(875);
    expect(result.unit?.numerators).toEqual(["€"]);
  });

  test("Vérifier que la grille de salaire est bien prise en compte", () => {
    const salaryPeriods: SalaryPeriods[] = [
      { month: "1", prime: 500, value: 2000 },
      { month: "2", prime: 500, value: 1000 },
      { month: "3", prime: 500, value: 3000 },
    ];
    const { result, missingArgs } = engine.calculate({
      absencePeriods: JSON.stringify([
        { motif: { key: "absenceMaladieNonPro" }, value: 6 },
      ]),
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/04/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      salaryPeriods: JSON.stringify(salaryPeriods),
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(875);
    expect(result.unit?.numerators).toEqual(["€"]);
  });
  describe("Vérification que les ineligibilités fonctionnent", () => {
    test("Vérifier l'ineligibilite CDD", () => {
      const { result, missingArgs, explanation } = engine.calculate({
        typeContratTravail: "cdd",
      });
      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual(0);
      expect(explanation).toEqual(
        "L’indemnité de licenciement n’est pas due pour les CDD et contrats de travail temporaires. Sous certaines conditions, le salarié peut avoir le droit à une indemnité de précarité."
      );
    });

    test("Vérifier l'ineligibilite Faute grave", () => {
      const { result, missingArgs, explanation } = engine.calculate({
        licenciementFauteGrave: "oui",
        typeContratTravail: "cdi",
      });
      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual(0);
      expect(explanation).toEqual(
        "L’indemnité de licenciement n’est pas due en cas de faute grave (ou lourde). Lorsqu’il est invoqué, le motif de faute grave doit apparaître précisément dans le courrier. Reportez-vous à la lettre de notification de licenciement."
      );
    });

    test("Vérifier l'ineligibilite Anciennete legal inférieur 8 mois", () => {
      const { result, missingArgs, explanation } = engine.calculate({
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/06/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/06/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        typeContratTravail: "cdi",
      });
      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual(0);
      expect(explanation).toEqual(
        "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois."
      );
    });
  });
  test("Comparer Resultats", () => {
    const { result: resultLegal } = engine.calculate({
      absencePeriods: undefined,
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2018",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/06/2022",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      salaryPeriods:
        '[{"month":"décembre 2021","value":2500},{"month":"novembre 2021","value":2500},{"month":"octobre 2021","value":2500},{"month":"septembre 2021","value":2500},{"month":"août 2021","value":2500},{"month":"juillet 2021","value":2500},{"month":"juin 2021","value":2500},{"month":"mai 2021","value":2500},{"month":"avril 2021","value":2500},{"month":"mars 2021","value":2500},{"month":"février 2021","value":2500},{"month":"janvier 2021","value":2500}]',
      typeContratTravail: "cdi",
    });
    const agreementEngine = new IndemniteLicenciementPublicodes(
      modelsIndemniteLicenciement,
      "1702"
    );
    const { result: resultAgreement } = agreementEngine.calculate({
      absencePeriods: undefined,
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
        "40",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique":
        "'Oui'",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2018",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/06/2022",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      noticeSalaryPeriods:
        '[{"month":"mai 2022","value":3000},{"month":"avril 2022","value":3000},{"month":"mars 2022","value":3000},{"month":"février 2022","value":3000},{"month":"janvier 2022","value":3000}]',
      salaryPeriods:
        '[{"month":"décembre 2021","value":2500},{"month":"novembre 2021","value":2500},{"month":"octobre 2021","value":2500},{"month":"septembre 2021","value":2500},{"month":"août 2021","value":2500},{"month":"juillet 2021","value":2500},{"month":"juin 2021","value":2500},{"month":"mai 2021","value":2500},{"month":"avril 2021","value":2500},{"month":"mars 2021","value":2500},{"month":"février 2021","value":2500},{"month":"janvier 2021","value":2500}]',
      typeContratTravail: "cdi",
    });
    expect(resultLegal.value).not.toEqual(resultAgreement.value);
  });
});
