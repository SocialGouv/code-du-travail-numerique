
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "1483");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Agents de maîtrise'"},"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 9, chapitre II","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A8279343D320ACDCBDFC588C32FB25B3.tplgfr22s_1?idArticle=KALIARTI000005840302&cidTexte=KALITEXT000005675211&dateTexte=29990101&categorieLien=id"}]},
            {"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Cadres'"},"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 9, chapitre II","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A8279343D320ACDCBDFC588C32FB25B3.tplgfr22s_1?idArticle=KALIARTI000005840302&cidTexte=KALITEXT000005675211&dateTexte=29990101&categorieLien=id"}]},
            {"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle Employés . ancienneté":"'6 mois ou moins'"},"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"Article 15, chapitre I","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A8279343D320ACDCBDFC588C32FB25B3.tplgfr22s_1?idArticle=KALIARTI000005840261&cidTexte=KALITEXT000005675211&dateTexte=29990101&categorieLien=id"}]},
            {"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle Employés . ancienneté":"'Plus de 6 mois à 2 ans'"},"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 15, chapitre I","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A8279343D320ACDCBDFC588C32FB25B3.tplgfr22s_1?idArticle=KALIARTI000005840261&cidTexte=KALITEXT000005675211&dateTexte=29990101&categorieLien=id"}]},
            {"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle Employés . ancienneté":"'2 ans ou plus'"},"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 15, chapitre I","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A8279343D320ACDCBDFC588C32FB25B3.tplgfr22s_1?idArticle=KALIARTI000005840261&cidTexte=KALITEXT000005675211&dateTexte=29990101&categorieLien=id"}]}])(
    "Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1483'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
  });
});