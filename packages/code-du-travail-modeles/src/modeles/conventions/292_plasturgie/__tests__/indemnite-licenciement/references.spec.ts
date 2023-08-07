import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "292"
);

const referencesNonCadres = [
  {
    article:
      "Article 16 de l’Avenant Ouvriers, collaborateurs, employés, techniciens, dessinateurs et agents de maîtrise",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042933350",
  },
  {
    article:
      "Article 11 de la Convention collective nationale de la plasturgie du 1er juillet 1960",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005856327?idConteneur=KALICONT000005635856&origin=list#KALIARTI000005856327",
  },
];

const referencesCadres = [
  {
    article: "Article 9 de l’Accord du 17 décembre 1992 relatif aux cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042933352?idConteneur=KALICONT000005635856",
  },
  {
    article:
      "Article 11 de la Convention collective nationale de la plasturgie du 1er juillet 1960",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005856327?idConteneur=KALICONT000005635856&origin=list#KALIARTI000005856327",
  },
];

describe("Références juridiques pour l'indemnité conventionnel de licenciement pour la CC 296", () => {
  test.each`
    category                                | seniority | expectedRef
    ${"Non cadres (Coefficient 700 à 830)"} | ${3}      | ${referencesNonCadres}
    ${"Non cadres (Coefficient 700 à 830)"} | ${6}      | ${referencesNonCadres}
    ${"Non cadres (Coefficient 700 à 830)"} | ${25}     | ${referencesNonCadres}
    ${"Cadres (Coefficient 900 et plus)"}   | ${3}      | ${referencesCadres}
    ${"Cadres (Coefficient 900 et plus)"}   | ${6}      | ${referencesCadres}
    ${"Cadres (Coefficient 900 et plus)"}   | ${25}     | ${referencesCadres}
  `(
    "Avec $seniority ans, catégorie $category on a $expectedRef",
    ({ category, seniority, expectedRef }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      });

      const result = engine.getReferences("résultat conventionnel");
      expect(result).toHaveLength(expectedRef.length);
      expect(result).toEqual(expect.arrayContaining(expectedRef));
    }
  );
});
