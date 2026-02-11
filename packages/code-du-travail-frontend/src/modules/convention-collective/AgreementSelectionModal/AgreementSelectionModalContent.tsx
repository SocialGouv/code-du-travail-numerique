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
  };

  if (agreement) {
    return (
      <div>
        <p className={fr.cx("fr-mb-2w")}>
          Votre convention collective est actuellement sélectionnée.
        </p>

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
                  IDCC {agreement.num}
                </p>
                <p className={fr.cx("fr-text--bold", "fr-mb-0")}>
                  {agreement.shortTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={buttonRow}>
          <Button
            priority="secondary"
            onClick={() => {
              clearAgreement();
            }}
            type="button"
          >
            Supprimer
          </Button>
          <Button priority="primary" onClick={onClose} type="button">
            Fermer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={infoBox}>
        <AgreementSelectionForm onAgreementSelect={handleSelect} />
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

      {/* <div className={buttonRow}>
        <Button priority="tertiary" onClick={onClose} type="button">
          Fermer
        </Button>
      </div> */}
    </div>
  );
};

const selectedContainer = css({
  padding: "1rem",
  backgroundColor: "var(--background-alt-blue-cumulus)",
  borderRadius: "0.25rem",
  marginBottom: "1rem",
});

const buttonRow = css({
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "1.5rem",
});

const infoBox = css({
  gap: "0.75rem",
  padding: "1rem",
  backgroundColor: "var(--background-alt-blue-cumulus)",
  borderRadius: "0.25rem",
});

const infoTextTopAligned = css({
  "&::before": {
    alignSelf: "flex-start",
    marginTop: "0.25rem",
  },
});
