"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { useNeedMoreInfoEvents } from "src/modules/besoin-plus-informations/tracking";

export const NeedMoreInfo = () => {
  const { emitModalIsOpened } = useNeedMoreInfoEvents();

  return (
    <div className={mainContainer} id="more-info">
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
          <div className={`${fr.cx("fr-col-md-6", "fr-py-6w")}`}>
            <div
              role="heading"
              aria-level={2}
              className={`${fr.cx("fr-h2")} ${title}`}
            >
              Besoin de plus d&apos;informations ?
            </div>
            <p className={paragraph}>
              Les services du ministère du Travail en région informent,
              conseillent et orientent les salariés et les employeurs du secteur
              privé sur leurs questions en droit du travail.
            </p>
            <div className={buttonContainer}>
              <Button
                linkProps={{
                  href: "/besoin-plus-informations",
                  onClick: emitModalIsOpened,
                }}
                iconId="fr-icon-chat-3-line"
                iconPosition="right"
                priority="secondary"
              >
                Contacter nos services en région
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mainContainer = css({
  background: "var(--background-alt-blue-cumulus)",
  "@media print": {
    display: "none",
  },
});

const title = css({
  color: "var(--text-action-high-blue-france) !important",
  textAlign: "center",
});

const paragraph = css({
  color: "var(--text-action-high-blue-france)",
});

const buttonContainer = css({
  display: "flex",
  justifyContent: "center",
});
