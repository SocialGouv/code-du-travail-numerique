"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Script from "next/script";
import { css } from "@styled-system/css";

type TallyNoticeProps = { id: string };

export const TallyNotice = ({ id }: TallyNoticeProps) => {
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
              "fr-col-md-9",
              "fr-my-1w"
            )}
          >
            Est-ce que le terme &quot;accord d&apos;entreprise&quot; vous parle
            ? Si ça ne vous parle pas, ça nous intéresse aussi ! (30 sec)
          </p>
          <button
            className={`${fr.cx(
              "fr-btn",
              //@ts-ignore
              "fr-btn--primary",
              "fr-ml-md-2w",
              "fr-col-12",
              "fr-col-md-2",
              "fr-text--middle",
              "fr-btn--icon-left",
              "fr-icon-draft-fill"
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
