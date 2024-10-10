
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2098");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 19","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle":"'Agents de maîtrise et Techniciens'"}},
          {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 19","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 19","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle":"'Employés'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2098'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});