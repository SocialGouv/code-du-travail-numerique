
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1505");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 20 de la convention collective","url":"https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562749#KALIARTI000043562749"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle":"'Agents de maîtrise AM1 et AM2'"}},
          {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 20 de la convention collective","url":"https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562749#KALIARTI000043562749"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle":"'Cadres C1 et C2'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 20 de la convention collective","url":"https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562749#KALIARTI000043562749"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle":"'Employés E1 à E7'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1505'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});