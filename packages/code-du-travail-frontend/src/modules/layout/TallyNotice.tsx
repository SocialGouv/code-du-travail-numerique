"use client";

import Script from "next/script";

export const TallyNotice = ({ onClose, id }) => {
  return (
    <>
      <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
      <div className="fr-notice fr-notice--info">
        <div className="fr-container">
          <div className="fr-notice__content fr-grid-row fr-grid-row--middle">
            <div className="fr-col-10 fr-grid-row fr-grid-row--middle">
              <p className="fr-notice__title">
                Donnez votre avis pour améliorer le site
              </p>
              <button
                className="fr-btn fr-btn--primary fr-ml-md-2w"
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
            </div>

            <button
              className={`fr-btn--close fr-btn fr-col-md-2`}
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
