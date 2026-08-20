import { IndemnitePrecaritePublicodes } from "../../../../../publicodes/IndemnitePrecaritePublicodes";

const engine = new IndemnitePrecaritePublicodes(
  modelsIndemnitePrecarite,
  "1486"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 120, unit: "€" },
      expectedReferences: [
        {
          article:
            "Article 53 de l'accord du 16 décembre 1991 relatif aux enquêteurs",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851356/?idConteneur=KALICONT000005635173",
        },
        {
          article: "Article L1243-4 du code du travail",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000024026880",
        },
        {
          article: "Article L1243-8 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501",
        },
        {
          article: "Article L1243-9 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech=",
        },
        {
          article: "Article L1243-10 du code du travail",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901221",
        },
      ],
      expectedNotifications: [],
      expectedFormula: {
        formula: "4/100 * S",
        explanations: ["S : Salaires renseignés (3000 €)"],
      },
      situation: {
        "contrat salarié . type de cdd": "'usage enquêteurs vacataires'",
      },
    },
    {
      expectedResult: { expectedValue: 180, unit: "€" },
      expectedReferences: [
        {
          article:
            "Chapitre III de l'accord du 5 juillet 2001 relatif au statut des salariés du secteur d'activité d'organisation des foires, salons et congrès",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851689/?idConteneur=KALICONT000005635173",
        },
        {
          article: "Article L1243-4 du code du travail",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000024026880",
        },
        {
          article: "Article L1243-8 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501",
        },
        {
          article: "Article L1243-9 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech=",
        },
        {
          article: "Article L1243-10 du code du travail",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901221",
        },
      ],
      expectedNotifications: [],
      expectedFormula: {
        formula: "6/100 * S",
        explanations: ["S : Salaires renseignés (3000 €)"],
      },
      situation: {
        "contrat salarié . type de cdd": "'usage intervention évènementiel'",
      },
    },
    {
      expectedResult: { expectedValue: 300, unit: "€" },
      expectedReferences: [
        {
          article: "Article L1243-8 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901219&cidTexte=LEGITEXT000006072050&dateTexte=20080501",
        },
        {
          article: "Article L1243-9 du code du travail",
          url: "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=0FA35871C82B78139407AE9BD9480D9B.tplgfr31s_2?idArticle=LEGIARTI000006901220&cidTexte=LEGITEXT000006072050&dateTexte=20080501&categorieLien=id&oldAction=&nbResultRech=",
        },
      ],
      expectedNotifications: [],
      expectedFormula: {
        formula: "1/10 * S",
        explanations: ["S : Salaires renseignés (3000 €)"],
      },
      situation: { "contrat salarié . type de cdd": "'Autres'" },
    },
  ])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({
      situation,
      expectedResult,
      expectedReferences,
      expectedNotifications,
      expectedFormula,
    }) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . salaire de référence": "3000",
        "contrat salarié . type de contrat": "'CDD'",
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'autre'",
        ...situation,
      });
      expect(result).toFormulaBeEqual(
        expectedFormula.formula,
        expectedFormula.explanations
      );
      expect(result).toResultBeEqual(
        expectedResult.expectedValue,
        expectedResult.unit
      );
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
    }
  );
});
