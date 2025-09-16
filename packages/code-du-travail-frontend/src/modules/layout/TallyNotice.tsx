"use client";

import Script from "next/script";

export const TallyNotice = ({ onClose, id }) => {
  return (
    <>
      <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
      <div className="fr-notice fr-notice--info">
        <div className="fr-container">
          <div className="fr-notice__content fr-grid-row fr-grid-row--middle">
            <p className="fr-notice__title fr-col-11">
              Donnez votre avis pour améliorer le site
              <button
                className="fr-btn fr-btn--tertiary fr-ml-2w"
                data-tally-open={id}
                data-tally-width="500"
                data-tally-overlay="1"
                data-tally-auto-resize="true"
                aria-label="Ouvrir le formulaire d'avis"
                aria-haspopup="dialog"
                aria-expanded="false"
              >
                Répondre
              </button>
            </p>

            <button
              className={`fr-btn--close fr-btn fr-col-1`}
              title="Fermer la notice"
              onClick={onClose}
              aria-label="Fermer la notice"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
