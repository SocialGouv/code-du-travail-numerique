
import { IndemnitePrecaritePublicodes } from "../../../../../publicodes/IndemnitePrecarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite, "3127");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"article 2.5 de la section 1 de la Partie 1 du Chapitre II de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C006837D6C1061AF47817DC0CD5FF05C.tplgfr43s_2?idArticle=KALIARTI000026943297&cidTexte=KALITEXT000026943196&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . type de cdd":"'CDD dit de  mission ponctuelle ou occasionnelle'","contrat salarié . embauché en cdi sans interruption":"'non'"}},
            {"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"Article L1243-8 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501"},{"article":"Article L1243-9 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech="}],"expectedNotifications":[],"situation":{"contrat salarié . type de cdd":"'Autres'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3127'",
        "contrat salarié . salaire de référence": "3000",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});