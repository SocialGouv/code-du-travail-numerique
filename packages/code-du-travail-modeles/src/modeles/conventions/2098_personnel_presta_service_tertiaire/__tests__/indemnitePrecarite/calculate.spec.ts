
import { IndemnitePrecaritePublicodes } from "../../../../../publicodes/IndemnitePrecarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite, "2098");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"Article 9 de l'accord du 10 mai 2010 relatif à l'activité d'optimisation de linéaires","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023105275&cidTexte=KALITEXT000023105252&dateTexte=20190918"}],"expectedNotifications":[],"situation":{"contrat salarié . type de cdd":"'CDD d'optimisation linéaire'"}},
            {"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"Article 9 de l'accord du 13 février 2006 Activités de l'animation commerciale","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=793A05966FD38DF94E5C833A2BA3BAA6.tplgfr35s_3?idArticle=KALIARTI000005853800&cidTexte=KALITEXT000005680889&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . type de cdd":"'CDD d'animation commerciale'"}},
            {"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"Article 4.1 de l'accord du 20 septembre 2002 (1 relatif aux dispositions spécifiques à l'accueil événementiel","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=498352440FE8B0C9DFAD6C46CE391F1F.tplgfr27s_3?idArticle=KALIARTI000028460654&cidTexte=KALITEXT000005680353&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . type de cdd":"'Contrat d'intervention dans le secteur de l'accueil événementiel'"}},
            {"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"Article L1243-8 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501"},{"article":"Article L1243-9 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech="}],"expectedNotifications":[],"situation":{"contrat salarié . type de cdd":"'Autres'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . salaire de référence": "3000",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});