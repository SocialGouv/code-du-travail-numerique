"use client";

import { useId, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import {
  RATING_GROUP_LABEL,
  RATING_LABELS,
  RATING_VALUES,
  ratingStarLabel,
} from "./constants";

type Props = {
  value: number | null;
  onChange: (value: number) => void;
  disabled: boolean;
};

// Five-star rating (#7587), built on native radio inputs inside a fieldset:
// keyboard navigation (arrow keys), focus and screen reader announcements come
// from the browser. The inputs are visually hidden and each <label> renders a
// star; stars up to the hovered (or else selected) one are filled.
export const RatingStars = ({ value, onChange, disabled }: Props) => {
  const name = useId();
  const [hovered, setHovered] = useState<number | null>(null);
  const highlighted = (!disabled && hovered) || value || 0;

  return (
    <fieldset className={fieldset} disabled={disabled}>
      <legend className={fr.cx("fr-sr-only")}>{RATING_GROUP_LABEL}</legend>
      <div className={stars} onMouseLeave={() => setHovered(null)}>
        {RATING_VALUES.map((star) => {
          const id = `${name}-${star}`;
          return (
            <span key={star} className={starItem}>
              <input
                type="radio"
                id={id}
                name={name}
                value={star}
                checked={value === star}
                onChange={() => onChange(star)}
                className={`${fr.cx("fr-sr-only")} ${radio}`}
              />
              <label
                htmlFor={id}
                className={starLabel}
                onMouseEnter={() => setHovered(star)}
              >
                <StarIcon filled={star <= highlighted} />
                <span className={fr.cx("fr-sr-only")}>
                  {ratingStarLabel(star)}
                </span>
              </label>
            </span>
          );
        })}
      </div>
      {/* Visual only: screen readers already get the label through each
          star's accessible name. The non-breaking space keeps the line height
          reserved so the layout does not jump on first hover. */}
      <p className={`${fr.cx("fr-m-0")} ${currentLabel}`} aria-hidden="true">
        {highlighted ? RATING_LABELS[highlighted] : "\u00a0"}
      </p>
    </fieldset>
  );
};

// Inlined so it does not depend on the DSFR icon bundle (same choice as the
// confirmation check icon).
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const fieldset = css({
  border: "none",
  margin: 0,
  padding: 0,
  minWidth: 0,
  marginTop: "0.75rem",
});

const stars = css({
  display: "flex",
  justifyContent: "center",
  gap: "0.25rem",
});

const starItem = css({
  display: "inline-flex",
});

// 44px hit area (WCAG 2.5.5) around a 32px star.
const starLabel = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.75rem",
  height: "2.75rem",
  cursor: "pointer",
  color: "var(--text-action-high-blue-france)",
  "fieldset:disabled &": {
    cursor: "default",
  },
});

// The input is visually hidden: move its keyboard focus ring onto the star.
const radio = css({
  "&:focus-visible + label": {
    outline: "2px solid var(--dsfr-outline, #0a76f6)",
    outlineOffset: "2px",
  },
});

const currentLabel = css({
  textAlign: "center",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--text-action-high-blue-france)",
});
