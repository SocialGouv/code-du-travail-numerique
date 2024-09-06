
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "2098");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 19.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle":"'Cadres'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 19.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle Employés . ancienneté":"'2 ans ou moins'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 19.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle Employés . ancienneté":"'Plus de 2 ans'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 19.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle":"'Techniciens et agents de maîtrise TAM'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});