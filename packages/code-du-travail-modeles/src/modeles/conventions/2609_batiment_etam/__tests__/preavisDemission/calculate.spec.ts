
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2609");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7C6D5292CB5A9AA0DB357C8DEC36C6EB.tplgfr36s_2?idArticle=KALIARTI000018773769&cidTexte=KALITEXT000018773681&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . batiment etam . ancienneté":"'Moins de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7C6D5292CB5A9AA0DB357C8DEC36C6EB.tplgfr36s_2?idArticle=KALIARTI000018773769&cidTexte=KALITEXT000018773681&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . batiment etam . ancienneté":"'2 ans ou plus'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2609'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});