import { SOURCES } from "@socialgouv/cdtn-sources";
import { AlertWithIcon, Button, Paragraph, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { ScreenType } from "../common/NavContext";
import { TrackingProps, UserAction } from "../types";
import { LinkedTile } from "../../../common/tiles/LinkedTile";

type Props = TrackingProps;

const IntroductionStep = ({ onUserAction }: Props): JSX.Element => {
  return (
    <>
      <AlertWithIcon variant="secondary">
        <p>
          La convention collective est un texte conclu au niveau d’une branche
          d’activité (Ex : Transports routiers). Elle adapte les règles du Code
          du travail sur des points précis, en fonction des situations
          particulières de la branche (primes, congés, salaires minima, préavis,
          prévoyance…).
        </p>
        <Paragraph noMargin fontWeight="700">
          Vous pouvez retrouver le nom de votre convention collective sur votre
          bulletin de paie ou sur votre contrat de travail.
        </Paragraph>
      </AlertWithIcon>
      <Flex>
        <Tile
          onClick={() => onUserAction(UserAction.SelectAgreementRoute)}
          href={`/${SOURCES.TOOLS}/convention-collective#${ScreenType.agreement}`}
        >
          <Paragraph noMargin fontWeight="700">
            Je connais
            <br /> ma convention collective
          </Paragraph>
          <ButtonWrapper>
            <Button variant="link" as="div">
              Je la saisis
            </Button>
          </ButtonWrapper>
        </Tile>

        <Tile
          onClick={() => onUserAction(UserAction.SelectEnterpriseRoute)}
          href={`/${SOURCES.TOOLS}/convention-collective#${ScreenType.enterprise}`}
        >
          <Paragraph noMargin fontWeight="700">
            Je ne connais <br /> pas ma convention collective
          </Paragraph>
          <ButtonWrapper>
            <Button variant="link" as="div">
              Je la recherche
            </Button>
          </ButtonWrapper>
        </Tile>
      </Flex>
    </>
  );
};

export { IntroductionStep };

const Flex = styled.div`
  display: flex;
  padding-top: ${theme.spacings.medium};
  justify-content: space-around;
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Tile = styled(LinkedTile)`
  flex: 0 1 auto;
  width: 28rem;
  @media (max-width: ${theme.breakpoints.mobile}) {
    & + & {
      margin-top: ${theme.spacings.medium};
    }
  }
`;

const ButtonWrapper = styled.div`
  padding-top: ${theme.spacings.medium};
`;
