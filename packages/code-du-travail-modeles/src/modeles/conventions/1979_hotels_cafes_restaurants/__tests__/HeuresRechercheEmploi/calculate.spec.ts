
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1979");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 30.1","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . hotels cafes restaurants . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour, dans la limite d'un nombre d'heures total équivalent au maximum à la durée hebdomadaire de travail du salarié. Le salarié n'a pas droit à ces heures de recherche d'emploi en cas de licenciement pour faute grave ou faute lourde","unit":""},"expectedReferences":[{"article":"Article 30.2","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures de recherche d'emploi sont prises par accord entre l'employeur et le salarié. Ils peuvent également décider de bloquer tout ou partie de ces heures avant la fin du préavis. En l'absence d'accord, les heures d'absence sont fixées un jour par l'employeur, et un jour par le salarié à condition d'être prises en dehors des heures de services des repas à la clientèle. Le salarié qui a trouvé un emploi ne peut plus utiliser les heures pour recherche d'emploi."],"situation":{"contrat salarié . convention collective . hotels cafes restaurants . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 13","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C33CCCA8A4BDBD476BF7D99A55F73BA4.tplgfr33s_2?idArticle=KALIARTI000005826269&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . hotels cafes restaurants . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1979'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});