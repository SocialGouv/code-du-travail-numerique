
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "3127");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 1. 1 de la section 1 du Chapitre 4 de la Partie II de la convention collective","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E5B5B8F059E9188492430B0C2B630256.tplgfr29s_3?idArticle=KALIARTI000027034201&cidTexte=KALITEXT000026943196&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . entreprises de services à la personne . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"4 heures par semaine","unit":""},"expectedReferences":[{"article":"Article 1. 1 de la section 1 du Chapitre 4 de la Partie II de la convention collective","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E5B5B8F059E9188492430B0C2B630256.tplgfr29s_3?idArticle=KALIARTI000027034201&cidTexte=KALITEXT000026943196&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["","Les 4 heures peuvent être prises un jour, comme le souhaite le salarié, ou selon d'autres confitions fixées d'un commun accord entre l'employeur et le salarié."],"situation":{"contrat salarié . convention collective . entreprises de services à la personne . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D'après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d'heures d'absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Section 2 Période d'essai du contrat de travail à durée indéterminée","url":"https//www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8F2D5914256C40BA951DD21EC1A2C521.tplgfr29s_3?idArticle=KALIARTI000026943300&cidTexte=KALITEXT000026943196&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . entreprises de services à la personne . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3127'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});