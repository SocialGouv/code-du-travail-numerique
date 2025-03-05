import styled from "styled-components";
import React from "react";
import Script from "next/script";
import { theme } from "@socialgouv/cdtn-ui";

export const Tally = (): React.ReactNode => {
  return (
    <>
      <Script id="tally-js" async src="https://tally.so/widgets/embed.js" />
      <ButtonSuggestion
        data-tally-open="3Xzlkg"
        data-tally-width="500"
        data-tally-overlay="1"
        aria-label="Donner votre avis"
        aria-haspopup="dialog"
        aria-expanded="false"
      >
        <ImgSuggestion
          alt="Suggestion"
          src="/static/assets/img/emoj-wave.png"
          aria-hidden="true"
        />
        <span>Donnez votre avis</span>
      </ButtonSuggestion>
    </>
  );
};

const ButtonSuggestion = styled.button`
  position: fixed;
  top: 22.5rem;
  right: -7.2rem;
  width: 12.7rem;
  height: 5.8rem;
  background-color: hsl(220deg, calc(100% - 34%), 33%);
  border-radius: 3rem 0px 0px 3rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px;
  z-index: 5;
  cursor: pointer;
  display: flex;
  padding-top: 10px;
  @media (min-width: ${theme.breakpoints.desktop}) {
    animation: moveLeftAndRight 30s ease-in-out infinite 5s;
  }
  span {
    color: white;
    font-size: 14px;
    padding-left: 5px;
  }
  @keyframes moveLeftAndRight {
    0% {
      right: -7.2rem;
    }
    6.66% {
      right: 0;
    }
    23.33% {
      right: 0;
    }
    30% {
      right: -7.2rem;
    }
    100% {
      right: -7.2rem;
    }
  }
`;

const ImgSuggestion = styled.img`
  height: 28px;
  width: 28px;
  margin-top: 5px;
  margin-left: 12px;
  animation: wiggle 2.5s ease 7.5s 1;
  //transform-origin: 70% 70%;
  &:hover {
    animation: 2.5s ease 0s infinite normal none running wiggle;
    //transform-origin: 70% 70%;
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
