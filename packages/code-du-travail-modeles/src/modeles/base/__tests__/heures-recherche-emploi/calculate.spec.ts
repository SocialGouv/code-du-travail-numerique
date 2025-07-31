import { HeuresRechercheEmploiPublicodes } from "../../../../publicodes";

const engine = new HeuresRechercheEmploiPublicodes(modelsHeuresRechercheEmploi);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que pour le légal donne heures de recherche emploi", () => {
    const result = engine.calculate({});
    expect(result).toResultBeEqual("", undefined);
    expect(result).toHaveReferencesBeEqual([
      {
        article: "Article L. 1234-17 du code du travail",
        url: "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=CC74669AD1BB161A1534D72EE0B76FE4.tplgfr29s_3?idArticle=LEGIARTI000006901133&cidTexte=LEGITEXT000006072050&dateTexte=20200102",
      },
    ]);
  });
});
