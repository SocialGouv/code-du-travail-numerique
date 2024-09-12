
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "843");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 6 de l'annexe  Statut du personnel d'encadrement","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000038678849&cidTexte=KALITEXT000005688564&dateTexte=20190827"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"semaine"},"expectedReferences":[{"article":"Article 32 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005873153&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":"'Personnel de fabrication, personnel de vente et personnel de services'","contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle Personnel de fabrication, personnel de vente et personnel de services . ancienneté":"'Moins de 6 mois'"}},
          {"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"Article 32 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005873153&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":"'Personnel de fabrication, personnel de vente et personnel de services'","contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle Personnel de fabrication, personnel de vente et personnel de services . ancienneté":"'Plus de 6 mois'"}}])(
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