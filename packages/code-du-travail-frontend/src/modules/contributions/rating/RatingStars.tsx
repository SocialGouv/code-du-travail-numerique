"use client";

import { useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css, cx } from "@styled-system/css";
import { RATING_LABELS, RATING_VALUES, ratingStarPrefix } from "./constants";

type Props = {
  value: number | null;
  onSelect: (value: number) => void;
  // Once a score is recorded the stars are locked: still visible and
  // focusable (aria-disabled, not disabled) so the chosen state stays
  // announced, but clicks are ignored.
  locked: boolean;
  // Id of the element naming the group (the widget question).
  labelledBy: string;
};

// Three-star rating where a click records the score (#7587). Native buttons
// with `aria-pressed` rather than radio inputs: with "select = submit", arrow
// keys on a radio group would record a score just by navigating. Each button
// holds its always-visible label, prefixed by a visually hidden "N étoile(s)
// sur 3 :" so the accessible name contains the visible text (RGAA 11.2).
export const RatingStars = ({ value, onSelect, locked, labelledBy }: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const highlighted = (!locked && hovered) || value || 0;

  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className={stars}
      onMouseLeave={() => setHovered(null)}
    >
      {RATING_VALUES.map((star) => (
        <button
          key={star}
          type="button"
          className={starButton}
          aria-pressed={value === star}
          aria-disabled={locked || undefined}
          onClick={() => {
            if (!locked) onSelect(star);
          }}
          onMouseEnter={() => setHovered(star)}
        >
          <StarIcon value={star} filled={star <= highlighted} />
          <span className={fr.cx("fr-sr-only")}>{ratingStarPrefix(star)}</span>
          <span className={cx(starLabel, value === star && starLabelSelected)}>
            {RATING_LABELS[star]}
          </span>
        </button>
      ))}
    </div>
  );
};

// Inlined so it does not depend on the DSFR icon bundle (same choice as the
// confirmation check icon). Decorative: the score is in the accessible name.
const StarIcon = ({ value, filled }: { value: number; filled: boolean }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 2.6 14.8 8.75l6.7.6-5.08 4.43 1.52 6.57L12 16.9l-5.94 3.45 1.52-6.57L2.5 9.35l6.7-.6z"
      className={cx(starShape, filled && starShapeFilled)}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <text
      x="12"
      y="13.4"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="6.5"
      fontWeight="700"
      className={cx(starNumber, filled && starNumberFilled)}
    >
      {value}
    </text>
  </svg>
);

const stars = css({
  display: "flex",
  justifyContent: "center",
  // No gap: the spacing lives in the buttons' padding so the hit areas touch.
  // With a gap, a click between two stars did nothing while the last hovered
  // star still looked active (hover only resets when leaving the group).
  marginTop: "0.75rem",
});

// Hit area well above 44x44px (WCAG 2.5.5): star + label.
const starButton = css({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.25rem",
  minWidth: "5rem",
  minHeight: "2.75rem",
  padding: "0.25rem 0.5rem",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "var(--text-action-high-blue-france)",
  "&:focus-visible": {
    outline: "2px solid var(--dsfr-outline, #0a76f6)",
    outlineOffset: "2px",
  },
  "&[aria-disabled=true]": {
    cursor: "default",
  },
});

const starShape = css({
  fill: "transparent",
  stroke: "var(--border-action-high-blue-france)",
});

const starShapeFilled = css({
  fill: "var(--background-action-high-blue-france)",
  stroke: "var(--background-action-high-blue-france)",
});

const starNumber = css({
  fill: "var(--text-action-high-blue-france)",
});

const starNumberFilled = css({
  fill: "var(--text-inverted-blue-france)",
});

const starLabel = css({
  fontSize: "0.75rem",
  lineHeight: "1.25rem",
  color: "var(--text-default-grey)",
});

const starLabelSelected = css({
  fontWeight: "bold",
});
