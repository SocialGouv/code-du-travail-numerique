
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "2120");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 30 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005784453&cidTexte=KALITEXT000005678018"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . banque . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 30 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005784453&cidTexte=KALITEXT000005678018"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . banque . catégorie professionnelle":"'Techniciens'","contrat salarié . convention collective . banque . catégorie professionnelle Techniciens . ancienneté":"'Moins de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 30 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005784453&cidTexte=KALITEXT000005678018"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . banque . catégorie professionnelle":"'Techniciens'","contrat salarié . convention collective . banque . catégorie professionnelle Techniciens . ancienneté":"'2 ans ou plus'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2120'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});