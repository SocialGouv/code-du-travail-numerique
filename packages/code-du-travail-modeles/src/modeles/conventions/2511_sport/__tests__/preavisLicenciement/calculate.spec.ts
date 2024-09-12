
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "2511");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"article 4.4.3.2 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"article 4.4.3.2 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . catégorie professionnelle":"'Noncadres'","contrat salarié . convention collective . sport . catégorie professionnelle Noncadres . ancienneté":"'Moins de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"article 4.4.3.2 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000021063914&cidTexte=KALITEXT000017577657"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . sport . catégorie professionnelle":"'Noncadres'","contrat salarié . convention collective . sport . catégorie professionnelle Noncadres . ancienneté":"'Plus de 2 ans'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2511'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});