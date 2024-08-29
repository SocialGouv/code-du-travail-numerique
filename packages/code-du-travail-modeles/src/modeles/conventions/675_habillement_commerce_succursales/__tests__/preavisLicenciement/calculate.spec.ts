
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "675");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"situation":{"contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":"'Agents de maîtrise'"},"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"article 9 de l'avenant « Maîtrise »","url":"https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005752473&cidTexte=KALITEXT000005679768&idConvention=KALICONT000005635617&dateTexte=29990101"}]},
            {"situation":{"contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":"'Cadres'"},"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"article 13 de l'avenant « Cadres »","url":"https://www.legifrance.gouv.fr/affichIDCC.do?cidTexte=KALITEXT000005679774&idSectionTA=KALISCTA000005752482&idConvention=KALICONT000005635617&dateTexte=29990101"}]},
            {"situation":{"contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle Employés . ancienneté":"'Moins de 1 mois'"},"expectedResult":{"expectedValue":0,"unit":"mois"},"expectedReferences":[{"article":"Article 38","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=42225D4AAFE4AE3882C5685E66B8B640.tpdjo02v_2?idSectionTA=KALISCTA000005723965&cidTexte=KALITEXT000005679762&idConvention=KALICONT000005635617"}]},
            {"situation":{"contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle Employés . ancienneté":"'1 mois à moins de 6 mois'"},"expectedResult":{"expectedValue":15,"unit":"jours"},"expectedReferences":[{"article":"Article 38","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=42225D4AAFE4AE3882C5685E66B8B640.tpdjo02v_2?idSectionTA=KALISCTA000005723965&cidTexte=KALITEXT000005679762&idConvention=KALICONT000005635617"}]},
            {"situation":{"contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle Employés . ancienneté":"'6 mois à moins de 2 ans'"},"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 38","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=42225D4AAFE4AE3882C5685E66B8B640.tpdjo02v_2?idSectionTA=KALISCTA000005723965&cidTexte=KALITEXT000005679762&idConvention=KALICONT000005635617"}]},
            {"situation":{"contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":"'Employés'","contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle Employés . ancienneté":"'2 ans ou plus'"},"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 38","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=42225D4AAFE4AE3882C5685E66B8B640.tpdjo02v_2?idSectionTA=KALISCTA000005723965&cidTexte=KALITEXT000005679762&idConvention=KALICONT000005635617"}]}])(
    "Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
  });
});