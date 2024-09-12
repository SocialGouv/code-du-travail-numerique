
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1483");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 9 du Chapitre II de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=CECFB7040D4AD808574E3CBBFE8B1E43.tplgfr34s_1?idSectionTA=KALISCTA000005750625&cidTexte=KALITEXT000005675211&idConvention=KALICONT000005635594"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Agents de maîtrise'"}},
          {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 9 du Chapitre II de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=CECFB7040D4AD808574E3CBBFE8B1E43.tplgfr34s_1?idSectionTA=KALISCTA000005750625&cidTexte=KALITEXT000005675211&idConvention=KALICONT000005635594"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":2,"unit":"semaines"},"expectedReferences":[{"article":"Article 14 du Chapitre Ier de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005761249&cidTexte=KALITEXT000005675211&idConvention=KALICONT000005635594&dateTexte=29990101"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle Employés . ancienneté":"'Moins de 6 mois'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 14 du Chapitre Ier de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005761249&cidTexte=KALITEXT000005675211&idConvention=KALICONT000005635594&dateTexte=29990101"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle Employés . ancienneté":"'Plus de 6 mois'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1483'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});