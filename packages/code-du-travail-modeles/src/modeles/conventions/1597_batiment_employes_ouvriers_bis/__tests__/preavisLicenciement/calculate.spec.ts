
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "1597");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"jours"},"expectedReferences":[{"article":"Article 10.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=6B7211A48E0474D6942B62196D8E9DEE.tplgfr37s_2?idArticle=KALIARTI000005776855&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . batiment ouvriers employés bis . ancienneté":"'Au delà de la période d'essai et jusqu'à 3 mois'"}},
            {"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"Article 10.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=6B7211A48E0474D6942B62196D8E9DEE.tplgfr37s_2?idArticle=KALIARTI000005776855&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . batiment ouvriers employés bis . ancienneté":"'De 3 à 6 mois'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 10.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=6B7211A48E0474D6942B62196D8E9DEE.tplgfr37s_2?idArticle=KALIARTI000005776855&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . batiment ouvriers employés bis . ancienneté":"'6 mois à 2 ans'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 10.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=6B7211A48E0474D6942B62196D8E9DEE.tplgfr37s_2?idArticle=KALIARTI000005776855&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . batiment ouvriers employés bis . ancienneté":"'Plus de 2 ans'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1597'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});