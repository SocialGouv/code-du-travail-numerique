"use client";

import { useId, useRef, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { RatingIcon } from "./RatingIcon";
import { RatingSlider } from "./RatingSlider";
import { RatingConfirmation } from "./RatingConfirmation";
import { trackContributionRating } from "./tracking";
import {
  RATING_DEFAULT,
  RATING_WIDGET_HINT,
  RATING_WIDGET_INTRO,
  RATING_WIDGET_TITLE,
} from "./constants";

type Props = {
  contributionSlug: string;
};

type Status = "idle" | "submitted";

export const ContributionRating = ({ contributionSlug }: Props) => {
  const headingId = useId();
  const [value, setValue] = useState(RATING_DEFAULT);
  const [status, setStatus] = useState<Status>("idle");
  const messageRef = useRef<HTMLParagraphElement>(null);
  // Garde synchrone : empêche un double-clic rapide d'émettre deux events avant
  // que le re-render n'ait masqué le bouton (l'état `status` est asynchrone).
  // Pas de persistance (localStorage) : recharger la page ou revenir sur le site
  // ré-affiche le widget notable (respect du RGPD, aucune trace côté client).
  const submittingRef = useRef(false);

  const onChange = (next: number) => {
    setValue(next);
  };

  const onSubmit = () => {
    if (submittingRef.current || status !== "idle") return;
    submittingRef.current = true;
    setStatus("submitted");
    void trackContributionRating({
      contributionSlug,
      value,
    }); // fire-and-forget
    // Focus sur le message de confirmation (timing calqué sur CopyButton).
    setTimeout(() => messageRef.current?.focus(), 100);
  };

  const submitted = status === "submitted";

  return (
    <section
      className={`${fr.cx("fr-mb-6w")} ${widget}`}
      aria-labelledby={headingId}
    >
      <RatingIcon className={icon} />
      {/* La taille de police est portée par les <span> enfants : DSFR définit
          `h2 { font-size: 1.75rem }` HORS cascade layer, donc une règle Panda
          (`@layer utilities`) posée sur le <h2> lui-même serait toujours
          écrasée. DSFR ne cible pas les <span>, eux reçoivent bien notre style.
          La marge basse passe par `fr-mb-1v` (utilitaire DSFR `!important`). */}
      <h2 id={headingId} className={fr.cx("fr-mb-1v")}>
        <span className={titleIntro}>{RATING_WIDGET_INTRO}</span>
        <span className={titleQuestion}>{RATING_WIDGET_TITLE}</span>
      </h2>
      {/* Texte d'aide affiché juste sous la question. Classe DSFR dédiée
          (0.75rem, gris) : étant une classe, elle l'emporte sur la règle de
          base `p`. Non relié au curseur via aria-describedby : DSFR écrase
          l'aria-describedby de l'input (il pointe sur son propre groupe de
          messages) ; l'instruction est de toute façon portée pour les lecteurs
          d'écran par le nom accessible explicite du curseur (RATING_SLIDER_LABEL). */}
      <p className={fr.cx("fr-hint-text", "fr-mb-0")}>{RATING_WIDGET_HINT}</p>
      <RatingSlider value={value} onChange={onChange} disabled={submitted} />
      {!submitted && (
        <div className={actions}>
          <Button onClick={onSubmit} priority="secondary">
            Valider
          </Button>
        </div>
      )}
      {/* Région live persistante (présente dès le montage) pour que l'insertion
          du « Merci ! » soit fiablement annoncée par les lecteurs d'écran. */}
      <div aria-live="polite">
        {submitted && <RatingConfirmation messageRef={messageRef} />}
      </div>
    </section>
  );
};

const widget = css({
  // Carré bleu : 16px haut/bas, 8px gauche/droite (maquette).
  padding: "1rem 0.5rem",
  backgroundColor: "var(--background-alt-blue-france)",
  // Widget interactif : inutile (et disgracieux) à l'impression / en PDF.
  "@media print": { display: "none" },
});

const icon = css({
  display: "block",
  margin: "0 auto 1rem",
});

// 14px/20px (réduit). La taille DOIT vivre sur le <span> (et non le <h2>) :
// cf. commentaire dans le JSX sur la cascade DSFR.
const titleIntro = css({
  display: "block",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "normal",
});

const titleQuestion = css({
  display: "block",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "bold",
});

const actions = css({
  display: "flex",
  justifyContent: "center",
  marginTop: "1.5rem",
});
