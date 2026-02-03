"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import type { Agreement } from "src/modules/outils/indemnite-depart/types";
import { AgreementSelectionForm } from "./AgreementSelectionForm";
import { useAgreementStorageSync } from "./useAgreementStorageSync";

type Props = {
  onClose: () => void;
};

export const AgreementSelectionModalContent = ({ onClose }: Props) => {
  const { agreement, setAgreement, clearAgreement } = useAgreementStorageSync();

  const handleSelect = (nextAgreement: Agreement) => {
    setAgreement(nextAgreement);
    onClose();
  };

  return (
    <div>
      <p className={fr.cx("fr-mb-2w")}>
        Personnalisez les réponses du site en renseignant votre convention
        collective.
      </p>

      {agreement && (
        <div className={selectedContainer}>
          <div
            className={fr.cx("fr-card", "fr-card--sm", "fr-col-12")}
            data-testid="header-selected-agreement-card"
          >
            <div
              className={fr.cx("fr-card__body")}
              style={{
                border: "1px solid var(--border-action-high-blue-france)",
                borderRadius: "0.25rem",
              }}
            >
              <div
                className={fr.cx("fr-card__content", "fr-py-2w")}
                style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              >
                <p className={fr.cx("fr-text--xs", "fr-mb-1v")}>
                  CC {agreement.num}
                </p>
                <p className={fr.cx("fr-text--bold", "fr-mb-0")}>
                  {agreement.shortTitle}
                </p>
              </div>
            </div>
          </div>

          <div
            className={fr.cx("fr-mt-2w")}
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
          >
            <Button
              priority="secondary"
              onClick={() => {
                clearAgreement();
                onClose();
              }}
              type="button"
            >
              Supprimer
            </Button>
            <Button priority="tertiary" onClick={onClose} type="button">
              Fermer
            </Button>
          </div>
        </div>
      )}

      <AgreementSelectionForm
        defaultAgreement={agreement}
        onAgreementSelect={handleSelect}
      />

      {!agreement && (
        <div className={fr.cx("fr-mt-4w")}>
          <Button priority="tertiary" onClick={onClose} type="button">
            Fermer
          </Button>
        </div>
      )}
    </div>
  );
};

const selectedContainer = css({
  padding: "1rem",
  backgroundColor: "var(--background-alt-blue-cumulus)",
  borderRadius: "0.25rem",
});
