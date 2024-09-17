
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1606");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"1 journée ou 2 demi-journées par semaine ou un nombre d'heures équivalent. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Article 9.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E5B5B8F059E9188492430B0C2B630256.tplgfr29s_3?idArticle=KALIARTI000005870732&cidTexte=KALITEXT000005687520&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["","Les absences doivent être fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié décident à tour de rôle et pour chaque semaine les conditions de ces absences."],"situation":{"contrat salarié . convention collective . bricolage . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"1 journée ou 2 demi-journées par semaine ou un nombre d'heures équivalent. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Article 9.2.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=B7000064E20FA3C0F372DDF9663564A2.tplgfr29s_3?idArticle=KALIARTI000005870734&cidTexte=KALITEXT000005687520&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["","Les absences doivent être fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié décident à tour de rôle et pour chaque semaine les conditions de ces absences."],"situation":{"contrat salarié . convention collective . bricolage . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 6","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9EAC3F9CEAFEEF1886BC40B199F0D838.tplgfr28s_1?idArticle=KALIARTI000026231275&cidTexte=KALITEXT000005687520&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . bricolage . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1606'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});