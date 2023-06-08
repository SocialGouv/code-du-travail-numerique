import React from "react";
import { Heading, Toast, theme, Button } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { useRouter } from "next/router";
import { push as matopush } from "@socialgouv/matomo-next";
import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
  MatomoSimulatorEvent,
  MatomoSimulatorNameEvent,
} from "../../../lib";

export function NoEnterprise(): JSX.Element {
  const router = useRouter();

  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
      MatomoSimulatorEvent.CLICK_JE_N_AI_PAS_D_ENTREPRISE,
      MatomoSimulatorNameEvent.TROUVER_SA_CC,
    ]);
    router.push(
      `/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile`
    );
  };

  return (
    <Container>
      <Toast>
        <Heading
          as={StyledText}
          variant="primary"
          stripe="left"
          shift={theme.spacings.medium}
        >
          <strong>Vous n&apos;avez pas d&apos;entreprise</strong> (votre
          recherche concerne les assistants maternels, employés de maison, etc.)
          ?
        </Heading>
        <StyledButton variant="link" hasText onClick={onClick}>
          Consultez votre convention collective
        </StyledButton>
      </Toast>
    </Container>
  );
}

const { spacings, fonts } = theme;

const Container = styled.div`
  margin-top: ${spacings.large};
`;

const StyledText = styled.p`
  margin-top: ${spacings.small};
  margin-bottom: ${spacings.small};
  font-size: ${fonts.sizes.small};
  font-weight: 400;
`;

const StyledButton = styled(Button)`
  font-size: ${fonts.sizes.small};
  margin-bottom: ${spacings.small};
`;
