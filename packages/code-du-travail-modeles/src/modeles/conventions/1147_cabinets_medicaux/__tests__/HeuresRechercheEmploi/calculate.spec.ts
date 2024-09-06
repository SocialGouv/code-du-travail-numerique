
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1147");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 26","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856091&cidTexte=KALITEXT000005681857&dateTexte=20190707"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . cabinets médicaux . typeRupture":"'Démission'"}},
            {"expectedResult":{"expectedValue":"2 heures par jour","unit":""},"expectedReferences":[{"article":"Article 26","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856091&cidTexte=KALITEXT000005681857&dateTexte=20190707"}],"expectedNotifications":["Le salaire est maintenu.","L'employeur et le salarié peuvent décider ensemble que ces heures seront cumulées en une seule journée de 8 heures tous les 4 jours."],"situation":{"contrat salarié . convention collective . cabinets médicaux . typeRupture":"'Licenciement'"}},
            {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 26","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856091&cidTexte=KALITEXT000005681857&dateTexte=20190707"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . cabinets médicaux . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1147'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});