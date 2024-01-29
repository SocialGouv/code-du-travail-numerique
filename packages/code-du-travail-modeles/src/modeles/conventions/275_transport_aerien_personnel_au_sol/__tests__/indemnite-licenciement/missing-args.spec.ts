import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "275"
);

describe("Missing variables pour l'indemnité conventionnel de licenciement pour la CC 275", () => {
  describe("Aucune", () => {
    test("Pour un départ avant le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . age":
            "59",
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . date de notification":
            "30/01/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
    });

    test("Pour un départ après le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . age":
            "59",
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . date de notification":
            "02/02/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
    });
  });

  describe("Sur l'âge", () => {
    test("Pour un départ avant le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . date de notification":
            "30/01/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
      expect(keys).toEqual([
        "contrat salarié . convention collective . transport aérien personnel au sol . age",
      ]);
    });

    test("Pour un départ après le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . date de notification":
            "02/02/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
      expect(keys).toEqual([
        "contrat salarié . convention collective . transport aérien personnel au sol . age",
      ]);
    });
  });

  describe("Sur la catégorie pro", () => {
    test("Pour un départ avant le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . date de notification":
            "30/01/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
      expect(keys).toEqual([
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle",
      ]);
    });

    test("Pour un départ après le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . date de notification":
            "02/02/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
      expect(keys).toEqual([
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle",
      ]);
    });
  });

  describe("Sur l'âge dans le cas où une date de notification n'est pas renseignée", () => {
    test("Pour un départ avant le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
      expect(keys).toEqual([
        "contrat salarié . convention collective . transport aérien personnel au sol . age",
      ]);
    });

    test("Pour un départ après le 31/01/2024", () => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "40",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "40",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "10000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
      expect(keys).toEqual([
        "contrat salarié . convention collective . transport aérien personnel au sol . age",
      ]);
    });
  });
});
