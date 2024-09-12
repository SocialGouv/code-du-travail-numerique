
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "573");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 35","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=20120228"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de gros . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 35","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=20120228"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de gros . catégorie professionnelle":"'Ouvriers, Employés'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 35","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=20120228"}],"expectedNotifications":["Cette durée s'applique aux techniciens et agents de maîtrise ou assimilés"],"situation":{"contrat salarié . convention collective . commerces de gros . catégorie professionnelle":"'Techniciens et agents de maîtrise TAM'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0573'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});