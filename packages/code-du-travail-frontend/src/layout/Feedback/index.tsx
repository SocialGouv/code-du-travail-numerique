import styled from "styled-components";
import React from "react";
import Script from "next/script";
import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseEvent } from "../../lib";

export const Feedback = (): React.ReactNode => {
  const onClick = () => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.HEADER,
      "click_bandeau",
    ]);
  };
  return (
    <>
      <Script id="tally-js" src="https://tally.so/widgets/embed.js"></Script>
      <ButtonSuggestion
        data-tally-open="3jLRW1"
        data-tally-width="500"
        data-tally-overlay="1"
        aria-label="Donner votre avis"
        aria-haspopup="dialog"
        aria-expanded="false"
        onClick={onClick}
      >
        <ImgSuggestion
          alt="Suggestion"
          src="/static/assets/img/emoj-wave.png"
          aria-hidden="true"
        />
      </ButtonSuggestion>
    </>
  );
};

const ButtonSuggestion = styled.button`
  position: fixed;
  top: 22.5rem;
  right: 0px;
  width: 5.8rem;
  height: 5.8rem;
  background-color: hsl(220deg, calc(100% - 34%), 33%);
  border-radius: 3rem 0px 0px 3rem;
  font-size: 2rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px;
  z-index: 5;
  cursor: pointer;
`;

const ImgSuggestion = styled.img`
  height: 1.4em;
  width: 1.4em;
  margin: 0px 0.05em 0px 0.1em;
  vertical-align: -0.1em;
  &:hover {
    animation: 2.5s ease 0s infinite normal none running wiggle;
    transform-origin: 70% 70%;
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
`;
