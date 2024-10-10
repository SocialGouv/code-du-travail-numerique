
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "292");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Avenant Cadres, Article 8","url":"https://www.legifrance.gouv.fr/affichIDCC.do?cidTexte=KALITEXT000005682082&idSectionTA=KALISCTA000005726361&idConvention=KALICONT000005635856&dateTexte=29990101"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . plasturgie . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Avenant Collaborateurs, Article 15","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856709&cidTexte=KALITEXT000005682080&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . plasturgie . catégorie professionnelle":"'Collaborateurs'","contrat salarié . convention collective . plasturgie . catégorie professionnelle Collaborateurs . coefficient":"'700 à 750'","contrat salarié . convention collective . plasturgie . catégorie professionnelle Collaborateurs . coefficient 700 à 750 . ancienneté":"'Moins de 2 ans'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Avenant Collaborateurs, Article 15","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856709&cidTexte=KALITEXT000005682080&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . plasturgie . catégorie professionnelle":"'Collaborateurs'","contrat salarié . convention collective . plasturgie . catégorie professionnelle Collaborateurs . coefficient":"'700 à 750'","contrat salarié . convention collective . plasturgie . catégorie professionnelle Collaborateurs . coefficient 700 à 750 . ancienneté":"'2 ans ou plus'"}},
          {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Avenant Collaborateurs, Article 15","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856709&cidTexte=KALITEXT000005682080&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . plasturgie . catégorie professionnelle":"'Collaborateurs'","contrat salarié . convention collective . plasturgie . catégorie professionnelle Collaborateurs . coefficient":"'800 à 830 inclus'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});