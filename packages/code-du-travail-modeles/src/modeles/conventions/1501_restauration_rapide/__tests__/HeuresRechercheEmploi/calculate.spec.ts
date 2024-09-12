
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1501");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 12","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8F09B67FB742D16900AC784E4D4F4079.tplgfr27s_1?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . restauration rapide . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour travaillé","unit":""},"expectedReferences":[{"article":"Article 12","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8F09B67FB742D16900AC784E4D4F4079.tplgfr27s_1?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures de recherche d'emploi sont prises par accord entre l'employeur et le salarié. Ils peuvent également décider de bloquer tout ou partie de ces heures avant la fin du préavis."],"situation":{"contrat salarié . convention collective . restauration rapide . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 9","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005833462&cidTexte=KALITEXT000005672325&dateTexte=19881213"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . restauration rapide . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1501'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});