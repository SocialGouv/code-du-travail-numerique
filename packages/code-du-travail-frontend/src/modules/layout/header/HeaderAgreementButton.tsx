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
  variant?: "desktop" | "mobile";
};

export const HeaderAgreementButton = ({
  id,
  isOpen,
  onClick,
  variant = "desktop",
}: Props) => {
  const { agreement } = useAgreementStorageSync();
  const { isBelow } = useBreakpoints();
  const isMobile = isBelow("lg");

  const fullTitle = agreement
    ? `${agreement.num} - ${agreement.shortTitle}`
    : "Ma convention collective";

  const isMobileVariant = variant === "mobile";
  const iconSize = isMobileVariant
    ? { width: 32, height: 36 }
    : { width: 24, height: 28 };

  const tooltipId = `${id}-tooltip`;

  return (
    <>
      <button
        id={id}
        type="button"
        className={`${fr.cx("fr-btn", "fr-btn--tertiary")} ${
          isMobileVariant ? buttonStyleMobile : buttonStyle
        }`}
        aria-controls="agreement-modal"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={onClick}
        data-testid="header-agreement-button"
        aria-describedby={tooltipId}
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
                CC {agreement.num}
              </span>
              <span
                className={`${fr.cx("fr-text--sm", "fr-mb-0")} ${isMobile || isMobileVariant ? titleLineMobile : titleLine}`}
              >
                {agreement.shortTitle}
              </span>
            </>
          ) : (
            <span
              className={`${fr.cx("fr-text--sm", "fr-mb-0")} ${isMobile || isMobileVariant ? titleLineMobile : titleLine}`}
            >
              Ma convention collective
            </span>
          )}
        </span>
      </button>
      <span
        className={fr.cx("fr-tooltip", "fr-placement")}
        id={tooltipId}
        role="tooltip"
      >
        {fullTitle}
      </span>
    </>
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
