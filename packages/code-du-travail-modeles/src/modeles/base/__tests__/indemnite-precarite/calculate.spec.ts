import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecaritePublicodes";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite);

const REFERENCES_CDD = [
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
];

const REFERENCES_CTT = [
  {
    article: "Article L1251-32 du code du travail",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901285",
  },
  {
    article: "Article L1251-33 du code du travail",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019869550",
  },
];

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que le CDD générique donne 10% de la rémunération brute", () => {
    const result = engine.calculate({
      "contrat salarié . type de contrat": "'CDD'",
      "contrat salarié . type de cdd": "'Autres'",
      "contrat salarié . fin à la date prévue": "'oui'",
      "contrat salarié . issue du contrat": "'autre'",
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toResultBeEqual(300, "€");
  });

  test("Vérifier que le CTT générique donne 10% de la rémunération brute", () => {
    const result = engine.calculate({
      "contrat salarié . type de contrat": "'CTT'",
      "contrat salarié . type de cdd": "'Autres'",
      "contrat salarié . fin à la date prévue": "'oui'",
      "contrat salarié . issue du contrat": "'autre'",
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toResultBeEqual(300, "€");
  });

  test("Le CDD renvoie les références de l'indemnité de fin de contrat", () => {
    const result = engine.calculate({
      "contrat salarié . type de contrat": "'CDD'",
      "contrat salarié . type de cdd": "'Autres'",
      "contrat salarié . fin à la date prévue": "'oui'",
      "contrat salarié . issue du contrat": "'autre'",
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toHaveReferencesBeEqual(REFERENCES_CDD);
  });

  test("Le CTT renvoie les références de l'indemnité de fin de mission", () => {
    const result = engine.calculate({
      "contrat salarié . type de contrat": "'CTT'",
      "contrat salarié . type de cdd": "'Autres'",
      "contrat salarié . fin à la date prévue": "'oui'",
      "contrat salarié . issue du contrat": "'autre'",
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toHaveReferencesBeEqual(REFERENCES_CTT);
  });
});
