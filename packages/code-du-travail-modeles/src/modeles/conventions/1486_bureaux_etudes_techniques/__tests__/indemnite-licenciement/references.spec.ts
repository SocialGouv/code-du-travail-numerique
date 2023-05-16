import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro1486, TypeLicenciement1486 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1486"
);
const refEtamOuInge = [
  {
    article: "Article 4.5 Avenant n°46",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513839?idConteneur=KALICONT000005635173#KALIARTI000047513839",
  },
];

const refEtamMoins20OuInge = [
  {
    article: "Article 18",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851444?idConteneur=KALICONT000005635173",
  },
  {
    article: "Article 19",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851447?idConteneur=KALICONT000005635173",
  },
  {
    article: "Article 12",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851428?idConteneur=KALICONT000005635173&origin=list#KALIARTI000005851428",
  },
];

const refEtamPlus20 = [
  {
    article: "Article 18",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851444?idConteneur=KALICONT000005635173",
  },
  {
    article: "Article 19",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851447?idConteneur=KALICONT000005635173",
  },
];

const refRefus = [
  {
    article: "Article 61",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851537?idConteneur=KALICONT000005635173",
  },
  {
    article: "Article 12",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851428?idConteneur=KALICONT000005635173&origin=list#KALIARTI000005851428",
  },
];

const refChargeEnquete = [
  {
    article:
      "Article 23 de l’Annexe IV. Enquêteurs. Accord du 16 décembre 1991",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851321?idConteneur=KALICONT000005635173",
  },
  {
    article:
      "Article 24 de l’Annexe IV. Enquêteurs. Accord du 16 décembre 1991",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851322?idConteneur=KALICONT000005635173",
  },
  {
    article: "Article 12",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851428?idConteneur=KALICONT000005635173&origin=list#KALIARTI000005851428",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 1486", () => {
  describe("Références à partir du 1er mai 2023", () => {
    test.each`
      category                    | seniority | salary  | expectedReferences
      ${CatPro1486.ingeCadre}     | ${10}     | ${2000} | ${refEtamOuInge}
      ${CatPro1486.chargeEnquete} | ${10}     | ${2000} | ${refChargeEnquete}
      ${CatPro1486.etam}          | ${10}     | ${2000} | ${refEtamOuInge}
      ${CatPro1486.etam}          | ${25}     | ${2000} | ${refEtamOuInge}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, type de licenciement $typeLicenciement, catégorie $category => $expectedReferences",
      ({ seniority, salary, expectedReferences, category }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1486'",
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
            "non",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Références avant le 1er mai 2023", () => {
    test.each`
      category                    | typeLicenciement              | seniority | salary  | expectedReferences
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${10}     | ${2000} | ${refEtamMoins20OuInge}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${10}     | ${2000} | ${refChargeEnquete}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${10}     | ${2000} | ${refEtamMoins20OuInge}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${25}     | ${2000} | ${refEtamPlus20}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.refus} | ${10}     | ${2000} | ${refRefus}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${10}     | ${2000} | ${refRefus}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.refus} | ${10}     | ${2000} | ${refRefus}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, type de licenciement $typeLicenciement, catégorie $category => $expectedReferences",
      ({
        seniority,
        salary,
        expectedReferences,
        category,
        typeLicenciement,
      }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1486'",
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement": `'${typeLicenciement}'`,
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
            "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
