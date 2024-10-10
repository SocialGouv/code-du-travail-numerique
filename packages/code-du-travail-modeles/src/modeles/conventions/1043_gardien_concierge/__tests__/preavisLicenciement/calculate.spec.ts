
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "1043");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 14","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . gardien concierge . catégorie professionnelle":"'A'","contrat salarié . convention collective . gardien concierge . catégorie professionnelle A . ancienneté":"'Moins de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 14","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . gardien concierge . catégorie professionnelle":"'A'","contrat salarié . convention collective . gardien concierge . catégorie professionnelle A . ancienneté":"'Plus de 2 ans'"}},
          {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 14","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . gardien concierge . catégorie professionnelle":"'B'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1043'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});