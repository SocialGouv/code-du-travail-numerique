
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "3043");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Article 4.11.1","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340&dateTexte=20151026"}],"expectedNotifications":["Le salaire n'est pas maintenu.","Les heures peuvent être groupées en fin de préavis par accord entre l'employeur et le salarié, ou prises chaque jour une fois au choix du salarié, une fois au choix de l'employeur."],"situation":{"contrat salarié . convention collective . entreprises de propreté . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Article 4.11.1","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340&dateTexte=20151026"}],"expectedNotifications":["Le salaire est maintenu.","Les heures peuvent être groupées en fin de préavis par accord entre l'employeur et le salarié, ou prises chaque jour une fois au choix du salarié, une fois au choix de l'employeur."],"situation":{"contrat salarié . convention collective . entreprises de propreté . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 4.1.2","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340&dateTexte=20151026"},{"article":"Article 4.11.1","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172402&cidTexte=KALITEXT000027172340&dateTexte=20151026"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . entreprises de propreté . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3043'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});