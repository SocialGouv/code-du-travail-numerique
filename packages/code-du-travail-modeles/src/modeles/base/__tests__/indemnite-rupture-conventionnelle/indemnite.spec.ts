import { IndemniteRuptureConventionnellePublicodes } from "../../../../publicodes";

const engine = new IndemniteRuptureConventionnellePublicodes(
  //@ts-expect-error
  modelsIndemniteRuptureConventionnelle
);

describe("Indemnité légale de licenciement pour un employé", () => {
  test("Vérifier la gestion de l'ancienneté", () => {
    const situation: any = {
      "convention collective": "0",
      "date de début de contrat": "01/01/2019",
      "date de fin de contrat": "01/01/2024",
      "salaire de référence": "3000",
    };
    const { result, missingArgs } = engine.calculate(situation);
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(3750);
  });

  test("Vérifié la gestion de la grille de salaire & prime", () => {
    const situation: any = {
      "convention collective": "0",
      "date de début de contrat": "01/01/2019",
      "date de fin de contrat": "01/01/2024",
      "grille de salaire & primes": [
        { month: "janvier", prime: 300, value: 3000 },
        { month: "février", prime: 300, value: 2000 },
        { month: "mars", prime: 300, value: 4000 },
      ],
    };
    const { result, missingArgs } = engine.calculate(situation);
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(3750);
  });
});
