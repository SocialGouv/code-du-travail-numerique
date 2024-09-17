
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1517");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail","unit":""},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. Ils peuvent décider, par écrit, de les grouper en une ou plusieurs fois. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié."],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Chapitre V, Article 3","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026803716&cidTexte=KALITEXT000026803629&dateTexte=20120509"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1517'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});