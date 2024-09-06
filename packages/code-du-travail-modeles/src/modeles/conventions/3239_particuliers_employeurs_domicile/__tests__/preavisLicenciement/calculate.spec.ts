
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "3239");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":1,"unit":"semaine"},"expectedReferences":[],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":"'Salariés du particulier employeur'","contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Salariés du particulier employeur . ancienneté":"'Moins de 6 mois'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":"'Salariés du particulier employeur'","contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Salariés du particulier employeur . ancienneté":"'6 mois à 2 ans'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":"'Salariés du particulier employeur'","contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Salariés du particulier employeur . ancienneté":"'2 ans ou plus'"}},
            {"expectedResult":{"expectedValue":8,"unit":"jours"},"expectedReferences":[],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":"'Assistants maternels du particulier employeur'","contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Assistants maternels du particulier employeur . ancienneté":"'Enfant accueilli depuis moins de 3 mois'"}},
            {"expectedResult":{"expectedValue":15,"unit":"jours"},"expectedReferences":[],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":"'Assistants maternels du particulier employeur'","contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Assistants maternels du particulier employeur . ancienneté":"'Enfant accueilli de 3 mois à moins d'un an'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":"'Assistants maternels du particulier employeur'","contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Assistants maternels du particulier employeur . ancienneté":"'Enfant accueilli depuis 1 an et plus'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});