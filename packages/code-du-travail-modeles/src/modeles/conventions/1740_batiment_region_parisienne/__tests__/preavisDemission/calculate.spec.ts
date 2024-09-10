
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1740");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"jours"},"expectedReferences":[{"article":"article 1.1.9","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers bâtiment région parisienne . ancienneté":"'Au delà de la période d'essai et jusqu'à 3 mois'"}},
            {"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"article 1.1.9","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers bâtiment région parisienne . ancienneté":"'Plus de 3 mois'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1740'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});