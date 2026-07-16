import type { ABTestDefinition } from "@socialgouv/matomo-next";

export enum LabelSearchCardVariations {
  ORIGINAL = "original",
  FICHE_PRATIQUE = "fiche-pratique",
  SELON_MA_CC = "selon-ma-cc",
  REPONSE_PERSONNALISEE = "reponse-personnalisee",
  SELON_ENTREPRISE = "selon-entreprise",
}

/**
 * Central place to register Matomo A/B tests.
 *
 * Keep this empty by default; add tests here when needed.
 */
export const AB_TESTS: ABTestDefinition[] = [
  {
    name: "LabelCardSearch",
    percentage: 100,
    variations: [
      {
        name: LabelSearchCardVariations.ORIGINAL,
      },
      {
        name: LabelSearchCardVariations.FICHE_PRATIQUE,
      },
      {
        name: LabelSearchCardVariations.SELON_MA_CC,
      },
      {
        name: LabelSearchCardVariations.REPONSE_PERSONNALISEE,
      },
      {
        name: LabelSearchCardVariations.SELON_ENTREPRISE,
      },
    ],
  },
];
