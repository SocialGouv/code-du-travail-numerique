
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "86");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 48","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857333&cidTexte=KALITEXT000005682357"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . publicité française . catégorie professionnelle":"'Agents de maîtrise et Techniciens'"}},
            {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 67","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857359&cidTexte=KALITEXT000005682357&dateTexte=19740607"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . publicité française . catégorie professionnelle":"'Cadres'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 29","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D95886BC7232B7E17E29C15F66690F00.tplgfr24s_2?idArticle=KALIARTI000005857303&cidTexte=KALITEXT000005682357&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . publicité française . catégorie professionnelle":"'Employés'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0086'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});