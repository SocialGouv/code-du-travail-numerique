
import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1147");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 25 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F4547682D53DBCC86360428C5C1B153D.tplgfr36s_3?idArticle=KALIARTI000027745280&cidTexte=KALITEXT000005681857&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":["Attention, pour les personnels en CDD entre 1 et 6 mois de présence, le préavis est de 8 jours."],"situation":{"contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":"'Cadres'"}},
            {"expectedResult":{"expectedValue":15,"unit":"jours"},"expectedReferences":[{"article":"Article 25 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F4547682D53DBCC86360428C5C1B153D.tplgfr36s_3?idArticle=KALIARTI000027745280&cidTexte=KALITEXT000005681857&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":"'Noncadres'","contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle Noncadres . ancienneté":"'Moins de 6 mois'"}},
            {"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 25 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F4547682D53DBCC86360428C5C1B153D.tplgfr36s_3?idArticle=KALIARTI000027745280&cidTexte=KALITEXT000005681857&dateTexte=29981231&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":"'Noncadres'","contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle Noncadres . ancienneté":"'6 mois et plus'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1147'",
        
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});