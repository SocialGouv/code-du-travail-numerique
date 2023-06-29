import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1516"
);

const References = [
  {
    article: "Article 9.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047518146",
  },
];

describe("Vérification des références juridiques pour la CC 2511", () => {
  describe("Date de notification avant le 04/06/2023", () => {
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
          "contrat salarié . convention collective": "'IDCC1516'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . date de notification":
            "01/12/2022",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });
        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Date de notification après le 04/06/2023", () => {
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
          "contrat salarié . convention collective": "'IDCC1516'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . date de notification":
            "06/06/2023",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });
        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
