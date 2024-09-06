
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "176");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par jour en cas de démission légitime donnant droit à l'allocation chômage","unit":""},"expectedReferences":[{"article":"Article 35","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=6E001A9C1CB6E3CA6403A26757E06D12.tplgfr24s_2?idArticle=KALIARTI000039117109&cidTexte=KALITEXT000039116990&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures sont fixées un jour par le salarié, un jour par l'employeur. Si le salarié demande que ces heures se cumulent en fin de préavis, l'employeur devra accepter."],"situation":{"contrat salarié . convention collective . industrie pharmaceutique . typeRupture":"'Démission'"}},
            {"expectedResult":{"expectedValue":"2 heures par jour","unit":""},"expectedReferences":[{"article":"Article 35","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=6E001A9C1CB6E3CA6403A26757E06D12.tplgfr24s_2?idArticle=KALIARTI000039117109&cidTexte=KALITEXT000039116990&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures sont fixées un jour par le salarié, un jour par l'employeur. Si le salarié demande que ces heures se cumulent en fin de préavis, l'employeur devra accepter."],"situation":{"contrat salarié . convention collective . industrie pharmaceutique . typeRupture":"'Licenciement'"}},
            {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 32","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0C62DECC245C15CC0C1B7D257B3A84A3.tplgfr24s_2?idArticle=KALIARTI000039117098&cidTexte=KALITEXT000039116990&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . industrie pharmaceutique . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0176'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});