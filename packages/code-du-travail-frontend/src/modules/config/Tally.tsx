"use client";

import React, { lazy, Suspense } from "react";
import Script from "next/script";
import { css } from "@styled-system/css";

type Props = {
  id: string;
};

function TallyWidgetComponent({ id }: Props) {
  return (
    <>
      <style jsx global>{`
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

        /* Full-screen styles for Tally popup */
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
      `}</style>

      <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
      <button
        type="button"
        className={buttonSuggestionStyles}
        data-tally-open={id}
        data-tally-width="500"
        data-tally-overlay="1"
        data-tally-auto-resize="true"
        aria-label="Mini sondage (1mn) !"
        aria-haspopup="dialog"
        aria-expanded="false"
      >
        <img
          className={imgSuggestionStyles}
          alt="Suggestion"
          src="/static/assets/img/emoj-wave.png"
          aria-hidden="true"
        />
        <span className={spanStyle}>Mini sondage (1mn) !</span>
      </button>
    </>
  );
}

const TallyWidget = lazy(async () => ({ default: TallyWidgetComponent }));

export function Tally({ id }: Props) {
  return (
    <Suspense fallback={null}>
      <TallyWidget id={id} />
    </Suspense>
  );
}

const buttonSuggestionStyles = css({
  position: "fixed",
  bottom: "1rem",
  left: "1rem",
  width: "auto",
  height: "3.8rem",
  borderRadius: "3rem",
  border: "none",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
  zIndex: 5,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "0",
  backgroundColor: "hsl(220deg, calc(100% - 34%), 33%)!",
  "&:hover img": {
    animation: "wiggle 2.5s ease 0s infinite",
  },
  "@media (max-width: 480px)": {
    height: "3rem",
    fontSize: "12px",
    paddingRight: "14px",
  },
});

const imgSuggestionStyles = css({
  height: "28px",
  width: "28px",
  margin: "0",
  marginRight: "8px",
  animation: "wiggle 2.5s ease 7.5s 1",
});

const spanStyle = css({
  color: "white",
  fontSize: "14px",
  lineHeight: "1.2",
  fontWeight: "500",
  whiteSpace: "nowrap",
  padding: "0",
});
