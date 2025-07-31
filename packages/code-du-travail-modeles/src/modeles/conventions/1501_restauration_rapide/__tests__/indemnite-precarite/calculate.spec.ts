import { IndemnitePrecaritePublicodes } from "../../../../../publicodes/IndemnitePrecaritePublicodes";

const engine = new IndemnitePrecaritePublicodes(
  modelsIndemnitePrecarite,
  "1501"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 300, unit: "€" },
      expectedReferences: [
        {
          article: "Article L1243-8 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501",
        },
        {
          article: "Article L1243-9 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech=",
        },
      ],
      expectedNotifications: [],
      expectedFormula: {
        formula: "1/10 * S",
        explanations: ["S : Salaires renseignés (3000 €)"],
      },
      situation: { "contrat salarié . type de cdd": "'Autres'" },
    },
  ])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({
      situation,
      expectedResult,
      expectedReferences,
      expectedNotifications,
      expectedFormula,
    }) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1501'",
        "contrat salarié . salaire de référence": "3000",
        "contrat salarié . contractType": "'CDD'",
        "contrat salarié . finContratPeriodeDessai": "non",
        "contrat salarié . propositionCDIFindeContrat": "non",
        "contrat salarié . refusCDIFindeContrat": "non",
        "contrat salarié . interruptionFauteGrave": "non",
        "contrat salarié . refusRenouvellementAuto": "non",
        "contrat salarié . cttFormation": "non",
        "contrat salarié . ruptureContratFauteGrave": "non",
        "contrat salarié . propositionCDIFinContrat": "non",
        "contrat salarié . refusSouplesse": "non",
        ...situation,
      });
      expect(result).toFormulaBeEqual(
        expectedFormula.formula,
        expectedFormula.explanations
      );
      expect(result).toResultBeEqual(
        expectedResult.expectedValue,
        expectedResult.unit
      );
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
    }
  );
});
