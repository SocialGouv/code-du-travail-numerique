
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1505");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 20.1","url":"https//www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562750#KALIARTI000043562750"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de détail fruits et légumes . typeRupture":"'Démission'"}},
            {"expectedResult":{"expectedValue":"2 heures par jour travaillé","unit":""},"expectedReferences":[{"article":"Article 20.1","url":"https//www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562750#KALIARTI000043562750"}],"expectedNotifications":["","Les 2 heures sont fixées un jour par l'employeur et le jour suivant par le salarié. Si l'employeur et le salarié sont d'accord, ces heures peuvent être cumulées. Ce droit d'absence cesse quand le salarié a trouvé un emploi."],"situation":{"contrat salarié . convention collective . commerces de détail fruits et légumes . typeRupture":"'Licenciement'"}},
            {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 16","url":"https//www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562743#KALIARTI000043562743"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de détail fruits et légumes . typeRupture":"'Rupture de la période d'essai'"}}])(
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