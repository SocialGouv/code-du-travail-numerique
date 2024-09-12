
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "573");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 35","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=182066BF8498AFCDBA859500C460D147.tplgfr41s_1?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de gros . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour dans la limite de 40 heures pour l'ensemble du préavis","unit":""},"expectedReferences":[{"article":"Article 35","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=182066BF8498AFCDBA859500C460D147.tplgfr41s_1?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","L'employeur et le salarié décident à tour de rôle de la prise de ces heures au cours de la journée. L'employeur et le salarié peuvent se mettre d'accord pour regrouper ces heures d'absence en tenant compte des nécessités du service."],"situation":{"contrat salarié . convention collective . commerces de gros . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 33","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802018&cidTexte=KALITEXT000005673619&dateTexte=20120223"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de gros . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0573'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});