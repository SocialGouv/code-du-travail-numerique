import React from "react";
import Link from "next/link";
import { AlertCircle } from "react-feather";
import { IconStripe, theme } from "@socialgouv/react-ui";
import styled from "styled-components";

const HeadBandAlert = () => {
  return (
    <Headband>
      <Centerer>
        <Link
          href="/dossiers/[slug]"
          as="/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"
          passHref
        >
          <StyledLinkHeadband>
            <IconStripe icon={AlertCircle} small centered>
              Coronavirus (Covid-19) : notre dossier dédié
            </IconStripe>
          </StyledLinkHeadband>
        </Link>
      </Centerer>
    </Headband>
  );
};

const { spacings } = theme;

const Centerer = styled.div`
  display: flex;
  justify-content: center;
`;

const Headband = styled.div`
  padding: ${spacings.small};
  color: white;
  background-color: #fb7721;
`;

const StyledLinkHeadband = styled.a`
  color: ${({ theme }) => theme.white};
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.white};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.white};
  }
`;

export default HeadBandAlert;
