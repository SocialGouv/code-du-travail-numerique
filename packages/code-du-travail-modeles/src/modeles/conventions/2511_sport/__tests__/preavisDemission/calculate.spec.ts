
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2511");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1. de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657&dateTexte=20140411"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . catégorie professionnelle":"'Cadres'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1. de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657&dateTexte=20140411"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . catégorie professionnelle":"'Ouvriers, Employés'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1. de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657&dateTexte=20140411"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . catégorie professionnelle":"'Techniciens et agents de maîtrise TAM'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2511'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});