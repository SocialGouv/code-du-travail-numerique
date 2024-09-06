
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "2609");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 8.3","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018773771&cidTexte=KALITEXT000018773681&dateTexte=20060712"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . batiment etam . typeRupture":"'Démission'"}},
            {"expectedResult":{"expectedValue":"5 journées ou 10 demi-journées","unit":""},"expectedReferences":[{"article":"Article 8.3","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018773771&cidTexte=KALITEXT000018773681&dateTexte=20060712"}],"expectedNotifications":["Le salaire est maintenu.","Les autorisations d'absence seront fixées moitié par le salarié, et moitié par l'employeur. Chacun devra en informer l'autre partie. L'employeur ne verse pas d'indemnité au salarié s'il n'utilise ces heures d'absence autorisée."],"situation":{"contrat salarié . convention collective . batiment etam . typeRupture":"'Licenciement'"}},
            {"expectedResult":{"expectedValue":"5 journées ou 10 demi-journées","unit":""},"expectedReferences":[{"article":"Article 2.3","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=40918918FC583E87EE1E942DFFF9D936.tplgfr30s_3?idArticle=KALIARTI000018773723&cidTexte=KALITEXT000018773681&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les autorisations d'absence seront fixées moitié par le salarié, et moitié par l'employeur. Chacun devra en informer l'autre partie. L'employeur ne verse pas d'indemnité au salarié s'il n'utilise ces heures d'absence autorisée."],"situation":{"contrat salarié . convention collective . batiment etam . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2609'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});