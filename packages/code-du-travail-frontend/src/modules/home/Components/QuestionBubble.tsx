import React from "react";
import Image from "next/image";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";

interface QuestionBubbleProps {
  children: React.ReactNode;
}

export const QuestionBubble: React.FC<QuestionBubbleProps> = ({ children }) => {
  return (
    <div className={bubbleContainer}>
      <Image
        src="/static/assets/icons/home/bubble.svg"
        alt=""
        fill
        className={svgBubble}
        aria-hidden="true"
      />
      <div className={contentWrapper}>
        <p
          className={`${questionText} ${fr.cx("fr-text--md", "fr-text--bold")}`}
        >
          {children}
        </p>
      </div>
    </div>
  );
};

const bubbleContainer = css({
  position: "relative",
  width: "100%",
});

const svgBubble = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
});

const contentWrapper = css({
  position: "relative",
  zIndex: 1,
  paddingTop: "1.7rem",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  paddingBottom: "3.5rem",
});

const questionText = css({
  color: "var(--text-default-grey)",
  marginBottom: "0px!",
});
