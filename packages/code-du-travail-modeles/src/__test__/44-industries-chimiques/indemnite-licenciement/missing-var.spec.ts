import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { CategoryPro44 } from "../../../plugins/salaire-reference/44_industries_chimiques";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Missing variables pour l'indemnité conventionnel de licenciement pour la CC 44", () => {
  describe("Aucune", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | salary
      ${CategoryPro44.ouvrier}     | ${false}         | ${45} | ${2000}   | ${2500}
      ${CategoryPro44.techniciens} | ${false}         | ${45} | ${2000}   | ${2500}
      ${CategoryPro44.inge}        | ${false}         | ${45} | ${2000}   | ${2500}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
      ({ category, isEconomicFiring, seniority, salary, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
            isEconomicFiring ? `'Oui'` : `'Non'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
            age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "indemnité de licenciement": "oui",
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
      }
    );
  });

  describe("Age", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | salary
      ${CategoryPro44.ouvrier}     | ${false}         | ${45} | ${2000}   | ${2500}
      ${CategoryPro44.techniciens} | ${false}         | ${45} | ${2000}   | ${2500}
      ${CategoryPro44.inge}        | ${false}         | ${45} | ${2000}   | ${2500}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
      ({ category, isEconomicFiring, seniority, salary }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
            isEconomicFiring ? `'Oui'` : `'Non'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "indemnité de licenciement": "oui",
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": 24.004199999999997,
        });
      }
    );
  });

  describe("Licenciement économique", () => {
    test.each`
      category                 | isEconomicFiring | age   | seniority | salary
      ${CategoryPro44.ouvrier} | ${false}         | ${45} | ${2000}   | ${2500}
      ${CategoryPro44.inge}    | ${false}         | ${45} | ${2000}   | ${2500}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
      ({ category, seniority, salary }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "indemnité de licenciement": "oui",
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": 84.01089999999999,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": 40.0056,
        });
      }
    );
  });

  describe("Licenciement économique pour technicien", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | salary
      ${CategoryPro44.techniciens} | ${false}         | ${45} | ${2000}   | ${2500}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
      ({ category, seniority, salary }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "indemnité de licenciement": "oui",
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": 88.0113,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": 40.0056,
        });
      }
    );
  });

  describe("Cat pro", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | salary
      ${CategoryPro44.ouvrier}     | ${false}         | ${45} | ${2000}   | ${2500}
      ${CategoryPro44.techniciens} | ${false}         | ${45} | ${2000}   | ${2500}
      ${CategoryPro44.inge}        | ${false}         | ${45} | ${2000}   | ${2500}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
      ({ seniority, salary }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "indemnité de licenciement": "oui",
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": 392.0581000000001,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": 256.0325000000001,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": 120.01620000000001,
        });
      }
    );
  });
});
