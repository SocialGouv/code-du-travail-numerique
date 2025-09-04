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

        /* Mobile responsive styles for Tally popup */
        @media (max-width: 768px) {
          .tally-popup-iframe,
          iframe[src*="tally.so"] {
            width: 100vw !important;
            max-width: 100vw !important;
            height: 95vh !important;
            max-height: 95vh !important;
            left: 0 !important;
            top: 5vh !important;
            right: 0 !important;
            bottom: 0 !important;
            border-radius: 8px !important;
            position: fixed !important;
            z-index: 999999 !important;
          }

          .tally-popup-overlay {
            background-color: rgba(0, 0, 0, 0.8) !important;
          }
        }
      `}</style>

      <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
      <button
        className={buttonSuggestionStyles}
        data-tally-open={id}
        data-tally-width="500"
        data-tally-overlay="1"
        data-tally-auto-resize="true"
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
  "@media (max-width: 768px)": {
    top: "8rem",
    right: "-9rem",
    width: "12rem",
    height: "3.5rem",
    fontSize: "13px",
    animation: "none",
  },
  "@media (max-width: 480px)": {
    top: "6rem",
    right: "-8.5rem",
    width: "11rem",
    height: "3.2rem",
    fontSize: "12px",
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
