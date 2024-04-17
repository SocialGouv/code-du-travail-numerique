import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "44"
);

describe("Indemnité conventionnel de licenciement pour la CC 44", () => {
  describe("Défaut", () => {
    test.each`
      category                     | age   | seniority | salary  | expectedCompensation
      ${CategoryPro44.ouvrier}     | ${45} | ${0}      | ${2500} | ${0}
      ${CategoryPro44.techniciens} | ${45} | ${0}      | ${2500} | ${0}
      ${CategoryPro44.inge}        | ${45} | ${0}      | ${2500} | ${0}
    `(
      "Avec $seniority ans, catégorie $category, age $age et sref : $salary => $expectedCompensation €",
      ({ category, age, seniority, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
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
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Ouvrier", () => {
    test.each`
      category                 | age   | seniorityRight | seniority | salary  | expectedCompensation
      ${CategoryPro44.ouvrier} | ${50} | ${1.25}        | ${1.25}   | ${2719} | ${0}
      ${CategoryPro44.ouvrier} | ${50} | ${1.99}        | ${1.99}   | ${2719} | ${0}
      ${CategoryPro44.ouvrier} | ${50} | ${1.99}        | ${2}      | ${2719} | ${0}
      ${CategoryPro44.ouvrier} | ${50} | ${2}           | ${2}      | ${2719} | ${1631.4}
      ${CategoryPro44.ouvrier} | ${50} | ${2}           | ${5}      | ${2719} | ${6797.5}
      ${CategoryPro44.ouvrier} | ${55} | ${1.25}        | ${1.25}   | ${2719} | ${0}
      ${CategoryPro44.ouvrier} | ${55} | ${1.99}        | ${2}      | ${2719} | ${0}
      ${CategoryPro44.ouvrier} | ${55} | ${2}           | ${2}      | ${2719} | ${1631.4}
      ${CategoryPro44.ouvrier} | ${55} | ${2}           | ${5}      | ${2719} | ${9516.5}
      ${CategoryPro44.ouvrier} | ${57} | ${1.25}        | ${1.25}   | ${2719} | ${0}
      ${CategoryPro44.ouvrier} | ${57} | ${1.99}        | ${2}      | ${2719} | ${0}
      ${CategoryPro44.ouvrier} | ${57} | ${2}           | ${2}      | ${2719} | ${1631.4}
      ${CategoryPro44.ouvrier} | ${57} | ${2}           | ${5}      | ${2719} | ${9516.5}
      ${CategoryPro44.ouvrier} | ${57} | ${2}           | ${5}      | ${3495} | ${12232.5}
    `(
      "Avec $seniority ans (droit: $seniorityRight ans), catégorie $category, age $age et sref : $salary => $expectedCompensation €",
      ({
        category,
        age,
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
              category,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Technicien", () => {
    test.each`
      category                     | age   | seniorityRight | seniority | salary  | expectedCompensation
      ${CategoryPro44.techniciens} | ${50} | ${1.33}        | ${1.33}   | ${3140} | ${0}
      ${CategoryPro44.techniciens} | ${50} | ${1.99}        | ${1.99}   | ${3140} | ${0}
      ${CategoryPro44.techniciens} | ${50} | ${1.99}        | ${2}      | ${3140} | ${0}
      ${CategoryPro44.techniciens} | ${50} | ${2}           | ${2}      | ${3140} | ${1884}
      ${CategoryPro44.techniciens} | ${50} | ${2}           | ${3}      | ${3140} | ${2826}
      ${CategoryPro44.techniciens} | ${50} | ${2}           | ${5}      | ${3140} | ${7850}
      ${CategoryPro44.techniciens} | ${50} | ${2}           | ${10}     | ${3140} | ${15700}
      ${CategoryPro44.techniciens} | ${50} | ${2}           | ${20}     | ${3140} | ${34540}
      ${CategoryPro44.techniciens} | ${55} | ${1.33}        | ${1.33}   | ${3140} | ${0}
      ${CategoryPro44.techniciens} | ${55} | ${1.99}        | ${2}      | ${3140} | ${0}
      ${CategoryPro44.techniciens} | ${55} | ${3}           | ${3}      | ${3140} | ${2826}
      ${CategoryPro44.techniciens} | ${55} | ${2}           | ${5}      | ${3140} | ${10990}
      ${CategoryPro44.techniciens} | ${55} | ${2}           | ${10}     | ${3140} | ${18840}
      ${CategoryPro44.techniciens} | ${55} | ${2}           | ${20}     | ${3140} | ${37680}
      ${CategoryPro44.techniciens} | ${56} | ${1.33}        | ${1.33}   | ${3140} | ${0}
      ${CategoryPro44.techniciens} | ${56} | ${1.99}        | ${2}      | ${3140} | ${0}
      ${CategoryPro44.techniciens} | ${56} | ${2}           | ${3}      | ${3140} | ${2826}
      ${CategoryPro44.techniciens} | ${56} | ${2}           | ${5}      | ${3140} | ${10990}
      ${CategoryPro44.techniciens} | ${56} | ${2}           | ${10}     | ${3140} | ${18840}
      ${CategoryPro44.techniciens} | ${56} | ${2}           | ${20}     | ${3140} | ${37680}
    `(
      "Avec $seniority ans (droit: $seniorityRight ans), catégorie $category, age $age et sref : $salary => $expectedCompensation €",
      ({
        category,
        age,
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
              category,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Ingénieur", () => {
    test.each`
      category              | age   | seniorityRight | seniority | salary  | expectedCompensation
      ${CategoryPro44.inge} | ${40} | ${0.67}        | ${0.67}   | ${3541} | ${0}
      ${CategoryPro44.inge} | ${40} | ${1.99}        | ${1.99}   | ${3541} | ${0}
      ${CategoryPro44.inge} | ${40} | ${1.99}        | ${2}      | ${3541} | ${0}
      ${CategoryPro44.inge} | ${40} | ${2}           | ${2}      | ${3541} | ${2832.8}
      ${CategoryPro44.inge} | ${40} | ${2}           | ${2.5}    | ${3541} | ${3541}
      ${CategoryPro44.inge} | ${40} | ${2}           | ${5}      | ${3541} | ${7082}
      ${CategoryPro44.inge} | ${40} | ${2}           | ${10}     | ${3541} | ${14164}
      ${CategoryPro44.inge} | ${40} | ${2}           | ${13}     | ${3541} | ${20537.8}
      ${CategoryPro44.inge} | ${40} | ${2}           | ${17}     | ${3541} | ${30452.6}
      ${CategoryPro44.inge} | ${48} | ${0.67}        | ${0.67}   | ${3541} | ${0}
      ${CategoryPro44.inge} | ${48} | ${1.99}        | ${2}      | ${3541} | ${0}
      ${CategoryPro44.inge} | ${48} | ${2}           | ${2.5}    | ${3541} | ${3541}
      ${CategoryPro44.inge} | ${48} | ${2}           | ${5}      | ${3541} | ${7082}
      ${CategoryPro44.inge} | ${48} | ${2}           | ${10}     | ${3541} | ${17705}
      ${CategoryPro44.inge} | ${48} | ${2}           | ${13}     | ${3541} | ${24078.8}
      ${CategoryPro44.inge} | ${48} | ${2}           | ${17}     | ${3541} | ${33993.6}
      ${CategoryPro44.inge} | ${58} | ${0.67}        | ${0.67}   | ${3541} | ${0}
      ${CategoryPro44.inge} | ${58} | ${1.99}        | ${2}      | ${3541} | ${0}
      ${CategoryPro44.inge} | ${58} | ${2}           | ${2.5}    | ${3541} | ${3541}
      ${CategoryPro44.inge} | ${58} | ${2}           | ${5}      | ${3541} | ${7082}
      ${CategoryPro44.inge} | ${58} | ${2}           | ${10}     | ${3541} | ${21246}
      ${CategoryPro44.inge} | ${58} | ${2}           | ${13}     | ${3541} | ${27619.8}
      ${CategoryPro44.inge} | ${58} | ${2}           | ${17}     | ${3541} | ${37534.6}
    `(
      "Avec $seniority ans, catégorie $category, age $age, et sref : $salary => $expectedCompensation €",
      ({
        category,
        age,
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
              category,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });
});
