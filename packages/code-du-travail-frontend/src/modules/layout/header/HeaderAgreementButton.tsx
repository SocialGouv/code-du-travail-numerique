"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Image from "next/image";
import { useAgreementStorageSync } from "src/modules/convention-collective/AgreementSelectionModal";
import { useBreakpoints } from "src/modules/common/useBreakpoints";

type Props = {
  id: string;
  isOpen: boolean;
  onClick: () => void;
};

export const HeaderAgreementButton = ({ id, isOpen, onClick }: Props) => {
  const { agreement } = useAgreementStorageSync();
  const { isBelow } = useBreakpoints();
  const isMobile = isBelow("lg");

  const fullTitle = agreement
    ? `${agreement.num} - ${agreement.shortTitle}`
    : "Ma convention collective";

  const iconSize = isMobile
    ? { width: 32, height: 36 }
    : { width: 24, height: 28 };

  return (
    <button
      id={id}
      type="button"
      className={`${fr.cx("fr-btn", "fr-btn--tertiary")} ${
        isMobile ? buttonStyleMobile : buttonStyle
      }`}
      aria-controls="agreement-modal"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={onClick}
      data-testid="header-agreement-button"
      title={fullTitle}
    >
      <Image
        src="/static/assets/icons/search_agreement.svg"
        alt=""
        width={iconSize.width}
        height={iconSize.height}
        aria-hidden
      />
      <span className={textContainer}>
        {agreement ? (
          <>
            <span className={fr.cx("fr-text--xs", "fr-mb-0")}>
              IDCC {agreement.num}
            </span>
            <span
              className={`${fr.cx("fr-text--sm", "fr-mb-0")} ${isMobile ? titleLineMobile : titleLine}`}
            >
              {agreement.shortTitle}
            </span>
          </>
        ) : (
          <span
            className={`${fr.cx("fr-text--sm", "fr-mb-0")} ${isMobile ? titleLineMobile : titleLine}`}
          >
            Ma convention collective
          </span>
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

const buttonStyleMobile = css({
  height: "56px",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  justifyContent: "center",
  maxWidth: "100%",
  border: "none",
  backgroundColor: "transparent",
  _hover: {
    backgroundColor: "var(--background-default-grey-hover)!",
  },
});

const textContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  lineHeight: "1.1",
  overflow: "hidden",
  minWidth: 0,
});

const titleLine = css({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "9.5rem",
});

const titleLineMobile = css({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
});
