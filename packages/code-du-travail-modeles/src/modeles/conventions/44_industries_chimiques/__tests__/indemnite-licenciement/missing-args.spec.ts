import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "44"
);

describe("Missing variables pour l'indemnité conventionnel de licenciement pour la CC 44", () => {
  describe("Aucune", () => {
    test.each`
      category                     | age   | seniority | salary
      ${CategoryPro44.ouvrier}     | ${45} | ${7}      | ${2500}
      ${CategoryPro44.techniciens} | ${45} | ${7}      | ${2500}
      ${CategoryPro44.inge}        | ${45} | ${7}      | ${2500}
    `(
      "Avec $seniority ans, catégorie $category, age $age et sref : $salary",
      ({ category, seniority, salary, age }) => {
        const { missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
              category,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
      }
    );
  });

  describe("Age", () => {
    test.each`
      category                     | seniority | salary
      ${CategoryPro44.ouvrier}     | ${7}      | ${2500}
      ${CategoryPro44.techniciens} | ${7}      | ${2500}
      ${CategoryPro44.inge}        | ${7}      | ${2500}
    `(
      "Avec $seniority ans, catégorie $category et sref : $salary",
      ({ category, seniority, salary }) => {
        const { missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
              category,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
        expect(keys).toEqual([
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age",
        ]);
      }
    );
  });

  describe("Cat pro", () => {
    test.each`
      seniority | salary
      ${7}      | ${2500}
      ${7}      | ${2500}
      ${7}      | ${2500}
    `("Avec $seniority ans et sref : $salary", ({ seniority, salary }) => {
      const { missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
      expect(keys).toEqual([
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle",
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age",
      ]);
    });
  });
});
