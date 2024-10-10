
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi, "787");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":"2 heures par journée d'ouverture du cabinet","unit":""},"expectedReferences":[{"article":"Article 6.2.2","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=182066BF8498AFCDBA859500C460D147.tplgfr41s_1?idArticle=KALIARTI000029786918&cidTexte=KALITEXT000005674852&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures."],"situation":{"contrat salarié . convention collective . comptables . typeRupture":"'Démission'","contrat salarié . convention collective . comptables . typeRupture Démission . ancienneté":"'Au moins 5 ans'"}},
          {"expectedResult":{"expectedValue":"2 heures par journée d'ouverture du cabinet","unit":""},"expectedReferences":[{"article":"Article 6.2.2","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=182066BF8498AFCDBA859500C460D147.tplgfr41s_1?idArticle=KALIARTI000029786918&cidTexte=KALITEXT000005674852&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":["Le salaire n'est pas maintenu.","Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures."],"situation":{"contrat salarié . convention collective . comptables . typeRupture":"'Démission'","contrat salarié . convention collective . comptables . typeRupture Démission . ancienneté":"'Moins de 5 ans'"}},
          {"expectedResult":{"expectedValue":"2 heures par journée d'ouverture du cabinet","unit":""},"expectedReferences":[{"article":"Article 6.2.2","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=182066BF8498AFCDBA859500C460D147.tplgfr41s_1?idArticle=KALIARTI000029786918&cidTexte=KALITEXT000005674852&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":["Le salaire est maintenu.","Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures."],"situation":{"contrat salarié . convention collective . comptables . typeRupture":"'Licenciement'"}},
          {"expectedResult":{"expectedValue":"D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.","unit":""},"expectedReferences":[{"article":"Article 6.2.2","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=182066BF8498AFCDBA859500C460D147.tplgfr41s_1?idArticle=KALIARTI000029786918&cidTexte=KALITEXT000005674852&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . comptables . typeRupture":"'Rupture de la période d'essai'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0787'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});