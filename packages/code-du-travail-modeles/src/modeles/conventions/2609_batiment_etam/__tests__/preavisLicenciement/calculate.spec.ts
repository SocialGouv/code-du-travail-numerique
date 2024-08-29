
import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement, "2609");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"situation":{"contrat salarié . convention collective . batiment etam . âge":"'Moins de 55 ans'","contrat salarié . convention collective . batiment etam . âge Moins de 55 ans . ancienneté":"'Moins de 2 ans'"},"expectedResult":{"expectedValue":1,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7C6D5292CB5A9AA0DB357C8DEC36C6EB.tplgfr36s_2?idArticle=KALIARTI000018773769&cidTexte=KALITEXT000018773681&dateTexte=29990101&categorieLien=id"}]},
            {"situation":{"contrat salarié . convention collective . batiment etam . âge":"'Moins de 55 ans'","contrat salarié . convention collective . batiment etam . âge Moins de 55 ans . ancienneté":"'2 ans ou plus'"},"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7C6D5292CB5A9AA0DB357C8DEC36C6EB.tplgfr36s_2?idArticle=KALIARTI000018773769&cidTexte=KALITEXT000018773681&dateTexte=29990101&categorieLien=id"}]},
            {"situation":{"contrat salarié . convention collective . batiment etam . âge":"'Plus de 55 ans'","contrat salarié . convention collective . batiment etam . âge Plus de 55 ans . ancienneté":"'Au moins 15 ans d'ancienneté'"},"expectedResult":{"expectedValue":3,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7C6D5292CB5A9AA0DB357C8DEC36C6EB.tplgfr36s_2?idArticle=KALIARTI000018773769&cidTexte=KALITEXT000018773681&dateTexte=29990101&categorieLien=id"}]},
            {"situation":{"contrat salarié . convention collective . batiment etam . âge":"'Plus de 55 ans'","contrat salarié . convention collective . batiment etam . âge Plus de 55 ans . ancienneté":"'Moins de 15 ans d'ancienneté'"},"expectedResult":{"expectedValue":2,"unit":"mois"},"expectedReferences":[{"article":"Article 8.1","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7C6D5292CB5A9AA0DB357C8DEC36C6EB.tplgfr36s_2?idArticle=KALIARTI000018773769&cidTexte=KALITEXT000018773681&dateTexte=29990101&categorieLien=id"}]}])(
    "Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
  });
});