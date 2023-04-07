import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2614"
);

const References = [
  {
    article: "Article 8.4",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926425?idConteneur=KALICONT000018926209",
  },
  {
    article: "Article 8.5",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926426?idConteneur=KALICONT000018926209",
  },
  {
    article: "Article 8.13",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926445?idConteneur=KALICONT000018926209&origin=list#KALIARTI000018926445",
  },
];

describe("Vérification des références juridiques pour la CC 2614", () => {
  test.each`
    seniority | age   | expectedReferences
    ${15}     | ${55} | ${References}
    ${24}     | ${55} | ${References}
    ${15}     | ${59} | ${References}
    ${24}     | ${59} | ${References}
    ${15}     | ${67} | ${References}
    ${24}     | ${67} | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, age, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2614'",
        "contrat salarié . convention collective . travaux publics . age": age,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
