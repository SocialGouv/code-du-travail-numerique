"use client";

import { useEffect, useState } from "react";
import { css, cx } from "@styled-system/css";

// Délai avant le salut automatique unique : laisse le temps de lire la page
// avant d'attirer discrètement l'attention sur la main.
const AUTO_WAVE_DELAY_MS = 20_000;

// Icône « main » flottante, présente sur toutes les pages (desktop + mobile),
// sur le modèle du bouton « Donner votre avis » de mon-entreprise.urssaf.fr :
// on ne voit QUE la main (pas de texte, pas de dépliage), et elle salue au
// survol. Câblée sur notre modale NPS (trigger `main`).
type Props = {
  onOpen: () => void;
  // Reflète l'état ouvert/fermé de la modale que la main contrôle (a11y).
  expanded?: boolean;
};

export const NpsHand = ({ onOpen, expanded = false }: Props) => {
  // Salut automatique déclenché une seule fois, 30 s après l'apparition de la
  // main (ce composant n'est monté que lorsque la main est visible, cf.
  // NpsWidget). La classe reste ensuite posée : l'animation, en une itération,
  // ne rejoue pas d'elle-même.
  const [autoWave, setAutoWave] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAutoWave(true), AUTO_WAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
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
        className={cx(handImg, autoWave && handImgAutoWave)}
        src="/static/assets/img/emoj-wave.png"
        alt=""
        aria-hidden="true"
      />
    </button>
  );
};

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

// Salut automatique : une seule itération du même keyframe que le survol. Le
// survol (`&:hover img`, plus spécifique) reste prioritaire s'il intervient.
// Respecte `prefers-reduced-motion` : pas d'animation si l'usager la refuse
// (WCAG 2.3.3), comme pour le survol.
const handImgAutoWave = css({
  "@media (prefers-reduced-motion: no-preference)": {
    animation: "nps-hand-wiggle 2.5s ease 0s 1",
  },
});
