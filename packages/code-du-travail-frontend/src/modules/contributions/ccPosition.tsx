"use client";
import React, { createContext, ReactNode, useContext } from "react";
import { useABTestVariant } from "@socialgouv/matomo-next";
import {
  CONTRIBUTION_CC_POSITION_TEST,
  CONTRIBUTION_CC_POSITION_TEST_PATH,
  ContributionCcPositionVariations,
} from "../config/abTests";

/**
 * Emplacement du bloc de choix de convention collective sur la fiche générique
 * (A/B test #7481) :
 * - `top` : en tête de page, au-dessus de la réponse (variantes A et B) ;
 * - `after-intro` : entre l'introduction et le premier groupe d'accordéons du
 *   contenu (variante C) ;
 * - `in-accordion` : en pied de chaque accordéon de premier niveau (variante D).
 */
export type CcBlockPosition = "top" | "after-intro" | "in-accordion";

export type CcPositionVariant = {
  position: CcBlockPosition;
  /** Réponse Code du travail affichée sans action de l'usager (B, C, D). */
  contentByDefault: boolean;
  /** Option « Je ne souhaite pas renseigner ma CC » proposée (A seulement). */
  showNoAgreementOption: boolean;
};

/** Comportement historique : témoin A, et fiches hors expérience. */
export const CONTROL_VARIANT: CcPositionVariant = {
  position: "top",
  contentByDefault: false,
  showNoAgreementOption: true,
};

const VARIANTS: Record<ContributionCcPositionVariations, CcPositionVariant> = {
  [ContributionCcPositionVariations.A]: CONTROL_VARIANT,
  [ContributionCcPositionVariations.B]: {
    position: "top",
    contentByDefault: true,
    showNoAgreementOption: false,
  },
  [ContributionCcPositionVariations.C]: {
    position: "after-intro",
    contentByDefault: true,
    showNoAgreementOption: false,
  },
  [ContributionCcPositionVariations.D]: {
    position: "in-accordion",
    contentByDefault: true,
    showNoAgreementOption: false,
  },
};

const isKnownVariation = (
  variant: string | null
): variant is ContributionCcPositionVariations =>
  !!variant && variant in VARIANTS;

/**
 * Variante de l'expérience pour la fiche générique `slug`. Hors de la fiche
 * testée, ou tant que Matomo n'a pas affecté de variation (chargement, refus
 * du consentement, bloqueur), on rend le témoin : la page ne diffère du
 * comportement historique que lorsqu'une variation B, C ou D est connue.
 */
export const useCcPositionVariant = (slug: string): CcPositionVariant => {
  const isTestedPage =
    `/contribution/${slug}` === CONTRIBUTION_CC_POSITION_TEST_PATH;
  const variation = useABTestVariant(CONTRIBUTION_CC_POSITION_TEST);
  if (!isTestedPage || !isKnownVariation(variation)) return CONTROL_VARIANT;
  return VARIANTS[variation];
};

type CcBlockContextValue = {
  position: CcBlockPosition;
  /**
   * Rend une instance du bloc. `instanceId` distingue les instances quand la
   * position en produit plusieurs (une par accordéon) : il sert à rendre
   * uniques les `id` du DOM et le titre ciblé par le focus.
   */
  renderBlock: (instanceId?: string) => ReactNode;
};

const CcBlockContext = createContext<CcBlockContextValue | undefined>(
  undefined
);

export const CcBlockProvider = CcBlockContext.Provider;

type SlotProps = {
  position: CcBlockPosition;
  instanceId?: string;
};

/**
 * Point d'accroche du bloc CC. Chaque emplacement possible de la page pose un
 * `CcBlockSlot` ; seul celui dont la `position` correspond à la variante rend
 * le bloc. Les slots injectés dans le contenu parsé (`DisplayContent`) sont
 * des éléments statiques : ils lisent la variante et les props du bloc dans
 * le contexte, ce qui les garde à jour même quand l'accordéon qui les héberge
 * a figé ses enfants (cf. `AccordionWithAnchor`).
 */
export const CcBlockSlot = ({ position, instanceId }: SlotProps) => {
  const context = useContext(CcBlockContext);
  if (!context || context.position !== position) return null;
  return <>{context.renderBlock(instanceId)}</>;
};
