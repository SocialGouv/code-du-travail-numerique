"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "../../../../styled-system/css";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { PopupContent } from "./PopupContent";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useNeedMoreInfoEvents } from "./tracking";
import { useEffect } from "react";

export const needMoreInfoModal = createModal({
  id: "more-info-modal",
  isOpenedByDefault: false,
});

export const NeedMoreInfo = () => {
  const isOpen = useIsModalOpen(needMoreInfoModal);
  const { emitModalIsOpened } = useNeedMoreInfoEvents();

  useEffect(() => {
    if (isOpen) emitModalIsOpened();
  }, [isOpen, emitModalIsOpened]);

  return (
    <div className={mainContainer} id="more-info">
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
          <div className={`${fr.cx("fr-col-md-6", "fr-py-6w")}`}>
            <h2 className={title}>Besoin de plus d&apos;informations ?</h2>
            <p className={paragraph}>
              Les services du ministère du Travail en région informent,
              conseillent et orientent les salariés et les employeurs du secteur
              privé sur leurs questions en droit du travail.
            </p>
            <div className={buttonContainer}>
              <Button
                iconId="fr-icon-chat-3-line"
                iconPosition="right"
                priority="secondary"
                nativeButtonProps={needMoreInfoModal.buttonProps}
              >
                Trouver les services près de chez moi
              </Button>
              <needMoreInfoModal.Component title="Les services du ministère du Travail">
                <PopupContent />
              </needMoreInfoModal.Component>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mainContainer = css({
  background: "var(--background-alt-blue-cumulus)",
});

const title = css({
  color: "var(--text-action-high-blue-france) !important",
  textAlign: "center",
});

const paragraph = css({
  color: "var(--text-action-high-blue-france)",
  textAlign: "start",
});

const buttonContainer = css({
  display: "flex",
  justifyContent: "center",
});
