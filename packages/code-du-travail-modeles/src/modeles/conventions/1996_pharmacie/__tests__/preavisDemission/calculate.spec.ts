
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1996");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 6 de la convention collective nationale du 3 décembre 1997 relative aux dispositions particulières applicables aux cadres","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AEA06E7172B0964736B47818AC28E3F3.tpdila23v_2?idArticle=KALIARTI000005829442&cidTexte=KALITEXT000005671154&dateTexte=20170816"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . pharmacie . catégorie professionnelle":"'Cadres'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 20 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005829411&cidTexte=KALITEXT000005671152&dateTexte=20180607"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . pharmacie . catégorie professionnelle":"'Noncadres'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1996'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});