
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1517");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'I'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'II'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'III'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'IV'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'V'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'VI'"}},
            {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'VII'"}},
            {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'VIII'"}},
            {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Chapitre VI, Article 1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . commerces de detail non alimentaires . niveau":"'IX'"}}])(
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