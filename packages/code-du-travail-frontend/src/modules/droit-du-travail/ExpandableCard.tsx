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
              width={40}
              height={40}
              aria-hidden="true"
            />
          </div>
          <h3 className={`${fr.cx("fr-mb-0", "fr-text--xl")} ${titleStyle}`}>
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
      {showBottomTab && <div className={bottomTab}></div>}
    </div>
  );
};

export default ExpandableCard;

const cardContainer = (backgroundColor?: string, showBottomTab?: boolean) =>
  css({
    background: backgroundColor || "var(--background-alt-blue-cumulus)",
    borderRadius: "8px",
    overflow: showBottomTab ? "visible" : "hidden",
    height: "fit-content",
    transition: "all 0.3s ease",
    position: "relative",
  });

const titleStyle = css({
  color: "var(--text-action-high-blue-france)!",
});

const cardButton = css({
  width: "100%",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  textAlign: "left",
});

const cardHeader = css({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  position: "relative",
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

const bottomTab = css({
  position: "absolute",
  bottom: "-15px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "60px",
  height: "30px",
  background: "inherit",
  clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
  zIndex: "-1",
});
