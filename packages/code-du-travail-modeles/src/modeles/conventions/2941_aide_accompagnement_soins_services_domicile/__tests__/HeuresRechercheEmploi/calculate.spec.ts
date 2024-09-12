
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "2941");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par jour travaillé ou 1 journée par semaine de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail et est égale au minimum à 1 heure par semaine","unit":""},"expectedReferences":[{"article":"Article 27","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=302614B8DD2A93A0C437326C71199882.tplgfr33s_1?idArticle=KALIARTI000025805634&cidTexte=KALITEXT000025805457&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire n'est pas maintenu.",""],"situation":{"contrat salarié . convention collective . bad . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour travaillé ou 1 journée par semaine de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail et est égale au minimum à 1 heure par semaine","unit":""},"expectedReferences":[{"article":"Article 26.1","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=302614B8DD2A93A0C437326C71199882.tplgfr33s_1?idArticle=KALIARTI000025805633&cidTexte=KALITEXT000025805457&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu, sauf en cas de licenciement pour faute grave ou faute lourde.",""],"situation":{"contrat salarié . convention collective . bad . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 16","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000025805623&cidTexte=KALITEXT000025805457&dateTexte=20100521"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . bad . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2941'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});