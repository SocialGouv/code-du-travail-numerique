
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "2511");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par jour ouvrable. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Article 4.4.3.5","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657&dateTexte=20140411"}],"expectedNotifications":["Le salaire est maintenu.","Les salariés pourront prendre leurs heures en une seule fois avec l'accord de l'employeur."],"situation":{"contrat salarié . convention collective . sport . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 4.4.3.5","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657&dateTexte=20140411"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . typeRupture":"'Rupture de la période d'essai'"}}])(
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