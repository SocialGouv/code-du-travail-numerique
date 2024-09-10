
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "1266");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 13","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":["sauf stipulation contractuelle différente"],"situation":{"contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":"'Cadres'"}},
            {"expectedResult":{"expectedValue":8,"unit":"jours"},"expectedReferences":[{"article":"Article 13","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . restauration collectivités . catégorie professionnelle Employés . ancienneté":"'Moins de 6 mois'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 13","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . restauration collectivités . catégorie professionnelle Employés . ancienneté":"'6 mois à 2 ans'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 13","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . restauration collectivités . catégorie professionnelle Employés . ancienneté":"'Plus de 2 ans'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 13","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":"'Maîtrises'","contrat salarié . convention collective . restauration collectivités . catégorie professionnelle Maîtrises . ancienneté":"'2 ans ou moins'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 13","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":"'Maîtrises'","contrat salarié . convention collective . restauration collectivités . catégorie professionnelle Maîtrises . ancienneté":"'Plus de 2 ans'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1266'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});