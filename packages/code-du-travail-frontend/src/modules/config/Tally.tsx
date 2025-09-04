"use client";

import React, { lazy, Suspense } from "react";
import Script from "next/script";
import { css } from "@styled-system/css";

const TallyWidget = lazy(() =>
  Promise.resolve({ default: TallyWidgetComponent })
);

type Props = {
  id: string;
};

const TallyWidgetComponent = ({ id }: Props): React.ReactNode => {
  return (
    <>
      <style jsx global>{`
        @keyframes moveLeftAndRight {
          0% {
            right: -10.2rem;
          }
          6.66% {
            right: -4.5rem;
          }
          23.33% {
            right: -4.5rem;
          }
          30% {
            right: -10.2rem;
          }
          100% {
            right: -10.2rem;
          }
        }

        @keyframes wiggle {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          30% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(14deg);
          }
          60% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>

      <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
      <button
        className={buttonSuggestionStyles}
        data-tally-open={id}
        data-tally-width="500"
        data-tally-overlay="1"
        aria-label="Donner votre avis"
        aria-haspopup="dialog"
        aria-expanded="false"
      >
        <img
          className={imgSuggestionStyles}
          alt="Suggestion"
          src="/static/assets/img/emoj-wave.png"
          aria-hidden="true"
        />
        <span className={spanStyle}>Donnez votre avis</span>
      </button>
    </>
  );
};

export const Tally = ({ id }: Props): React.ReactNode => {
  return (
    <Suspense fallback={null}>
      <TallyWidget id={id} />
    </Suspense>
  );
};

const buttonSuggestionStyles = css({
  position: "fixed",
  top: "12rem",
  right: "-10.2rem",
  width: "13.5rem",
  height: "3.8rem",
  borderRadius: "3rem 0px 0px 3rem",
  border: "none",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
  zIndex: 5,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingLeft: "16px",
  paddingTop: "0",
  backgroundColor: "hsl(220deg, calc(100% - 34%), 33%)!",
  "@media (min-width: 1200px)": {
    animation: "moveLeftAndRight 30s ease-in-out infinite 5s",
  },
});

const imgSuggestionStyles = css({
  height: "28px",
  width: "28px",
  margin: "0",
  marginRight: "8px",
  animation: "wiggle 2.5s ease 7.5s 1",
  "&:hover": {
    animation: "wiggle 2.5s ease 0s infinite",
  },
});

const spanStyle = css({
  color: "white",
  fontSize: "14px",
  lineHeight: "1.2",
  fontWeight: "500",
  maxWidth: "90px",
  wordWrap: "break-word",
  padding: "0",
});
