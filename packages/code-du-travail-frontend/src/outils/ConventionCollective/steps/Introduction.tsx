import { SOURCES } from "@socialgouv/cdtn-sources";
import {
  AlertWithIcon,
  Button,
  Text,
  theme,
  Tile as TileUi,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import {} from "../../common/type/WizardType";
import { ScreenType, useNavContext } from "../common/NavContext";
import { useTrackingContext } from "../common/TrackingContext";

const IntroductionStep = (): JSX.Element => {
  const { trackEvent, uuid, title } = useTrackingContext();

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
        <Link
          href={`/${SOURCES.TOOLS}/convention-collective#${ScreenType.agreement}`}
          passHref
        >
          <Tile
            onClick={() =>
              trackEvent("cc_search_type_of_users", " click_p1", title, uuid)
            }
          >
            <Text as="p" fontWeight="700">
              Je connais
              <br /> ma convention collective
            </Text>
            <ButtonWrapper>
              <Button variant="link" as="div">
                Je la saisis
              </Button>
            </ButtonWrapper>
          </Tile>
        </Link>
        <Link
          href={`/${SOURCES.TOOLS}/convention-collective#${ScreenType.enterprise}`}
          passHref
        >
          <Tile
            onClick={() =>
              trackEvent("cc_search_type_of_users", " click_p2", title, uuid)
            }
          >
            <Text as="p" fontWeight="700">
              Je ne connais <br /> pas ma convention collective
            </Text>
            <ButtonWrapper>
              <Button variant="link" as="div">
                Je la recherche
              </Button>
            </ButtonWrapper>
          </Tile>
        </Link>
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
