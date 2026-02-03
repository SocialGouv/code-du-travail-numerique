"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Image from "next/image";
import { useAgreementStorageSync } from "src/modules/convention-collective/AgreementSelectionModal";

type Props = {
  id: string;
  isOpen: boolean;
  onClick: () => void;
};

export const HeaderAgreementButton = ({ id, isOpen, onClick }: Props) => {
  const { agreement } = useAgreementStorageSync();

  return (
    <button
      id={id}
      type="button"
      className={`${fr.cx("fr-btn", "fr-btn--tertiary")} ${buttonStyle}`}
      aria-controls="agreement-modal"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={onClick}
      data-testid="header-agreement-button"
    >
      <Image
        src="/static/assets/icons/search_agreement.svg"
        alt=""
        width={24}
        height={28}
        aria-hidden
      />
      <span className={textContainer}>
        {agreement ? (
          <>
            <span className={fr.cx("fr-text--xs", "fr-mb-0")}>
              CC {agreement.num}
            </span>
            <span className={`${fr.cx("fr-text--sm", "fr-mb-0")} ${titleLine}`}>
              {agreement.shortTitle}
            </span>
          </>
        ) : (
          <>
            <span className={`${fr.cx("fr-text--sm", "fr-mb-0")} ${titleLine}`}>
              Ma convention
            </span>
            <span className={`${fr.cx("fr-text--sm", "fr-mb-0")} ${titleLine}`}>
              collective
            </span>
          </>
        )}
      </span>
    </button>
  );
};

const buttonStyle = css({
  height: "48px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  minWidth: "164px",
  justifyContent: "flex-start",
});

const textContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  lineHeight: "1.1",
  overflow: "hidden",
});

const titleLine = css({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "9.5rem",
});
