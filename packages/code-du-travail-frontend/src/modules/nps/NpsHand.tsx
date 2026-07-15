"use client";

import { css } from "@styled-system/css";

// Icône « main » flottante, présente sur toutes les pages (desktop + mobile),
// sur le modèle du bouton « Donner votre avis » de mon-entreprise.urssaf.fr :
// on ne voit QUE la main (pas de texte, pas de dépliage), et elle salue au
// survol. Câblée sur notre modale NPS (trigger `main`).
type Props = {
  onOpen: () => void;
  // Reflète l'état ouvert/fermé de la modale que la main contrôle (a11y).
  expanded?: boolean;
};

export const NpsHand = ({ onOpen, expanded = false }: Props) => (
  // Keyframe `nps-hand-wiggle` définie globalement dans panda.config.ts.
  <button
    type="button"
    className={handButton}
    onClick={onOpen}
    aria-haspopup="dialog"
    aria-expanded={expanded}
    aria-label={"Donnez votre avis"}
  >
    <img
      className={handImg}
      src="/static/assets/img/emoj-wave.png"
      alt=""
      aria-hidden="true"
    />
  </button>
);

// Onglet compact ancré au bord droit : seule la main est visible, en permanence.
const handButton = css({
  position: "fixed",
  top: "12rem",
  right: "0",
  zIndex: 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3.25rem",
  height: "3.5rem",
  borderWidth: "0!",
  borderRadius: "3rem 0 0 3rem",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
  cursor: "pointer",
  backgroundColor: "var(--background-action-high-blue-france)!",
  // Indicateur de focus clavier visible (WCAG 2.4.7), couleur de focus DSFR.
  _focusVisible: {
    outline: "2px solid #0a76f6!",
    outlineOffset: "2px!",
  },
  // La main est statique au repos ; elle salue quand on survole le bouton.
  // Respecte `prefers-reduced-motion` : pas d'animation si l'usager la refuse
  // (WCAG 2.3.3).
  "@media (prefers-reduced-motion: no-preference)": {
    "&:hover img": { animation: "nps-hand-wiggle 2.5s ease 0s infinite" },
  },
  "@media (max-width: 768px)": { top: "8rem" },
  "@media print": { display: "none" },
});

const handImg = css({
  height: "28px",
  width: "28px",
  flexShrink: 0,
});
