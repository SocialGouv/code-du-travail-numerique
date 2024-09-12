
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1606");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 8 de l'annexe \"agents de maîtrise\"","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0832656ABC6E21C910218E6299A686E0.tpdila23v_2?idArticle=KALIARTI000005870771&cidTexte=KALITEXT000005687528&dateTexte=19930629"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . bricolage . catégorie professionnelle":"'Agents de maîtrise'"}},
          {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 8 de l'annexe \"cadres\"","url":"https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=087F78E34949639D3C28EC165BE5AB3A.tplgfr32s_2?idSectionTA=KALISCTA000005731919&cidTexte=KALITEXT000005687530&idConvention=KALICONT000005635871"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . bricolage . catégorie professionnelle":"'Cadres'"}},
          {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 9.1 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000024633414&cidTexte=KALITEXT000005687520&idConvention=KALICONT000005635871&dateTexte=29990101"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . bricolage . catégorie professionnelle":"'Employés'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1606'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});