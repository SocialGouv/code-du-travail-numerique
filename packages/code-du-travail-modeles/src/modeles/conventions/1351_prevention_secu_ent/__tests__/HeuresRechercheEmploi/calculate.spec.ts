
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "1351");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 6.13","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=456DF000CBCD95E4D28EEF8B7E60CE88.tplgfr24s_1?idArticle=KALIARTI000021994236&cidTexte=KALITEXT000005680914&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . prevention sécurité entreprise . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour ouvré","unit":""},"expectedReferences":[{"article":"Article 6.13","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=456DF000CBCD95E4D28EEF8B7E60CE88.tplgfr24s_1?idArticle=KALIARTI000021994236&cidTexte=KALITEXT000005680914&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les 2 heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider, par écrit, de les regrouper. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié. Le salarié qui a trouvé un emploi ne peut plus utiliser ces heures."],"situation":{"contrat salarié . convention collective . prevention sécurité entreprise . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 6.13","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=456DF000CBCD95E4D28EEF8B7E60CE88.tplgfr24s_1?idArticle=KALIARTI000021994236&cidTexte=KALITEXT000005680914&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . prevention sécurité entreprise . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1351'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});