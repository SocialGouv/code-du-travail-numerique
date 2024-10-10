
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2614");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=32DC2149CCEA7BF0314A78D5DCC51A9C.tplgfr23s_1?idArticle=KALIARTI000018926304&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . travaux publics . ancienneté":"'Moins de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=32DC2149CCEA7BF0314A78D5DCC51A9C.tplgfr23s_1?idArticle=KALIARTI000018926304&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . travaux publics . ancienneté":"'2 ans ou plus'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2614'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});