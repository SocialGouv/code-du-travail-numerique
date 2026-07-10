"use client";

import { Ref } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { RATING_CONFIRMATION_TEXT } from "./constants";

type Props = {
  messageRef: Ref<HTMLParagraphElement>;
};

// Confirmation « Merci ! » conforme à la maquette : encart bordé vert, pastille
// carrée verte avec ✓ blanc (cercle plein) + libellé gris. Le focus est déplacé
// sur le `<p>` par le parent ; l'annonce vocale est assurée par la région
// `aria-live` persistante qui entoure ce composant (cf. ContributionRating).
export const RatingConfirmation = ({ messageRef }: Props) => (
  <div className={wrap}>
    {/* `fr-m-0` (utilitaire DSFR `!important`) annule la marge de base du <p> :
        une marge Panda serait écrasée (DSFR `p {…}` est hors cascade layer). */}
    <p ref={messageRef} tabIndex={-1} className={`${fr.cx("fr-m-0")} ${chip}`}>
      <span className={cell} aria-hidden="true">
        <CheckCircleIcon />
      </span>
      <span className={label}>{RATING_CONFIRMATION_TEXT}</span>
    </p>
  </div>
);

// Cercle plein + ✓, inliné pour ne pas dépendre de la génération d'icônes DSFR
// (la variante `…-fill` n'était pas dans le bundle → icône cassée).
const CheckCircleIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 30C14.477 30 10 25.523 10 20C10 14.477 14.477 10 20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30ZM19.003 24L26.073 16.929L24.659 15.515L19.003 21.172L16.174 18.343L14.76 19.757L19.003 24Z"
      fill="#fff"
    />
  </svg>
);

const wrap = css({
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
});

const chip = css({
  display: "inline-flex",
  alignItems: "stretch",
  border: "1px solid var(--text-default-success)",
});

const cell = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
  width: "2.5rem",
  backgroundColor: "var(--text-default-success)",
});

const label = css({
  display: "inline-flex",
  alignItems: "center",
  padding: "0.5rem 0.75rem",
  fontSize: "1rem",
  color: "var(--text-default-grey)",
});
