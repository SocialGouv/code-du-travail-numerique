
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2148");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . télécommunications . groupe":"'A et B'","contrat salarié . convention collective . télécommunications . groupe A et B . ancienneté":"'Moins de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . télécommunications . groupe":"'A et B'","contrat salarié . convention collective . télécommunications . groupe A et B . ancienneté":"'Plus de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . télécommunications . groupe":"'C et D'"}},
          {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . télécommunications . groupe":"'E, F et G'"}},
          {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 4.4.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . télécommunications . groupe":"'Hors classification'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2148'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});