
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1672");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"le temps et dans les conditions décidées par l'employeur, qui lui accordent des facilités d'absence","unit":""},"expectedReferences":[{"article":"Article 91 b)","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=E0FA42F1D98C3A5E305111F72B4DD513.tpdjo06v_1?idSectionTA=KALISCTA000005765066&cidTexte=KALITEXT000005654646&idConvention=KALICONT000005635918"}],"expectedNotifications":["Le salaire n'est pas maintenu.","Les heures d'absence autorisée sont accordées au salarié qui n'a pas encore retrouvé un emploi. L'employeur en définit les modalités et la rémunération."],"situation":{"contrat salarié . convention collective . sociétés d'assurances . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"50 heures par mois maximum","unit":""},"expectedReferences":[{"article":"Article 91 b)","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=E0FA42F1D98C3A5E305111F72B4DD513.tpdjo06v_1?idSectionTA=KALISCTA000005765066&cidTexte=KALITEXT000005654646&idConvention=KALICONT000005635918"}],"expectedNotifications":["Le salaire est maintenu.","Ces heures peuvent être groupées en tout ou en partie, avec l'accord de l'employeur. Cette autorisation d'absence prend fin lorsque le salarié a retrouvé un emploi."],"situation":{"contrat salarié . convention collective . sociétés d'assurances . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 74","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=857303142C7FA3AE47A6F8FBA544F500.tplgfr36s_3?idArticle=KALIARTI000005792077&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sociétés d'assurances . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1672'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});