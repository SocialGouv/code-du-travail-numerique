
import { IndemnitePrecaritePublicodes } from "../../../../../publicodes/IndemnitePrecarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite, "1516");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":180,"unit":"€"},"expectedReferences":[{"article":"article 5 de la convention collective (point 5.4.3.","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D21CB91C1CA2006FC1F3B641A83D2560.tplgfr43s_2?idArticle=KALIARTI000026451298&cidTexte=KALITEXT000005644543&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"expectedFormula":{"formula":"6/100 * Sref","explanations":["Sref : Salaire de référence (3000 €)"]},"situation":{"contrat salarié . type de cdd":"'CDD d'usage'","contrat salarié . embauché en cdi":"'non'"}},
          {"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"Article L1243-8 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501"},{"article":"Article L1243-9 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech="}],"expectedNotifications":[],"expectedFormula":{"formula":"1/10 * Sref","explanations":["Sref : Salaire de référence (3000 €)"]},"situation":{"contrat salarié . type de cdd":"'Autres'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications, expectedFormula}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1516'",
        "contrat salarié . salaire de référence": "3000",
        ...situation,
      });
        expect(result).toFormulaBeEqual(expectedFormula.formula, expectedFormula.explanations);
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});