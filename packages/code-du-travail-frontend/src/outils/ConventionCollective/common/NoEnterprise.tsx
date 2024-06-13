import React from "react";
import { Button, Heading, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { push as matopush } from "@socialgouv/matomo-next";
import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
  MatomoSimulatorEvent,
  MatomoSimulatorNameEvent,
} from "../../../lib";
import { FeedbackWrapper } from "../../../common/Feedback/FeedbackWrapper";
import { useRouter } from "next/router";

type Props = {
  widgetMode: boolean;
};

export function NoEnterprise(props: Props): JSX.Element {
  const router = useRouter();
  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
      MatomoSimulatorEvent.CLICK_NO_COMPANY,
      MatomoSimulatorNameEvent.FIND_AGREEMENT,
    ]);
    if (props.widgetMode) {
      window.open(
        `/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile`,
        "_blank"
      );
    } else {
      router.push(
        "/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile"
      );
    }
  };

  return (
    <Container>
      <FeedbackWrapper>
        <Heading
          as={StyledText}
          variant="primary"
          stripe="left"
          shift={theme.spacings.xmedium}
        >
          Votre recherche concerne <strong>les assistants maternels, employés de maison</strong> ?
        </Heading>
        <StyledButton variant="link" onClick={onClick}>
          Consultez votre convention collective
        </StyledButton>
      </FeedbackWrapper>
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
