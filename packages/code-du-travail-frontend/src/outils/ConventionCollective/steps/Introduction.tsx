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
          <br />
          <Text variant="secondary" fontWeight="700">
            Vous pouvez retrouver le nom de votre convention collective sur
            votre bulletin de paie ou sur votre contrat de travail.
          </Text>
        </p>
      </AlertWithIcon>
      <Flex>
        <Tile onClick={() => onSelecSearchType(SearchType.agreement)}>
          <Text fontWeight="700">Je connais ma convention collective</Text>
          <ButtonWrapper>
            <Button variant="link" as="div">
              Je la saisi
            </Button>
          </ButtonWrapper>
        </Tile>
        <Tile onClick={() => onSelecSearchType(SearchType.compagny)}>
          <Text fontWeight="700">
            Je ne connais pas ma convention collective
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
`;

const Tile = styled(TileUi)`
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 30%;
`;

const ButtonWrapper = styled.div`
  padding-top: ${theme.spacings.medium};
`;
