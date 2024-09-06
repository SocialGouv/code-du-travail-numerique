
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "2614");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E154C093E99FDBC15E7328F16C01CDA4.tplgfr37s_1?idArticle=KALIARTI000018926304&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . travaux publics . âge":"'Moins de 55 ans'","contrat salarié . convention collective . travaux publics . âge Moins de 55 ans . ancienneté":"'Moins de 2 ans'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E154C093E99FDBC15E7328F16C01CDA4.tplgfr37s_1?idArticle=KALIARTI000018926304&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . travaux publics . âge":"'Moins de 55 ans'","contrat salarié . convention collective . travaux publics . âge Moins de 55 ans . ancienneté":"'2 ans ou plus'"}},
            {"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E154C093E99FDBC15E7328F16C01CDA4.tplgfr37s_1?idArticle=KALIARTI000018926304&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . travaux publics . âge":"'55 ans et plus'","contrat salarié . convention collective . travaux publics . âge 55 ans et plus . ancienneté":"'Au moins 15 ans d'ancienneté'"}},
            {"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1 de la convention collective","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E154C093E99FDBC15E7328F16C01CDA4.tplgfr37s_1?idArticle=KALIARTI000018926304&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"situation":{"contrat salarié . convention collective . travaux publics . âge":"'55 ans et plus'","contrat salarié . convention collective . travaux publics . âge 55 ans et plus . ancienneté":"'Moins de 15 ans d'ancienneté'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2614'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});