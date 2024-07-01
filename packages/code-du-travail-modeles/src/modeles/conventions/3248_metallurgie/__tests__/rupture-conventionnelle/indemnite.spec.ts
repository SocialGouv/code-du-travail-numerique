import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "3248"
);

const expectedReferencesGroupeABBCDEFNonCadre = [
  {
    article: "Article 75.3.1.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314537?idConteneur=KALICONT000046993250#KALIARTI000046314537",
  },
];

const expectedReferenceForfaitJour = {
  article: "Article 73",
  url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314519?idConteneur=KALICONT000046993250#KALIARTI000046314519",
};

const expectedReferencesGroupeABBCDEFCadre = [
  {
    article: "Article 68",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
  },
  {
    article: "Article 75.3.1.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314537?idConteneur=KALICONT000046993250#KALIARTI000046314537",
  },
  {
    article: "Article 75.3.1.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314538?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314538",
  },
];

const expectedReferenceGroupeFGHI = [
  {
    article: "Article 75.3.1.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314538?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314538",
  },
  {
    article: "Article 75.3.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314541?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314541",
  },
];

const expectedLegalReferences = [
  {
    article: "Article L. 1234-9 à L. 1234-11",
    url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006195623/#LEGISCTA000006195623",
  },
  {
    article: "Art. R. 1234-1 à R. 1234-5",
    url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018483186/#LEGISCTA000018537572",
  },
  {
    article: "Art. L. 1226-7",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023272293",
  },
  {
    article: "Art. L. 1225-54",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018764621",
  },
  {
    article: "Art. L. 1225-65",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038219280",
  },
];

describe("Calcul de l'indemnité de licenciement pour CC 3248", () => {
  describe("Groupe A,B,C,D,E (jamais cadre)", () => {
    test("Calcul de base", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'A, B, C, D ou E'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
          "'Non'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
          "'Non'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods: '[{"month":"janvier 2024","value":2668}]',
        typeContratTravail: "cdi",
      });

      expect(result).toAgreementResultBeEqual(444.67, "€");
      expect(result).toHaveReferencesBeEqual(
        expectedReferencesGroupeABBCDEFNonCadre
      );
    });
  });

  describe("Groupe A,B,C,D,E (forfait jour - jamais cadre)", () => {
    test("Calcul de base", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'A, B, C, D ou E'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
          "'Non'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
          "'Oui'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods: '[{"month":"janvier 2024","value":2668}]',
        typeContratTravail: "cdi",
      });

      expect(result).toAgreementResultBeEqual(667, "€");
      expect(result).toHaveReferencesBeEqual(
        expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferenceForfaitJour
        )
      );
    });
  });

  describe("Groupe A,B,C,D,E (cadre)", () => {
    test("Calcul de base", () => {
      const result = engine.calculate({
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
          "'Non'",
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'A, B, C, D ou E'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
          "'Non'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . remplit conditions pour la retraite":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age":
          "30",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2004",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods: '[{"month":"janvier 2024","value":2668}]',
        typeContratTravail: "cdi",
      });

      expect(result).toAgreementResultBeEqual(24545.6, "€");
      expect(result).toHaveReferencesBeEqual(
        expectedReferencesGroupeABBCDEFCadre
      );
    });
  });

  describe("Groupe A,B,C,D,E (forfait jour - cadre)", () => {
    test("Calcul de base", () => {
      const result = engine.calculate({
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
          "'Non'",
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'A, B, C, D ou E'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . remplit conditions pour la retraite":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age":
          "35",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2014",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods: '[{"month":"janvier 2024","value":2668}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(10138.4, "€");
    });
  });

  describe("Groupe FGHI", () => {
    test("Calcul de base", () => {
      const result = engine.calculate({
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
          "'Non'",
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2018",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/09/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods: '[{"month":"janvier 2024","value":2000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(6000, "€");
      expect(result).toHaveReferencesBeEqual(expectedReferenceGroupeFGHI);
    });

    test("Calcul sans le minimum requis", () => {
      const result = engine.calculate({
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
          "'Non'",
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/05/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/04/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods: '[{"month":"janvier 2024","value":2000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
      expect(result).toHaveReferencesBeEqual(expectedLegalReferences);
    });
  });
});
