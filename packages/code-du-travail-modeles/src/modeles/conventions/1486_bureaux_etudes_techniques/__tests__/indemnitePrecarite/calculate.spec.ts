
import { IndemnitePrecaritePublicodes } from "../../../../../publicodes/IndemnitePrecarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite, "1486");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([{"expectedResult":{"expectedValue":120,"unit":"€"},"expectedReferences":[{"article":"article 53 de l'annexe relative aux enquêteurs - Accord du 16 décembre 1991","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7625C278F6496D100BB4EC20B6D7BAA7.tplgfr25s_3?idArticle=KALIARTI000005851356&cidTexte=KALITEXT000005679885&dateTexte=29990101&categorieLien=id"}],"expectedNotifications":[],"expectedFormula":{"formula":"4/100 * Sref","explanations":["Sref : Salaire de référence (3000 €)"]},"situation":{"contrat salarié . type de cdd":"'Enquêteurs vacataires'"}},
          {"expectedResult":{"expectedValue":180,"unit":"€"},"expectedReferences":[{"article":"Chapitre III : Contrat d'intervention à durée déterminée de l'accord du 5 juillet 2001 relatif au statut des salariés du secteur d'activité d'organisation des foires, salons et congrès","url":"https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005851689&cidTexte=KALITEXT000005679946&dateTexte=20190918"}],"expectedNotifications":[],"expectedFormula":{"formula":"6/100 * Sref","explanations":["Sref : Salaire de référence (3000 €)"]},"situation":{"contrat salarié . type de cdd":"'Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès'","contrat salarié . avec proposition cdi":"'non'"}},
          {"expectedResult":{"expectedValue":300,"unit":"€"},"expectedReferences":[{"article":"Article L1243-8 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501"},{"article":"Article L1243-9 du code du travail","url":"https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech="}],"expectedNotifications":[],"expectedFormula":{"formula":"1/10 * Sref","explanations":["Sref : Salaire de référence (3000 €)"]},"situation":{"contrat salarié . type de cdd":"'Autres'"}}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications, expectedFormula}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . salaire de référence": "3000",
        "contrat salarié . contractType": "'CDD'",
        "contrat salarié . finContratPeriodeDessai": "non",
        "contrat salarié . propositionCDIFindeContrat": "non",
        "contrat salarié . refusCDIFindeContrat": "non",
        "contrat salarié . interruptionFauteGrave": "non",
        "contrat salarié . refusRenouvellementAuto": "non",
        "contrat salarié . cttFormation": "non",
        "contrat salarié . ruptureContratFauteGrave": "non",
        "contrat salarié . propositionCDIFinContrat": "non",
        "contrat salarié . refusSouplesse": "non",
        ...situation,
      });
        expect(result).toFormulaBeEqual(expectedFormula.formula, expectedFormula.explanations);
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});