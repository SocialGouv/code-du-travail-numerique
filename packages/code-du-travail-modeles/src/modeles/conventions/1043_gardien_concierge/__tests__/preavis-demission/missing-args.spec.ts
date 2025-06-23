import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1043");

describe("Test de vérification du bug corrigé pour la CC 1043 - Gardien Concierge", () => {
  test("Vérifier que le calculate fonctionne pour logement Non-logé avec coefficient inférieur ou égal à 602", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1043'",
      "contrat salarié . convention collective . gardien concierge . logement":
        "'Non-logé'",
      "contrat salarié . convention collective . gardien concierge . logement . Non-logé . coefficient":
        "'Inférieur ou égal à 602'",
    });

    expect(result).toResultBeEqual(8, "jours");
    expect(result).toHaveReferencesBeEqual([
      {
        article: "Article 14",
        url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id",
      },
    ]);
    expect(result).toContainNotifications([]);
  });

  test("Vérifier que le calculate fonctionne pour logement Non-logé avec coefficient supérieur à 602", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1043'",
      "contrat salarié . convention collective . gardien concierge . logement":
        "'Non-logé'",
      "contrat salarié . convention collective . gardien concierge . logement . Non-logé . coefficient":
        "'Supérieur à 602'",
    });

    expect(result).toResultBeEqual(1, "mois");
    expect(result).toHaveReferencesBeEqual([
      {
        article: "Article 14",
        url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id",
      },
    ]);
    expect(result).toContainNotifications([]);
  });

  test("Vérifier que le calculate fonctionne pour logement Logé", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1043'",
      "contrat salarié . convention collective . gardien concierge . logement":
        "'Logé'",
    });

    expect(result).toResultBeEqual(1, "mois");
    expect(result).toHaveReferencesBeEqual([
      {
        article: "Article 14",
        url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id",
      },
    ]);
    expect(result).toContainNotifications([]);
  });

  test("Vérifier que les questions manquantes sont bien gérées", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1043'",
    });

    expect(result).toNextMissingQuestionBeEqual("Le salarié est-il logé ?");
  });

  test("Vérifier que la question sur le coefficient est demandée pour Non-logé", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1043'",
      "contrat salarié . convention collective . gardien concierge . logement":
        "'Non-logé'",
    });

    expect(result).toNextMissingQuestionBeEqual(
      "Quel est le coefficient hiérarchique du salarié ?"
    );
  });
});
