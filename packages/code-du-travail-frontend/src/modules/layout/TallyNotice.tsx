"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import Script from "next/script";

type TallyNoticeProps = { onClose: () => void; id: string };

export const TallyNotice = ({ onClose, id }: TallyNoticeProps) => {
  return (
    <>
      <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
      <div className="fr-notice fr-notice--info">
        <div
          className="fr-container fr-notice__content fr-grid-row fr-grid-row--middle"
          style={{ position: "relative" }}
        >
          <p className="fr-notice__title fr-col-12 fr-col-md-4 fr-my-1w">
            Donnez votre avis pour améliorer le site
          </p>
          <button
            className="fr-btn fr-btn--primary fr-ml-md-2w fr-col-12 fr-col-md-2 fr-text--middle"
            data-tally-open={id}
            data-tally-width="500"
            data-tally-overlay="1"
            data-tally-auto-resize="true"
            aria-label="Ouvrir le formulaire d'avis"
            aria-haspopup="dialog"
            aria-expanded="false"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Répondre
          </button>

          <Button
            iconId="fr-icon-close-line"
            onClick={onClose}
            priority="tertiary no outline"
            title="Fermer la notice"
            style={{
              position: "absolute",
              top: "0rem",
              right: "1rem",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </>
  );
};
