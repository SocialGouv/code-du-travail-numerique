"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useEffect, useRef, useState } from "react";
import type { Agreement } from "src/modules/outils/indemnite-depart/types";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import Link from "src/modules/common/Link";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { isCcSupportedByAnySimulator } from "../utils";
import { AgreementSelectionForm } from "./AgreementSelectionForm";
import { useHeaderAgreementTracking } from "./tracking";
import { useAgreementStorageSync } from "./useAgreementStorageSync";

type Props = {
  onClose: () => void;
  isOpen?: boolean;
};

export const AgreementSelectionModalContent = ({ onClose, isOpen }: Props) => {
  const { agreement, setAgreement, clearAgreement } = useAgreementStorageSync();
  const { emitSelectEvent, emitConsultEvent } = useHeaderAgreementTracking();
  const [isEditing, setIsEditing] = useState(false);
  const [liveRegionMessage, setLiveRegionMessage] = useState("");
  const [focusTarget, setFocusTarget] = useState<"selected" | "title" | null>(
    null
  );
  const selectedLabelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
    }
  }, [isOpen]);

  // Handle focus after render when view changes
  useEffect(() => {
    if (focusTarget === "selected" && selectedLabelRef.current) {
      selectedLabelRef.current.focus();
      setFocusTarget(null);
    } else if (focusTarget === "title") {
      document.getElementById("agreement-modal-title")?.focus();
      setFocusTarget(null);
    }
  }, [focusTarget]);

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
    setFocusTarget("selected");
    emitSelectEvent(
      `idcc${nextAgreement.num}`,
      isCcSupportedByAnySimulator(nextAgreement.num)
    );
    announceToScreenReader(
      `Convention collective ${nextAgreement.shortTitle} (IDCC ${nextAgreement.num}) enregistrée avec succès`
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFocusTarget("title");
  };

  const handleDelete = () => {
    clearAgreement();
    onClose();
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  if (agreement && !isEditing) {
    const ccRoute = getRouteBySource(SOURCES.CCN);

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
            ref={selectedLabelRef}
            tabIndex={-1}
          >
            Convention collective sélectionnée :
          </p>

          <div
            className={selectedCard}
            data-testid="header-selected-agreement-card"
            id="selected-agreement-name"
          >
            {agreement.slug ? (
              <Link
                href={`/${ccRoute}/${agreement.slug}`}
                className={`${fr.cx("fr-mb-0")} ${selectedCardLink}`}
                onClick={() => {
                  emitConsultEvent(`idcc${agreement.num}`);
                  onClose();
                }}
              >
                {agreement.shortTitle} (IDCC {agreement.num})
              </Link>
            ) : (
              <p
                className={fr.cx("fr-mb-0")}
                style={{ color: "var(--text-action-high-blue-france)" }}
              >
                {agreement.shortTitle} (IDCC {agreement.num})
              </p>
            )}
          </div>
        </div>

        {!isCcSupportedByAnySimulator(agreement.num) && (
          <AccessibleAlert
            severity="warning"
            description="Vous pouvez consulter cette convention via le lien ci-dessus. Pour information, nos services ne l'intègrent pas encore : les contenus et simulateurs proposés se baseront sur les dispositions générales du Code du travail."
            data-testid="agreement-not-treated-warning"
          />
        )}

        <div className={buttonRow}>
          <Button
            priority="secondary"
            onClick={handleDelete}
            type="button"
            className={dangerButton}
            aria-describedby="selected-agreement-name"
          >
            Supprimer
          </Button>
          <Button
            priority="secondary"
            iconId="fr-icon-arrow-go-back-line"
            iconPosition="right"
            onClick={handleEdit}
            type="button"
            aria-describedby="selected-agreement-name"
          >
            Modifier
          </Button>
          <Button priority="primary" onClick={handleClose} type="button">
            Fermer
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
        <Button
          priority={isEditing ? "primary" : "secondary"}
          onClick={handleClose}
          type="button"
        >
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
  overflow: "hidden",
  wordBreak: "break-word",
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

const selectedCardLink = css({
  fontSize: "1.25rem",
  wordBreak: "break-word",
});

const dangerButton = css({
  color: "var(--text-default-error)!",
  boxShadow: "inset 0 0 0 1px var(--text-default-error)!",
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
