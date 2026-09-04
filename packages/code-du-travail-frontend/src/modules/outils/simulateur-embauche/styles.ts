import { css } from "@styled-system/css";

/**
 * Grille des deux colonnes.
 *
 * Le bloc « Période de calcul » n'existe qu'**une seule fois** dans le DOM ; il
 * change de place entre mobile et desktop par `gridTemplateAreas`. Le dupliquer
 * derrière `fr-hidden` / `fr-unhidden-md` produirait deux `<fieldset>` portant le
 * même `name` : les radios se répondraient entre elles et les lecteurs d'écran
 * annonceraient deux fois les mêmes libellés.
 *
 * Contrepartie assumée : en desktop l'ordre de tabulation devient
 * période → résultats → contrat.
 */
export const simulatorGrid = css({
  display: "grid",
  gridTemplateAreas: `"periode" "resultats" "parametres"`,
  gridTemplateColumns: "1fr",
  rowGap: 0,
  md: {
    gridTemplateAreas: `"resultats periode" "resultats parametres"`,
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto 1fr",
    columnGap: "1.5rem",
  },
});

export const periodArea = css({
  gridArea: "periode",
  // Mobile : la période coiffe la colonne résultats et partage son fond.
  backgroundColor: "var(--background-alt-blue-france)",
  padding: "1.5rem",
  paddingBottom: "1rem",
  md: {
    // Desktop : elle bascule en tête de la colonne paramètres.
    backgroundColor: "var(--background-contrast-grey)",
  },
});

export const resultsArea = css({
  gridArea: "resultats",
  backgroundColor: "var(--background-alt-blue-france)",
  paddingX: "1.5rem",
  paddingBottom: "1.5rem",
  md: {
    paddingTop: "1.5rem",
  },
});

export const parametersArea = css({
  gridArea: "parametres",
  backgroundColor: "var(--background-contrast-grey)",
  padding: "1.5rem",
  marginTop: "1.5rem",
  md: {
    marginTop: 0,
    paddingTop: 0,
  },
});

/**
 * Champ montant : l'`<input>` occupe la place disponible, aligné à droite, et le
 * suffixe « € par mois » se colle à sa suite pour que les deux ne forment
 * qu'un seul rectangle.
 */
export const amountInputWrap = css({
  display: "flex",
  alignItems: "stretch",
});

export const amountInput = css({
  flex: "1 1 auto",
  minWidth: 0,
  textAlign: "right",
  paddingRight: "0.25rem!",
  // `fr-input-wrap--addon` repeint l'input en bleu ; on rétablit le trait DSFR
  // standard, que l'état `success` remplacera par le vert.
  boxShadow: "inset 0 -2px 0 0 var(--border-plain-grey)!",
  ".fr-input-group--valid &": {
    boxShadow: "inset 0 -2px 0 0 var(--border-plain-success)!",
  },
});

export const amountSuffix = css({
  display: "flex",
  alignItems: "center",
  flex: "0 0 auto",
  paddingRight: "1rem",
  paddingLeft: 0,
  color: "var(--text-default-grey)",
  backgroundColor: "var(--background-contrast-grey)",
  borderRadius: "0 0.25rem 0 0",
  boxShadow: "inset 0 -2px 0 0 var(--border-plain-grey)",
  ".fr-input-group--valid &": {
    boxShadow: "inset 0 -2px 0 0 var(--border-plain-success)",
  },
});

/**
 * Le message d'état DSFR affiche une coche verte ; la maquette veut un point
 * d'interrogation, porté par l'icône du lien lui-même.
 */
export const contextualMessage = css({
  "&::before": {
    display: "none!",
  },
});

export const contextualMessageLink = css({
  color: "var(--text-default-success)!",
  backgroundImage: "none!",
  textDecoration: "underline",
});

export const inlineNote = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.5rem",
  color: "var(--text-mention-grey)",
});

export const autofillButtons = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

export const cardList = css({
  listStyle: "none!",
  margin: 0,
  padding: 0,
});
