import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "675"
);

describe("Employés", () => {
  test("Vérifier que les extras infos du salaire sont bien pris en compte", () => {
    const { result, missingArgs, detail } = engine.calculate({
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":
        "'Employés'",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2021",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      salaryPeriods:
        '[{"month":"décembre 2023","value":1488},{"month":"novembre 2023","value":1488},{"month":"octobre 2023","value":1488},{"month":"septembre 2023","value":1488},{"month":"août 2023","value":1488},{"month":"juillet 2023","value":1488},{"month":"juin 2023","value":1488},{"month":"mai 2023","value":1488},{"month":"avril 2023","value":1488},{"month":"mars 2023","value":1488},{"month":"février 2023","value":1488},{"month":"janvier 2023","value":1488}]',
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(result?.unit?.numerators).toEqual(["€"]);
    expect(result?.value).toEqual(1116);
    expect(detail?.agreementResult?.value).toEqual(446.4);
    expect(detail?.legalResult?.value).toEqual(1116);
  });
});
