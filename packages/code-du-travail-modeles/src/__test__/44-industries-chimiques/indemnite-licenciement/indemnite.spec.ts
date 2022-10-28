import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { CategoryPro44 } from "../../../plugins/salaire-reference/44_industries_chimiques";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 44", () => {
  describe("Défaut", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | salary  | expectedCompensation
      ${CategoryPro44.ouvrier}     | ${false}         | ${45} | ${0}      | ${2500} | ${0}
      ${CategoryPro44.techniciens} | ${false}         | ${45} | ${0}      | ${2500} | ${0}
      ${CategoryPro44.inge}        | ${false}         | ${45} | ${0}      | ${2500} | ${0}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
      ({
        category,
        isEconomicFiring,
        age,
        seniority,
        salary,
        expectedCompensation,
      }) => {
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
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("Licenciement normal", () => {
    describe("Ouvrier", () => {
      test.each`
        category                 | isEconomicFiring | age   | seniority | salary  | expectedCompensation
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${1.25}   | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${2}      | ${2719} | ${1631.4}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${5}      | ${2719} | ${4078.5}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${1.25}   | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${2}      | ${2719} | ${1631.4}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${5}      | ${2719} | ${6797.5}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${1.25}   | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${2}      | ${2719} | ${1631.4}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${5}      | ${2719} | ${9516.5}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          salary,
          expectedCompensation,
        }) => {
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
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.nodeValue).toEqual(expectedCompensation);
        }
      );
    });

    describe("Technicien", () => {
      test.each`
        category                     | isEconomicFiring | age   | seniority | salary  | expectedCompensation
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${1.33}   | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${3}      | ${3140} | ${2826}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${5}      | ${3140} | ${4710}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${10}     | ${3140} | ${12560}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${20}     | ${3140} | ${31400}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${1.33}   | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${3}      | ${3140} | ${2826}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${5}      | ${3140} | ${7850}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${10}     | ${3140} | ${15700}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${20}     | ${3140} | ${34540}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${1.33}   | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${3}      | ${3140} | ${2826}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${5}      | ${3140} | ${10990}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${10}     | ${3140} | ${18840}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${20}     | ${3140} | ${37680}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          salary,
          expectedCompensation,
        }) => {
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
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.nodeValue).toEqual(expectedCompensation);
        }
      );
    });

    describe("Ingénieur", () => {
      test.each`
        category              | isEconomicFiring | age   | seniority | salary  | expectedCompensation
        ${CategoryPro44.inge} | ${false}         | ${40} | ${0.67}   | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2.5}    | ${3541} | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${5}      | ${3541} | ${7082}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${10}     | ${3541} | ${14164}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${13}     | ${3541} | ${20537.8}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${17}     | ${3541} | ${30452.6}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${0.67}   | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2.5}    | ${3541} | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${5}      | ${3541} | ${7082}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${10}     | ${3541} | ${17705}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${13}     | ${3541} | ${24078.8}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${17}     | ${3541} | ${33993.6}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${0.67}   | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2.5}    | ${3541} | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${5}      | ${3541} | ${7082}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${10}     | ${3541} | ${21246}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${13}     | ${3541} | ${27619.8}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${17}     | ${3541} | ${37534.6}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          salary,
          expectedCompensation,
        }) => {
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
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.nodeValue).toEqual(expectedCompensation);
        }
      );
    });
  });

  describe("Licenciement économique", () => {
    describe("Ouvrier", () => {
      test.each`
        category                 | isEconomicFiring | age   | seniority | salary  | expectedCompensation
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${5}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${5}      | ${2500} | ${8750}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${5}      | ${2500} | ${8750}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          salary,
          expectedCompensation,
        }) => {
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
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.nodeValue).toEqual(expectedCompensation);
        }
      );
    });

    describe("Technicien", () => {
      test.each`
        category                     | isEconomicFiring | age   | seniority | salary  | expectedCompensation
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${5}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${5}      | ${2500} | ${8750}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${5}      | ${2500} | ${8750}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          salary,
          expectedCompensation,
        }) => {
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
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.nodeValue).toEqual(expectedCompensation);
        }
      );
    });

    describe("Ingénieur", () => {
      test.each`
        category              | isEconomicFiring | age   | seniority | salary  | expectedCompensation
        ${CategoryPro44.inge} | ${true}          | ${30} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${5}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${5}      | ${2500} | ${10000}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${5}      | ${2500} | ${10000}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          salary,
          expectedCompensation,
        }) => {
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
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.nodeValue).toEqual(expectedCompensation);
        }
      );
    });
  });
});
