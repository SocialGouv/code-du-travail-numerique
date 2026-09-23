import type { ABTestDefinition } from "@socialgouv/matomo-next";

export enum LabelSearchCardVariations {
  ORIGINAL = "original",
  FICHE_PRATIQUE = "fiche-pratique",
  SELON_MA_CC = "selon-ma-cc",
  REPONSE_PERSONNALISEE = "reponse-personnalisee",
  SELON_ENTREPRISE = "selon-entreprise",
}

/**
 * A/B test « emplacement du bloc de choix de convention collective » (#7481),
 * limité à la fiche générique « Congés pour évènements familiaux ».
 *
 * - A : témoin — bloc en tête, trois options, réponse masquée jusqu'au clic.
 * - B : bloc en tête, réponse Code du travail visible d'emblée.
 * - C : bloc entre l'introduction et le premier accordéon du contenu.
 * - D : bloc en pied de chaque accordéon du contenu.
 *
 * En B, C et D l'option « Je ne souhaite pas renseigner ma convention
 * collective » disparaît : la réponse générale est déjà affichée.
 *
 * Le nom et les variations doivent rester identiques à l'expérience déclarée
 * dans Matomo. Une variation se force en recette avec `?pk_ab_test=<nom>`.
 */
export const CONTRIBUTION_CC_POSITION_TEST = "contribution_cc_position";

export enum ContributionCcPositionVariations {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

/** Chemin de la seule page où l'expérience est déclenchée. */
export const CONTRIBUTION_CC_POSITION_TEST_PATH =
  "/contribution/les-conges-pour-evenements-familiaux";

/**
 * Central place to register Matomo A/B tests.
 *
 * Keep this empty by default; add tests here when needed.
 */
export const AB_TESTS: ABTestDefinition[] = [
  {
    name: CONTRIBUTION_CC_POSITION_TEST,
    percentage: 100,
    // Le plugin AbTesting évalue `trigger` à l'initialisation de Matomo, donc
    // à l'arrivée sur le site : seules les visites qui atterrissent sur la
    // fiche entrent dans l'expérience. Une navigation interne vers la fiche
    // n'affecte aucune variante (l'usager voit alors le témoin, sans être
    // compté dans l'expérience). Sans ce filtre, tout visiteur du site serait
    // compté participant, et les taux par variante n'auraient plus de sens.
    trigger: () =>
      typeof window !== "undefined" &&
      window.location.pathname === CONTRIBUTION_CC_POSITION_TEST_PATH,
    variations: [
      { name: ContributionCcPositionVariations.A },
      { name: ContributionCcPositionVariations.B },
      { name: ContributionCcPositionVariations.C },
      { name: ContributionCcPositionVariations.D },
    ],
  },
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
