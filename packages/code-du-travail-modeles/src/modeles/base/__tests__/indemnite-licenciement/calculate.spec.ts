import { IndemniteLicenciementPublicodes } from "../../../../publicodes";

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
        "875",
    });
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(1000);
    expect(result.unit?.numerators).toEqual(["€"]);
  });
});
