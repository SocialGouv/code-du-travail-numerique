
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "675");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par jour","unit":""},"expectedReferences":[{"article":"Article 39","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AF6CA15C9F4A85C0EE9D4210D1FFD9A4.tplgfr41s_1?idArticle=KALIARTI000005851079&cidTexte=KALITEXT000005679762&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures absences sont fixées d'un commun accord entre l'employeur et le salarié, et peuvent être groupées. A défaut d'accord, ces heures absences sont fixées un jour par l'employeur et le suivant par le salarié."],"situation":{"contrat salarié . convention collective . habillement commerce succursales . typeRupture":"'Démission'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour","unit":""},"expectedReferences":[{"article":"Article 39","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AF6CA15C9F4A85C0EE9D4210D1FFD9A4.tplgfr41s_1?idArticle=KALIARTI000005851079&cidTexte=KALITEXT000005679762&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures absences sont fixées d'un commun accord entre l'employeur et le salarié, et peuvent être groupées. A défaut d'accord, ces heures absences sont fixées un jour par l'employeur et le suivant par le salarié."],"situation":{"contrat salarié . convention collective . habillement commerce succursales . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"2 heures par jour après un mois d'essai","unit":""},"expectedReferences":[{"article":"Article 39","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AF6CA15C9F4A85C0EE9D4210D1FFD9A4.tplgfr41s_1?idArticle=KALIARTI000005851079&cidTexte=KALITEXT000005679762&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures absences sont fixées d'un commun accord entre l'employeur et le salarié, et peuvent être groupées. A défaut d'accord, ces heures absences sont fixées: un jour par l'employeur, et le suivant par le salarié."],"situation":{"contrat salarié . convention collective . habillement commerce succursales . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0675'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});