import { getReferences } from "../../../../common";

const References = [
  {
    article: "Partie II, Chapitre 4, section 1, article 1.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000027029046/?idConteneur=KALICONT000027084096",
  },
];

describe("Vérification des références juridiques pour la CC 3127", () => {
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
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC3127'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
