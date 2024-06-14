import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "44"
);

const referencesOuvrierLicenciementNormal = [
  {
    article:
      "Article 28 de l’Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846396?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
];

const referencesTechniciensLicenciementNormal = [
  {
    article:
      "Article 21 de l’ Avenant n° 2 du 14 mars 1955 relatif aux agents de maîtrise et certains techniciens",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846463?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
];

const referencesIngeLicenciementNormal = [
  {
    article:
      "Article 14 de l’Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846317?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
];

describe("Références juridiques pour l'indemnité conventionnel de licenciement pour la CC 44", () => {
  describe("Ouvrier", () => {
    test.each`
      category                 | age   | seniority | salary
      ${CategoryPro44.ouvrier} | ${50} | ${2}      | ${2719}
      ${CategoryPro44.ouvrier} | ${50} | ${5}      | ${2719}
      ${CategoryPro44.ouvrier} | ${55} | ${2}      | ${2719}
      ${CategoryPro44.ouvrier} | ${55} | ${5}      | ${2719}
      ${CategoryPro44.ouvrier} | ${57} | ${2}      | ${2719}
      ${CategoryPro44.ouvrier} | ${57} | ${5}      | ${2719}
    `(
      "Avec $seniority ans, catégorie $category, age $age et sref : $salary => $expectedCompensation €",
      ({ category, age, seniority, salary }) => {
        engine.setSituation({
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
        });

        const result = engine.getReferences("résultat conventionnel");
        expect(result).toHaveLength(referencesOuvrierLicenciementNormal.length);
        expect(result).toEqual(
          expect.arrayContaining(referencesOuvrierLicenciementNormal)
        );
      }
    );
  });

  describe("Technicien", () => {
    test.each`
      category                     | age   | seniority | salary
      ${CategoryPro44.techniciens} | ${50} | ${3}      | ${3140}
      ${CategoryPro44.techniciens} | ${50} | ${5}      | ${3140}
      ${CategoryPro44.techniciens} | ${50} | ${10}     | ${3140}
      ${CategoryPro44.techniciens} | ${50} | ${20}     | ${3140}
      ${CategoryPro44.techniciens} | ${55} | ${3}      | ${3140}
      ${CategoryPro44.techniciens} | ${55} | ${5}      | ${3140}
      ${CategoryPro44.techniciens} | ${55} | ${10}     | ${3140}
      ${CategoryPro44.techniciens} | ${55} | ${20}     | ${3140}
      ${CategoryPro44.techniciens} | ${56} | ${3}      | ${3140}
      ${CategoryPro44.techniciens} | ${56} | ${5}      | ${3140}
      ${CategoryPro44.techniciens} | ${56} | ${10}     | ${3140}
      ${CategoryPro44.techniciens} | ${56} | ${20}     | ${3140}
    `(
      "Avec $seniority ans, catégorie $category, age $age et sref : $salary",
      ({ category, age, seniority, salary }) => {
        engine.setSituation({
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
        });

        const result = engine.getReferences("résultat conventionnel");
        expect(result).toHaveLength(
          referencesTechniciensLicenciementNormal.length
        );
        expect(result).toEqual(
          expect.arrayContaining(referencesTechniciensLicenciementNormal)
        );
      }
    );
  });

  describe("Ingénieur", () => {
    test.each`
      category              | age   | seniority | salary
      ${CategoryPro44.inge} | ${40} | ${2.5}    | ${3541}
      ${CategoryPro44.inge} | ${40} | ${5}      | ${3541}
      ${CategoryPro44.inge} | ${40} | ${10}     | ${3541}
      ${CategoryPro44.inge} | ${40} | ${13}     | ${3541}
      ${CategoryPro44.inge} | ${40} | ${17}     | ${3541}
      ${CategoryPro44.inge} | ${48} | ${2.5}    | ${3541}
      ${CategoryPro44.inge} | ${48} | ${5}      | ${3541}
      ${CategoryPro44.inge} | ${48} | ${10}     | ${3541}
      ${CategoryPro44.inge} | ${48} | ${13}     | ${3541}
      ${CategoryPro44.inge} | ${48} | ${17}     | ${3541}
      ${CategoryPro44.inge} | ${58} | ${2.5}    | ${3541}
      ${CategoryPro44.inge} | ${58} | ${5}      | ${3541}
      ${CategoryPro44.inge} | ${58} | ${10}     | ${3541}
      ${CategoryPro44.inge} | ${58} | ${13}     | ${3541}
      ${CategoryPro44.inge} | ${58} | ${17}     | ${3541}
    `(
      "Avec $seniority ans, catégorie $category, age $age, et sref : $salary",
      ({ category, age, seniority, salary }) => {
        engine.setSituation({
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
        });

        const result = engine.getReferences("résultat conventionnel");
        expect(result).toHaveLength(referencesIngeLicenciementNormal.length);
        expect(result).toEqual(
          expect.arrayContaining(referencesIngeLicenciementNormal)
        );
      }
    );
  });
});
