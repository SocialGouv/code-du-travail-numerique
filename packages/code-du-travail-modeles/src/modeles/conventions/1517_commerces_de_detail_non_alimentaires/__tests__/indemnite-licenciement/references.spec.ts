import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1517"
);

const References = [
  {
    article: "Article 4, Chapitre VI",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046093607?idConteneur=KALICONT000005635870&origin=list#KALIARTI000046093607",
  },
];

describe("Vérification des références juridiques pour la CC 1517", () => {
  test.each`
    seniority | inaptitude | expectedReferences
    ${5}      | ${"non"}   | ${References}
    ${5}      | ${"oui"}   | ${References}
    ${6}      | ${"non"}   | ${References}
    ${6}      | ${"oui"}   | ${References}
    ${24}     | ${"non"}   | ${References}
    ${24}     | ${"oui"}   | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, inaptitude, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1517'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": inaptitude,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
