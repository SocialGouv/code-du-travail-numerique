import { getReferences } from "../../../../common";
import { CategoryPro44 } from "../../salary";

const engine = SingletonEnginePublicodes.getInstance();

const referencesOuvrierLicenciementNormal = [
  {
    article:
      "Article 28 de l’Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846396?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
];

const referencesLicenciementEco = [
  {
    article:
      "Article 11 de l’Accord du 15 janvier 1991 relatif à la politique de l'emploi (En vigueur non étendu)",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846081?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
];

const referencesTechniciensLicenciementNormal = [
  {
    article:
      "Article 21 de l’ Avenant n° 2 du 14 mars 1955 relatif aux agents de maîtrise et certains techniciens",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846463?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
];

const referencesIngeLicenciementNormal = [
  {
    article:
      "Article 14 de l’Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846317?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
];

const referencesLicenciementEcoInge = [
  {
    article:
      "Article 11 de l’Accord du 15 janvier 1991 relatif à la politique de l'emploi (En vigueur non étendu)",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846081?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
  {
    article:
      "Article 14 de l’Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846317?idConteneur=KALICONT000005635613",
  },
];

const referencesLicenciementEcoAgents = [
  {
    article:
      "Article 11 de l’Accord du 15 janvier 1991 relatif à la politique de l'emploi (En vigueur non étendu)",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846081?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
  {
    article:
      "Article 21 de l’ Avenant n° 2 du 14 mars 1955 relatif aux agents de maîtrise et certains techniciens",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846463?idConteneur=KALICONT000005635613",
  },
];

const referencesLicenciementEcoOuvriers = [
  {
    article:
      "Article 11 de l’Accord du 15 janvier 1991 relatif à la politique de l'emploi (En vigueur non étendu)",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846081?idConteneur=KALICONT000005635613",
  },
  {
    article:
      "Article 10 de la Convention collective nationale des industries chimiques et connexes du 30 décembre 1952",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846022?idConteneur=KALICONT000005635613&origin=list#KALIARTI000005846022",
  },
  {
    article:
      "Article 28 de l’Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005846396?idConteneur=KALICONT000005635613",
  },
];

describe("Références juridiques pour l'indemnité conventionnel de licenciement pour la CC 44", () => {
  describe("Licenciement normal", () => {
    describe("Ouvrier", () => {
      test.each`
        category                 | isEconomicFiring | age   | seniority | salary
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${2}      | ${2719}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${5}      | ${2719}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${2}      | ${2719}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${5}      | ${2719}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${2}      | ${2719}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${5}      | ${2719}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({ category, isEconomicFiring, age, seniority, salary }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          });

          const result = getReferences(situation, "résultat conventionnel");
          expect(result).toHaveLength(
            referencesOuvrierLicenciementNormal.length
          );
          expect(result).toEqual(
            expect.arrayContaining(referencesOuvrierLicenciementNormal)
          );
        }
      );
    });

    describe("Technicien", () => {
      test.each`
        category                     | isEconomicFiring | age   | seniority | salary
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${3}      | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${5}      | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${10}     | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${20}     | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${3}      | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${5}      | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${10}     | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${20}     | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${3}      | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${5}      | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${10}     | ${3140}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${20}     | ${3140}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
        ({ category, isEconomicFiring, age, seniority, salary }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          });

          const result = getReferences(situation, "résultat conventionnel");
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
        category              | isEconomicFiring | age   | seniority | salary
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2.5}    | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${5}      | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${10}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${13}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${17}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2.5}    | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${5}      | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${10}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${13}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${17}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2.5}    | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${5}      | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${10}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${13}     | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${17}     | ${3541}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
        ({ category, isEconomicFiring, age, seniority, salary }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          });

          const result = getReferences(situation, "résultat conventionnel");
          expect(result).toHaveLength(referencesIngeLicenciementNormal.length);
          expect(result).toEqual(
            expect.arrayContaining(referencesIngeLicenciementNormal)
          );
        }
      );
    });
  });

  describe("Licenciement économique", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | salary  | expectedRef
      ${CategoryPro44.ouvrier}     | ${true}          | ${30} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${30} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${30} | ${5}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${52} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${52} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${52} | ${5}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${56} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${56} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.ouvrier}     | ${true}          | ${56} | ${5}      | ${2500} | ${referencesLicenciementEcoOuvriers}
      ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${30} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${30} | ${5}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${52} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${52} | ${5}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${56} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.techniciens} | ${true}          | ${56} | ${5}      | ${2500} | ${referencesLicenciementEcoAgents}
      ${CategoryPro44.inge}        | ${true}          | ${30} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${30} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${30} | ${5}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${52} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${52} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${52} | ${5}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${56} | ${1.5}    | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${56} | ${2}      | ${2500} | ${referencesLicenciementEco}
      ${CategoryPro44.inge}        | ${true}          | ${56} | ${5}      | ${2500} | ${referencesLicenciementEcoInge}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary",
      ({ category, isEconomicFiring, age, seniority, salary, expectedRef }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
            ? `'Oui'`
            : `'Non'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = getReferences(situation, "résultat conventionnel");
        expect(result).toHaveLength(expectedRef.length);
        expect(result).toEqual(expect.arrayContaining(expectedRef));
      }
    );
  });
});
