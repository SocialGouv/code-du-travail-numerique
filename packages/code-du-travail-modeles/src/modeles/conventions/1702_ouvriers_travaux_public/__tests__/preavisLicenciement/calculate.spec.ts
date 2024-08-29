
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "1702");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"situation":{"contrat salarié . convention collective . ouvriers travaux public . ancienneté":"'Au delà de la période d'essai et jusqu'à 3 mois'"},"expectedResult":{"expectedValue":2,"unit":"jours"},"expectedReferences":[{"article":"Article 10.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=63146BC1A1D3059843F8953CF57BE0FC.tpdila07v_3?idArticle=KALIARTI000005801846&cidTexte=KALITEXT000005658951&dateTexte=20120513"}]},
            {"situation":{"contrat salarié . convention collective . ouvriers travaux public . ancienneté":"'De 3 à 6 mois'"},"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"Article 10.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=63146BC1A1D3059843F8953CF57BE0FC.tpdila07v_3?idArticle=KALIARTI000005801846&cidTexte=KALITEXT000005658951&dateTexte=20120513"}]},
            {"situation":{"contrat salarié . convention collective . ouvriers travaux public . ancienneté":"'6 mois à 2 ans'"},"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 10.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=63146BC1A1D3059843F8953CF57BE0FC.tpdila07v_3?idArticle=KALIARTI000005801846&cidTexte=KALITEXT000005658951&dateTexte=20120513"}]},
            {"situation":{"contrat salarié . convention collective . ouvriers travaux public . ancienneté":"'Plus de 2 ans'"},"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 10.1.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=63146BC1A1D3059843F8953CF57BE0FC.tpdila07v_3?idArticle=KALIARTI000005801846&cidTexte=KALITEXT000005658951&dateTexte=20120513"}]}])(
    "Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1702'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
  });
});