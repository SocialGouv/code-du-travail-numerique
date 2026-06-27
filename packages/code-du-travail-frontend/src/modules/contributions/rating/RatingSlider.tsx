"use client";

import { Range } from "@codegouvfr/react-dsfr/Range";
import { css } from "@styled-system/css";
import {
  RATING_LABELS,
  RATING_MAX,
  RATING_MAX_LABEL,
  RATING_MIN,
  RATING_MIN_LABEL,
  RATING_SLIDER_LABEL,
  RATING_STEP,
  RATING_WIDGET_HINT,
} from "./constants";

type Props = {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

export const RatingSlider = ({ value, onChange, disabled }: Props) => {
  // Position du libellé au-dessus du pouce. En variante `small`, le pouce DSFR
  // fait 1rem : son centre se déplace de 0.5rem (rayon) à (100% - 0.5rem). On
  // borne le centre à 3.5rem des extrémités (≈ demi-largeur du libellé le plus
  // long) pour qu'aucun libellé ne déborde, tout en suivant le pouce sur les
  // positions intermédiaires.
  const ratio = (value - RATING_MIN) / (RATING_MAX - RATING_MIN);
  const thumbLeft = `clamp(3.5rem, calc(0.5rem + (100% - 1rem) * ${ratio}), calc(100% - 3.5rem))`;

  return (
    <div className={sliderWrap}>
      {/* Libellé de la position courante : visuel uniquement (aria-hidden) ;
          pour les lecteurs d'écran la valeur est portée par `aria-valuetext`
          sur l'input afin de ne pas dédoubler l'annonce. */}
      <span
        className={currentLabel}
        style={{ left: thumbLeft }}
        aria-hidden="true"
      >
        {RATING_LABELS[value]}
      </span>
      {/* Le hint passe par `stateRelatedMessage` : c'est le groupe de messages
          DSFR que l'input cible via `aria-describedby` (DSFR écrase tout
          `aria-describedby` passé en nativeInputProps). Il est ainsi relié au
          curseur pour les lecteurs d'écran. */}
      <Range
        label={RATING_SLIDER_LABEL} // nom accessible stable, masqué visuellement
        classes={{ label: "fr-sr-only", output: hiddenOutput }}
        hideMinMax // on rend nos propres libellés textuels d'extrémités
        small
        min={RATING_MIN}
        max={RATING_MAX}
        step={RATING_STEP}
        disabled={disabled}
        stateRelatedMessage={RATING_WIDGET_HINT}
        nativeInputProps={{
          value,
          onChange: (e) => onChange(Number(e.currentTarget.value)),
          "aria-valuetext": RATING_LABELS[value],
        }}
      />
      <div className={endLabels} aria-hidden="true">
        <span>{RATING_MIN_LABEL}</span>
        <span>{RATING_MAX_LABEL}</span>
      </div>
    </div>
  );
};

const sliderWrap = css({
  position: "relative",
  paddingTop: "0.5rem", // petit espace au-dessus du libellé flottant
});

const currentLabel = css({
  position: "absolute",
  top: 0,
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--text-action-high-blue-france)",
});

// On masque la valeur numérique du `.fr-range__output` mais SANS `display:none` :
// DSFR positionne sa piste (::before/::after) à `top:1.5rem` en partant du
// principe que la ligne de l'output occupe l'espace au-dessus. La supprimer
// faisait remonter l'input → le pouce flottait au-dessus de la barre bleue (et
// la piste débordait sur les libellés). `visibility:hidden` garde cet espaceur
// (le libellé visible est notre <span> flottant). `!` car DSFR repasse l'output
// en `visibility:visible` (hors cascade layer) une fois le JS initialisé.
const hiddenOutput = css({ visibility: "hidden!" });

const endLabels = css({
  display: "flex",
  justifyContent: "space-between",
  gap: "0.5rem",
  marginTop: "0.25rem",
  fontSize: "0.75rem",
  color: "var(--text-mention-grey)",
});
