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

/*
 * Espacements repris de la maquette : 16 px de marge intérieure dans les deux
 * colonnes, 24 px entre deux groupes de champs, 48 px entre deux blocs de la
 * page. C'est ce rythme-là qui était faux — on avait 24 px de marge intérieure,
 * ce qui creusait le vide au-dessus de « Période de calcul ».
 */
export const periodArea = css({
  gridArea: "periode",
  // Mobile : la période coiffe la colonne résultats et partage son fond.
  backgroundColor: "var(--background-alt-blue-france)",
  padding: "1rem",
  // 24 px avant le groupe suivant : la liste déroulante en desktop, le premier
  // montant en mobile.
  paddingBottom: "1.5rem",
  md: {
    // Desktop : elle bascule en tête de la colonne paramètres.
    backgroundColor: "var(--background-contrast-grey)",
  },
});

export const resultsArea = css({
  gridArea: "resultats",
  backgroundColor: "var(--background-alt-blue-france)",
  paddingX: "1rem",
  paddingBottom: "1rem",
  md: {
    paddingTop: "1rem",
  },
});

export const parametersArea = css({
  gridArea: "parametres",
  backgroundColor: "var(--background-contrast-grey)",
  padding: "1rem",
  marginTop: "1rem",
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

/**
 * Mention de situation sous les quatre montants.
 *
 * Bleu et non gris : la maquette la traite comme un message d'information DSFR,
 * icône et texte compris, avec le jeton `--text-default-info` (#0063CB en thème
 * clair). Le jeton, plutôt que la valeur, pour que le thème sombre suive.
 *
 * Contraste calculé sur `--background-alt-blue-france` : 5,31:1, au-dessus du
 * seuil AA de 4,5 pour du texte normal.
 */
export const inlineNote = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.5rem",
  color: "var(--text-default-info)",
});

export const autofillButtons = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

/**
 * Liste des cartes « Pour approfondir ».
 *
 * Le média de la première carte est une infographie, pas une photo : le `cover`
 * du DSFR la recadre et n'en montre qu'un coin. La maquette la donne entière,
 * posée sur le même bleu pâle que la colonne des résultats — d'où le `contain`
 * et le fond. Les deux autres cartes n'ont pas de média, la règle ne les touche
 * donc pas.
 */
export const cardList = css({
  listStyle: "none!",
  margin: 0,
  padding: 0,
  "& .fr-card__img": {
    backgroundColor: "var(--background-alt-blue-france)",
  },
  "& .fr-card__img img": {
    objectFit: "contain!",
  },
});
