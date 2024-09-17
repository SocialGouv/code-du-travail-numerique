
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "843");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 32","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=35EAB16785909B4320F79BDE561E5E6A.tplgfr29s_2?idArticle=KALIARTI000005873153&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . boulangerie patisserie . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures d'absence par jour pendant la dernière semaine du préavis","unit":""},"expectedReferences":[{"article":"Article 32","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=35EAB16785909B4320F79BDE561E5E6A.tplgfr29s_2?idArticle=KALIARTI000005873153&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.","Les heures sont fixées un jour par l' employeur et le suivant par le salarié. Ils peuvent décider de regrouper tout ou partie de ces heures."],"situation":{"contrat salarié . convention collective . boulangerie patisserie . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 17","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005873126&cidTexte=KALITEXT000005688564"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . boulangerie patisserie . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0843'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});