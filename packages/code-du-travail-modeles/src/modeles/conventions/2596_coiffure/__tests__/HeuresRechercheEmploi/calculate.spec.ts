
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "2596");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Article 7.4.4","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=66A29F5D26CA9B3AB9D6CF5888110E5B.tplgfr30s_3?idArticle=KALIARTI000018563850&cidTexte=KALITEXT000018563760&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire n'est pas maintenu.","L'employeur et le salarié peuvent décider que les 2 heures journalières pourront être bloquées à des horaires fixes ou qu'elles seront regroupées. En l'absence d'accord, les heures seront fixées un jour par l'employeur et le suivant par le salarié."],"situation":{"contrat salarié . convention collective . coiffure . typeRupture":"'Démission'"}},
            {"expectedResult":{"expectedValue":"2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Article 7.4.4","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=66A29F5D26CA9B3AB9D6CF5888110E5B.tplgfr30s_3?idArticle=KALIARTI000018563850&cidTexte=KALITEXT000018563760&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","L'employeur et le salarié peuvent décider que les 2 heures journalières pourront être bloquées à des horaires fixes ou qu'elles seront regroupées. En l'absence d'accord, les heures seront fixées un jour par l'employeur et le suivant par le salarié."],"situation":{"contrat salarié . convention collective . coiffure . typeRupture":"'Licenciement'"}},
            {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 7.3","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=40918918FC583E87EE1E942DFFF9D936.tplgfr30s_3?idArticle=KALIARTI000021023369&cidTexte=KALITEXT000018563760&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . coiffure . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2596'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});