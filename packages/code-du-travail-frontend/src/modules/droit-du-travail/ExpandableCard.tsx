"use client";

import React, { useState, useRef } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Image from "next/image";

type ExpandableCardProps = {
  title: string;
  children: React.ReactNode;
  iconSrc: string;
  id?: string;
  backgroundColor?: string;
  showBottomTab?: boolean;
};

const ExpandableCard = ({
  title,
  children,
  iconSrc,
  id,
  backgroundColor,
  showBottomTab = false,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cardContainer(backgroundColor, showBottomTab)} id={id}>
      <button
        onClick={toggleExpand}
        className={cardButton}
        aria-expanded={isExpanded}
        aria-controls={`content-${title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <div className={cardHeader}>
          <div className={iconContainer}>
            <Image
              src={iconSrc}
              alt=""
              width={52}
              height={52}
              aria-hidden="true"
            />
          </div>
          <h3 className={`${fr.cx("fr-mb-0", "fr-h4")} ${titleStyle}`}>
            {title}
          </h3>
          <div className={arrowContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isExpanded ? expandedArrow : collapsedArrow}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </button>
      {isExpanded && (
        <div
          className={cardContent}
          id={`content-${title.replace(/\s+/g, "-").toLowerCase()}`}
          ref={contentRef}
        >
          {children}
        </div>
      )}
      {showBottomTab && (
        <div className={bottomTabContainer}>
          <div className={bottomTab(backgroundColor)}></div>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;

const cardContainer = (backgroundColor?: string, showBottomTab?: boolean) =>
  css({
    background: backgroundColor || "var(--background-alt-blue-cumulus)",
    overflow: showBottomTab ? "visible" : "hidden",
    height: "fit-content",
    transition: "all 0.3s ease",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  });

const titleStyle = css({
  color: "var(--text-action-high-blue-france)!",
});

const cardButton = css({
  width: "100%",
  height: "100%",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  textAlign: "left",
  "&:hover": {
    background: "none!",
  },
});

const cardHeader = css({
  display: "flex",
  alignItems: "center",
  paddingX: "16px",
  position: "relative",
  height: "100%",
  paddingY: "40px",
});

const iconContainer = css({
  marginRight: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const arrowContainer = css({
  marginLeft: "auto",
});

const collapsedArrow = css({
  transition: "transform 0.3s ease",
});

const expandedArrow = css({
  transition: "transform 0.3s ease",
  transform: "rotate(180deg)",
});

const cardContent = css({
  padding: "0 16px 16px 16px",
});

const bottomTabContainer = css({
  position: "absolute",
  bottom: "-15px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100px", // Augmenté de 60px à 100px
  height: "30px",
  overflow: "visible",
});

const bottomTab = (backgroundColor?: string) =>
  css({
    width: "100%",
    height: "100%",
    background: backgroundColor || "var(--background-alt-blue-cumulus)",
    clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
    filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))",
  });
