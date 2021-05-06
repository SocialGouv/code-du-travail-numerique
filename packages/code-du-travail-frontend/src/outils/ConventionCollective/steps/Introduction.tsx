import {
  AlertWithIcon,
  Button,
  Text,
  theme,
  Tile as TileUi,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import {} from "../../common/type/WizardType";
import { SearchType } from "..";

type Props = {
  onSelecSearchType: (type: SearchType) => void;
};

const IntroductionStep = ({ onSelecSearchType }: Props): JSX.Element => {
  return (
    <>
      <AlertWithIcon variant="secondary">
        <p>
          La convention collective est un texte conclu au niveau d’une branche
          d’activité (Ex : Transports routiers). Elle adapte les règles du code
          du travail aux situations particulières de la branche (primes, congés,
          salaires minima, préavis, prévoyance…).
        </p>
        <Text as="p" fontWeight="700">
          Vous pouvez retrouver le nom de votre convention collective sur votre
          bulletin de paie ou sur votre contrat de travail.
        </Text>
      </AlertWithIcon>
      <Flex>
        <Tile onClick={() => onSelecSearchType(SearchType.agreement)}>
          <Text fontWeight="700">
            Je connais
            <br /> ma convention collective
          </Text>
          <ButtonWrapper>
            <Button variant="link" as="div">
              Je la saisie
            </Button>
          </ButtonWrapper>
        </Tile>
        <Tile onClick={() => onSelecSearchType(SearchType.compagny)}>
          <Text fontWeight="700">
            Je ne connais <br /> pas ma convention collective
          </Text>
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

const Tile = styled(TileUi)`
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
