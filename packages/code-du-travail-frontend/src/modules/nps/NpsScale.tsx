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
import Button from "@codegouvfr/react-dsfr/Button";

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
    <div className={outer}>
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
            <Button
              key={note}
              type="button"
              nativeButtonProps={{
                role: "radio",
                tabIndex: index === activeIndex ? 0 : -1,
                onKeyDown: (event) => onKeyDown(event, index),
              }}
              aria-checked={selected}
              aria-label={`Note ${note} sur 10${pole}`}
              ref={(el) => {
                radiosRef.current[index] = el;
              }}
              onClick={() => onSelect(note)}
              className={buttonBase}
              priority={selected ? "primary" : "secondary"}
            >
              {note}
            </Button>
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

// Desktop : le conteneur se réduit à la largeur du bloc de boutons et se centre.
// La ligne de labels (en space-between dessous) s'aligne alors sur ses bords,
// donc « Pas du tout » sous le 0 et « Absolument » sous le 10. Mobile : pleine
// largeur (le flex-wrap des boutons a besoin d'une largeur pour se répartir).
const outer = css({
  lg: { width: "max-content", marginInline: "auto" },
});

const grid = css({
  // Mobile : boutons centrés, répartis sur plusieurs lignes (flex wrap).
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "8px",
  // Desktop : une seule ligne de 11 boutons (grille).
  lg: {
    display: "grid",
    gap: "8px",
    gridTemplateColumns: "repeat(11, max-content)",
    justifyContent: "center",
  },
});

const buttonBase = css({
  // Cible tactile minimale 48×48px (WCAG 2.5.5 / RGAA).
  minHeight: "3rem",
  // Mobile : largeur fixe (carré 48px) pour des boutons uniformes et centrés.
  width: "3rem",
  // Desktop : la grille (colonnes 1fr) pilote la largeur.
  lg: { width: "auto" },
});

// « Pas du tout » au-dessus de la grille : mobile uniquement.
const labelAbove = css({
  display: "block",
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
  lg: { display: "block" },
});

// « Absolument » toujours affiché, aligné à droite (sous la grille).
const labelMax = css({
  display: "block",
  marginLeft: "auto",
});
