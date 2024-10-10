
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "1740");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"jours"},"expectedReferences":[{"article":"article 1.1.9","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers bâtiment région parisienne . ancienneté":"'Au delà de la période d'essai et jusqu'à 3 mois'"}},
          {"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"article 1.1.9","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers bâtiment région parisienne . ancienneté":"'De 3 à 6 mois'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"article 1.1.9","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers bâtiment région parisienne . ancienneté":"'6 mois à 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"article 1.1.9","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . ouvriers bâtiment région parisienne . ancienneté":"'Plus de 2 ans'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1740'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});