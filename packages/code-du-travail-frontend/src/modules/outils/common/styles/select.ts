import { css } from "@styled-system/css";

// Largeur par défaut : le champ se dimensionne sur son option la plus longue,
// sans dépasser la largeur d'un champ de formulaire de simulateur.
export const defaultSelectStyle = css({
  "&>select": { width: "fit-content!", maxWidth: `282px!` },
});

// Variante sans plafond, pour les listes dont les options dépassent 282px et
// seraient tronquées contre la flèche du champ. Les deux styles ne peuvent pas
// être cumulés : leurs `max-width` sont `!important` à spécificité égale, c'est
// donc l'ordre dans la feuille — et non l'ordre des classes — qui trancherait.
export const wideSelectStyle = css({
  "&>select": { width: "fit-content!", maxWidth: "100%!" },
});
