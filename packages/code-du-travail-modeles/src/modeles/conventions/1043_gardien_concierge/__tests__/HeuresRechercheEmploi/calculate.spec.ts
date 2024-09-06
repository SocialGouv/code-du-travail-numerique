
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1043");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 15","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021181025&cidTexte=KALITEXT000021180979&dateTexte=20120924"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . gardien concierge . typeRupture":"'Démission'"}},
            {"expectedResult":{"expectedValue":"2 heures par jour dans la limite de 40 heures","unit":""},"expectedReferences":[{"article":"Article 15","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021181025&cidTexte=KALITEXT000021180979&dateTexte=20120924"}],"expectedNotifications":["Le salaire est maintenu.","Les heures sont fixées dans la journée avec l'accord de l'employeur. En l'absence d'accord, elles sont fixées un jour par l'employeur, un jour par le salarié. Ces heures peuvent être bloquées en une ou plusieurs fois avec l'accord écrit de l'employeur."],"situation":{"contrat salarié . convention collective . gardien concierge . typeRupture":"'Licenciement'"}},
            {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 15","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021181025&cidTexte=KALITEXT000021180979&dateTexte=20120924"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . gardien concierge . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1043'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});