import React from "react";
import { Heading, Toast, theme, Button } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { useRouter } from "next/router";
import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseAction, MatomoBaseEvent } from "../../../lib";

export function NoEnterprise(): JSX.Element {
  const router = useRouter();

  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // TODO: okkk
    // matopush([
    //   MatomoBaseEvent.OUTIL,
    //   MatomoBaseEvent.TROUVER_SA_CC,
    //   MatomoBaseAction.CLICK + "_je n'ai pas d'entreprise",
    // ]);
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
