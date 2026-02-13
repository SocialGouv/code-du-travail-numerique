"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useRef, useState } from "react";
import type { Agreement } from "src/modules/outils/indemnite-depart/types";
import { AgreementSelectionForm } from "./AgreementSelectionForm";
import { useAgreementStorageSync } from "./useAgreementStorageSync";

type Props = {
  onClose: () => void;
};

export const AGREEMENT_A11Y_MESSAGES = {
  AGREEMENT_SAVED: (title: string) =>
    `Convention collective ${title} enregistrée avec succès`,
  AGREEMENT_CLEARED:
    "Convention collective supprimée. Vous pouvez en sélectionner une nouvelle.",
} as const;

export const AgreementSelectionModalContent = ({ onClose }: Props) => {
  const { agreement, setAgreement, clearAgreement } = useAgreementStorageSync();
  const [isEditing, setIsEditing] = useState(false);
  const [liveRegionMessage, setLiveRegionMessage] = useState("");
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const announceToScreenReader = (message: string) => {
    // Clear then re-set to ensure screen readers re-announce
    setLiveRegionMessage("");
    setTimeout(() => {
      setLiveRegionMessage(message);
    }, 100);
  };

  const handleSelect = (nextAgreement: Agreement) => {
    setAgreement(nextAgreement);
    setIsEditing(false);
    announceToScreenReader(
      AGREEMENT_A11Y_MESSAGES.AGREEMENT_SAVED(
        `${nextAgreement.shortTitle} (IDCC ${nextAgreement.num})`
      )
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
    announceToScreenReader(AGREEMENT_A11Y_MESSAGES.AGREEMENT_CLEARED);
  };

  if (agreement && !isEditing) {
    return (
      <div>
        {/* Live region for screen reader announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={liveRegionStyle}
        >
          {liveRegionMessage}
        </div>

        <div className={selectedContainer}>
          <p
            className={fr.cx("fr-mb-2w", "fr-text--bold", "fr-text--lg")}
            id="agreement-selection-label"
          >
            Les réponses seront personnalisées pour la convention collective :
          </p>

          <div
            className={selectedCard}
            data-testid="header-selected-agreement-card"
            role="region"
            aria-labelledby="agreement-selection-label"
          >
            <p
              className={fr.cx("fr-mb-0")}
              style={{ color: "var(--text-action-high-blue-france)" }}
            >
              {agreement.shortTitle} (IDCC {agreement.num})
            </p>
          </div>
        </div>

        <div className={buttonRow}>
          <Button priority="secondary" onClick={onClose} type="button">
            Fermer
          </Button>
          <Button
            ref={editButtonRef}
            priority="primary"
            iconId="fr-icon-arrow-go-back-line"
            iconPosition="right"
            onClick={handleEdit}
            type="button"
          >
            Modifier
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={liveRegionStyle}
      >
        {liveRegionMessage}
      </div>

      <div className={infoBox}>
        <AgreementSelectionForm
          defaultAgreement={agreement}
          onAgreementSelect={handleSelect}
        />
        <p className={`${fr.cx("fr-info-text")} ${infoTextTopAligned}`}>
          L&apos;Identifiant de la Convention Collective (IDCC) est un numéro
          unique de 4 chiffres déterminant chaque convention collective (Ex
          &nbsp;: 1090 ou 1486). <br />
          Attention à ne pas confondre avec les codes APE (Activité Principale
          Exercée) ou NAF (Nomenclature des Activités Françaises) qui sont des
          numéros composés de 4 chiffres et d&apos;une lettre dont
          l&apos;objectif est d&apos;identifier l&apos;activité principale de
          l&apos;entreprise (Ex&nbsp;: 4752A).
        </p>
      </div>

      <div className={stickyButtonRow}>
        <Button priority="secondary" onClick={onClose} type="button">
          Fermer
        </Button>
      </div>
    </div>
  );
};

const selectedContainer = css({
  padding: "1.5rem",
  backgroundColor: "var(--background-alt-blue-cumulus)",
  marginBottom: "1rem",
});

const selectedCard = css({
  border: "1px solid var(--border-action-high-blue-france)",
  padding: "1rem 1.5rem",
  backgroundColor: "white",
  fontSize: "1.25rem",
});

const buttonRow = css({
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: "1.5rem",
});

const stickyButtonRow = css({
  display: "flex",
  gap: "0.75rem",
  justifyContent: "flex-end",
  marginTop: "1.5rem",
  position: "sticky",
  bottom: 0,
  backgroundColor: "var(--background-default-grey)",
  paddingTop: "1rem",
  paddingBottom: "0.5rem",
  zIndex: 1,
});

const infoBox = css({
  gap: "0.75rem",
  padding: "1rem",
  backgroundColor: "var(--background-alt-blue-cumulus)",
});

const infoTextTopAligned = css({
  "&::before": {
    alignSelf: "flex-start",
    marginTop: "0.25rem",
  },
});

const liveRegionStyle = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: "0",
});
