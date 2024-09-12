
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1702");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"jours"},"expectedReferences":[{"article":"Article 10.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=63146BC1A1D3059843F8953CF57BE0FC.tpdila07v_3?idArticle=KALIARTI000005801846&cidTexte=KALITEXT000005658951&dateTexte=20120513"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers travaux public . catégorie professionnelle":"'Ouvriers'","contrat salarié . convention collective . ouvriers travaux public . catégorie professionnelle Ouvriers . ancienneté":"'Au delà de la période d'essai et jusqu'à 3 mois'"}},
          {"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"Article 10.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=63146BC1A1D3059843F8953CF57BE0FC.tpdila07v_3?idArticle=KALIARTI000005801846&cidTexte=KALITEXT000005658951&dateTexte=20120513"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers travaux public . catégorie professionnelle":"'Ouvriers'","contrat salarié . convention collective . ouvriers travaux public . catégorie professionnelle Ouvriers . ancienneté":"'Plus de 3 mois'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1702'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});