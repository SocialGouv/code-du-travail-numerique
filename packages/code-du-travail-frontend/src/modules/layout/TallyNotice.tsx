"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import Script from "next/script";
import { css } from "@styled-system/css";
import { useState, useEffect } from "react";

type TallyNoticeProps = { onClose: () => void; id: string };

export const TallyNotice = ({ onClose, id }: TallyNoticeProps) => {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);

  useEffect(() => {
    const isClosed = localStorage.getItem("tallyNoticeClosed");
    if (!isClosed || isClosed === "false") {
      setIsNoticeVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("tallyNoticeClosed", "true");
    setIsNoticeVisible(false);
    onClose();
  };

  if (!isNoticeVisible) {
    return null;
  }

  return (
    <>
      <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
      <div className={fr.cx("fr-notice", "fr-notice--info")}>
        <div
          className={`${fr.cx(
            "fr-container",
            //@ts-ignore
            "fr-notice__content",
            "fr-grid-row",
            "fr-grid-row--middle"
          )} ${containerStyles}`}
        >
          <p
            className={fr.cx(
              "fr-notice__title",
              "fr-col-12",
              "fr-col-md-4",
              "fr-my-1w"
            )}
          >
            Donnez votre avis pour améliorer le site
          </p>
          <button
            className={`${fr.cx(
              "fr-btn",
              //@ts-ignore
              "fr-btn--primary",
              "fr-ml-md-2w",
              "fr-col-12",
              "fr-col-md-2",
              "fr-text--middle"
            )} ${respondButtonStyles}`}
            data-tally-open={id}
            data-tally-width="700"
            data-tally-overlay="1"
            data-tally-auto-resize="true"
            aria-label="Ouvrir le formulaire d'avis"
            aria-haspopup="dialog"
            aria-expanded="false"
          >
            Répondre
          </button>
          <Button
            iconId="fr-icon-close-line"
            onClick={handleClose}
            priority="tertiary no outline"
            title="Fermer la notice"
            className={closeButtonStyles}
            size="small"
            nativeButtonProps={{ "aria-label": "Fermer la notice" }}
          ></Button>
        </div>
      </div>
    </>
  );
};

const containerStyles = css({ position: "relative" });

const respondButtonStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const closeButtonStyles = css({
  position: "absolute",
  top: "0rem",
  right: "1rem",
  zIndex: 10,
});
