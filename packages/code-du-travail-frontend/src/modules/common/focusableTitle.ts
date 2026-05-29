import { css } from "@styled-system/css";

/**
 * Anneau de focus visible pour les éléments qui reçoivent le focus par
 * programmation (titres / contenus avec `tabIndex={-1}` sur lesquels on appelle
 * `.focus()` après une navigation, l'affichage d'un contenu, etc.).
 *
 * Par défaut, DSFR n'affiche son anneau que sur `:focus-visible`, lequel n'est
 * pas déclenché lorsqu'un focus est déplacé en JavaScript à la suite d'un clic
 * souris : l'usager voyant ne « voit » alors pas où le focus est parti. On
 * rétablit donc un anneau visible sur `:focus`. Style aligné sur celui déjà
 * utilisé pour les titres de section (`Section.tsx`).
 */
export const focusableTitle = css({
  outline: "none",
  scrollMarginTop: "64px",
  "&:focus": {
    outline: "2px solid var(--border-active-blue-france)",
    outlineOffset: "4px",
    borderRadius: "4px",
  },
});
