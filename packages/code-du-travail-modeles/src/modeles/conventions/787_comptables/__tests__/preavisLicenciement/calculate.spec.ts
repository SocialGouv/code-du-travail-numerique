
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "787");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 6.2.0","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=CFEA1065D76552B48FA299221688C973.tpdila22v_3?idArticle=KALIARTI000005839444&cidTexte=KALITEXT000005674852&dateTexte=19910731"}],"expectedNotifications":["Le contrat de travail peut prévoir une durée plus longue."],"situation":{"contrat salarié . convention collective . comptables . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 6.2.0","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=CFEA1065D76552B48FA299221688C973.tpdila22v_3?idArticle=KALIARTI000005839444&cidTexte=KALITEXT000005674852&dateTexte=19910731"}],"expectedNotifications":["Le contrat de travail peut prévoir une durée plus longue."],"situation":{"contrat salarié . convention collective . comptables . catégorie professionnelle":"'Employés'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0787'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});