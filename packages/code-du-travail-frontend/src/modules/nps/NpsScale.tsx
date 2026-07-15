"use client";

import { useId, useRef } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import {
  NPS_LABEL_MAX,
  NPS_LABEL_MIN,
  NPS_MAX,
  NPS_MIN,
  NPS_SCALE,
} from "./constants";

type Props = {
  value: number | null;
  onSelect: (value: number) => void;
  // Id de la question, pour labelliser le groupe de radios (a11y).
  groupLabelId: string;
};

// Échelle 0-10 : groupe de 11 radios (choix unique).
//  - Sémantique : `radiogroup` + `radio`/`aria-checked` → un seul arrêt de
//    tabulation, navigation aux flèches (RGAA 7.1, WCAG 4.1.2).
//  - Desktop : une seule ligne (grille 11 colonnes) ; « Pas du tout » à gauche
//    et « Absolument » à droite, sous l'échelle.
//  - Mobile : grille multi-lignes ; « Pas du tout » au-dessus à gauche,
//    « Absolument » en dessous à droite.
export const NpsScale = ({ value, onSelect, groupLabelId }: Props) => {
  const hintId = useId();
  const radiosRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Roving tabindex : seul le radio coché est tabbable (ou le premier si aucun
  // n'est coché). Les autres sont sortis de l'ordre de tabulation.
  const activeIndex = value === null ? 0 : value - NPS_MIN;

  const selectAndFocus = (index: number) => {
    const clamped = Math.max(0, Math.min(NPS_SCALE.length - 1, index));
    onSelect(NPS_SCALE[clamped]);
    radiosRef.current[clamped]?.focus();
  };

  // Navigation clavier d'un radiogroup : les flèches déplacent ET cochent.
  const onKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectAndFocus(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectAndFocus(index - 1);
        break;
      case "Home":
        event.preventDefault();
        selectAndFocus(0);
        break;
      case "End":
        event.preventDefault();
        selectAndFocus(NPS_SCALE.length - 1);
        break;
    }
  };

  return (
    <div>
      <span id={hintId} className={fr.cx("fr-sr-only")}>
        Sélectionnez une note de 0 à 10, puis validez.
      </span>
      <span className={labelAbove}>{NPS_LABEL_MIN}</span>
      <div
        className={grid}
        role="radiogroup"
        aria-labelledby={groupLabelId}
        aria-describedby={hintId}
      >
        {NPS_SCALE.map((note, index) => {
          const selected = value === note;
          // Bornes : on précise leur sens dans le nom accessible (les libellés
          // visuels « Pas du tout »/« Absolument » ne sont pas lus par le
          // lecteur d'écran lors du parcours des radios).
          const pole =
            note === NPS_MIN
              ? `, ${NPS_LABEL_MIN}`
              : note === NPS_MAX
                ? `, ${NPS_LABEL_MAX}`
                : "";
          return (
            <button
              key={note}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`Note ${note} sur 10${pole}`}
              tabIndex={index === activeIndex ? 0 : -1}
              ref={(el) => {
                radiosRef.current[index] = el;
              }}
              onClick={() => onSelect(note)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`${buttonBase} ${selected ? buttonSelected : buttonDefault}`}
            >
              {note}
            </button>
          );
        })}
      </div>
      <div className={labelsBelow}>
        <span className={labelMin}>{NPS_LABEL_MIN}</span>
        <span className={labelMax}>{NPS_LABEL_MAX}</span>
      </div>
    </div>
  );
};

const grid = css({
  // Mobile : boutons centrés, répartis sur plusieurs lignes (flex wrap).
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "0.5rem",
  // Desktop : une seule ligne de 11 boutons (grille).
  lg: {
    display: "grid",
    gridTemplateColumns: "repeat(11, 1fr)",
  },
});

// !important (suffixe `!` Panda) sur les propriétés visuelles : le DSFR pose un
// reset sur l'élément <button> HORS cascade layer, qui écraserait sinon nos
// règles `@layer utilities` quelle que soit leur spécificité (cf. même piège
// documenté dans ContributionRating.tsx). L'`!important` layered l'emporte bien
// sur une déclaration normale non-layered.
const buttonBase = css({
  // Cible tactile minimale 48×48px (WCAG 2.5.5 / RGAA).
  minHeight: "3rem",
  // Mobile : largeur fixe (carré 48px) pour des boutons uniformes et centrés.
  width: "3rem",
  padding: "0.5rem",
  borderWidth: "1px!",
  borderStyle: "solid!",
  // Coins droits (pas d'arrondi).
  borderRadius: "0!",
  fontWeight: "500",
  cursor: "pointer",
  // Indicateur de focus clavier visible (WCAG 2.4.7), couleur de focus DSFR.
  _focusVisible: {
    outline: "2px solid #0a76f6!",
    outlineOffset: "2px!",
  },
  // Desktop : la grille (colonnes 1fr) pilote la largeur.
  lg: { width: "auto" },
});

// Variantes MUTUELLEMENT EXCLUSIVES (jamais composées ensemble) : deux règles
// `!important` sur la même propriété se départageraient sinon selon l'ordre de
// sortie de Panda, pas selon l'ordre des classes. En les rendant exclusives, la
// couleur de fond ne rentre jamais en conflit.
const buttonDefault = css({
  color: "var(--text-action-high-blue-france)!",
  backgroundColor: "var(--background-default-grey)!",
  borderColor: "var(--border-action-high-blue-france)!",
  _hover: { backgroundColor: "var(--background-alt-blue-france)!" },
});

// Bouton sélectionné : mis en évidence (fond bleu plein, texte inversé).
const buttonSelected = css({
  color: "var(--text-inverted-blue-france)!",
  backgroundColor: "var(--background-action-high-blue-france)!",
  borderColor: "var(--background-action-high-blue-france)!",
  _hover: { backgroundColor: "var(--background-action-high-blue-france)!" },
});

// « Pas du tout » au-dessus de la grille : mobile uniquement.
const labelAbove = css({
  display: "block",
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginBottom: "0.5rem",
  lg: { display: "none" },
});

const labelsBelow = css({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "0.5rem",
});

// « Pas du tout » sous la grille : desktop uniquement (masqué en mobile où il
// est déjà affiché au-dessus).
const labelMin = css({
  display: "none",
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  lg: { display: "block" },
});

// « Absolument » toujours affiché, aligné à droite (sous la grille).
const labelMax = css({
  display: "block",
  marginLeft: "auto",
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
});
