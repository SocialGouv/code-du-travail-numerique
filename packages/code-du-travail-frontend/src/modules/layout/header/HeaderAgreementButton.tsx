"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Image from "next/image";
import { useState } from "react";
import { useAgreementStorageSync } from "src/modules/convention-collective/AgreementSelectionModal";
import { useBreakpoints } from "src/modules/common/useBreakpoints";

type Props = {
  id: string;
  onClick: () => void;
};

export const HeaderAgreementButton = ({ id, onClick }: Props) => {
  const { agreement } = useAgreementStorageSync();
  const { isBelow } = useBreakpoints();
  const isMobile = isBelow("lg");
  const [focusTooltip, setFocusTooltip] = useState(false);

  const tooltipText = agreement
    ? `Modifier ma convention collective : IDCC ${agreement.num} - ${agreement.shortTitle}`
    : "Renseignez votre convention collective pour personnaliser nos contenus";

  const iconSize = isMobile
    ? { width: 32, height: 36 }
    : { width: 24, height: 28 };

  const tooltipId = `${id}-tooltip`;

  return (
    <div className={tooltipWrapper}>
      <button
        id={id}
        type="button"
        className={`${fr.cx("fr-btn", "fr-btn--tertiary")} ${
          isMobile ? buttonStyleMobile : buttonStyle
        }`}
        aria-controls="agreement-modal"
        aria-haspopup="dialog"
        aria-describedby={tooltipId}
        onFocus={() => setFocusTooltip(true)}
        onBlur={() => setFocusTooltip(false)}
        onClick={() => {
          setFocusTooltip(false);
          onClick();
        }}
        data-testid="header-agreement-button"
      >
        <Image
          src="/static/assets/icons/search_agreement.svg"
          alt=""
          width={iconSize.width}
          height={iconSize.height}
          aria-hidden="true"
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
      <span
        className={`${tooltipStyle} ${focusTooltip ? tooltipVisible : ""}`}
        id={tooltipId}
        role="tooltip"
      >
        {tooltipText}
      </span>
    </div>
  );
};

const tooltipWrapper = css({
  position: "relative",
  minWidth: 0,
  maxWidth: "100%",
  "&:hover > [role='tooltip']": {
    visibility: "visible!",
    opacity: "1!",
  },
});

const tooltipStyle = css({
  position: "absolute",
  top: "calc(100% + 12px)",
  left: "50%",
  transform: "translateX(-50%)",
  visibility: "hidden",
  opacity: 0,
  transition: "opacity 0.15s, visibility 0.15s",
  padding: "0.5rem 0.75rem",
  fontSize: "0.75rem",
  lineHeight: "1.25rem",
  color: "var(--text-default-grey)",
  backgroundColor: "var(--background-overlap-grey)",
  border: "1px solid var(--border-default-grey)",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.16)",
  zIndex: 999,
  pointerEvents: "none",
  whiteSpace: "normal",
  width: "max-content",
  maxWidth: "min(24rem, calc(100vw - 2rem))",
  textAlign: "left",
  "&::after": {
    content: "''",
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    borderWidth: "0 9px 9px 9px",
    borderStyle: "solid",
    borderColor:
      "transparent transparent var(--border-default-grey) transparent",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    bottom: "calc(100% - 1px)",
    left: "50%",
    transform: "translateX(-50%)",
    borderWidth: "0 8px 8px 8px",
    borderStyle: "solid",
    borderColor:
      "transparent transparent var(--background-overlap-grey) transparent",
    zIndex: 1,
  },
});

const tooltipVisible = css({
  visibility: "visible!",
  opacity: "1!",
});

const buttonStyle = css({
  height: "48px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  minWidth: "164px",
  maxWidth: "20rem",
  justifyContent: "flex-start",
});

const buttonStyleMobile = css({
  height: "56px",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  justifyContent: "flex-start",
  maxWidth: "100%",
  overflow: "hidden",
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
  maxWidth: "100%",
});

const titleLineMobile = css({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
});
