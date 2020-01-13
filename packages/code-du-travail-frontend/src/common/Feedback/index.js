import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  Section,
  theme,
  Wrapper
} from "@socialgouv/react-ui";
import styled from "styled-components";
import { matopush } from "../../piwik";
import { ServiceRenseignementModal } from "../ServiceRenseignementModal";

function Feedback({
  query = "",
  url = document ? document.location.href : ""
}) {
  const [isSatisfied, setSatisfaction] = useState(null); // null, true, false,

  const onSetSatisfaction = answer => {
    matopush([
      "trackEvent",
      "feedback",
      answer ? "positive" : "negative",
      url,
      query
    ]);
    setSatisfaction(answer);
  };

  return (
    <Section>
      <Container>
        <StyledWrapper variant="light">
          <StyledHeading
            variant="primary"
            stripped
            shift={theme.spacings.xmedium}
          >
            Avez-vous trouvé la réponse à votre question&nbsp;?
          </StyledHeading>
          {isSatisfied === null && (
            <YesNo>
              <StyledButton
                variant="flat"
                onClick={() => onSetSatisfaction(false)}
              >
                Non
              </StyledButton>
              <StyledButton
                variant="flat"
                onClick={() => onSetSatisfaction(true)}
              >
                Oui
              </StyledButton>
            </YesNo>
          )}
          {isSatisfied === true && (
            <FullWidthParagraph>Merci pour votre réponse.</FullWidthParagraph>
          )}
          {isSatisfied === false && (
            <FullWidthParagraph>
              Merci pour votre réponse. Pour obtenir une réponse à votre
              question de droit du travail, nous vous invitons à joindre les{" "}
              <ServiceRenseignementModal>
                {openModal => (
                  <Button variant="link" onClick={openModal}>
                    services du ministère du Travail en région
                  </Button>
                )}
              </ServiceRenseignementModal>
              .
            </FullWidthParagraph>
          )}
        </StyledWrapper>
      </Container>
    </Section>
  );
}

export { Feedback };

const { breakpoints, spacings } = theme;

const StyledWrapper = styled(Wrapper)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: stretch;
  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
    align-items: stretch;
    max-width: 60rem;
    margin-right: auto;
    margin-left: auto;
  }
`;

const StyledHeading = styled(Heading)`
  flex: 0 1 auto;
  margin-bottom: 0;
  padding-top: ${spacings.small};
  padding-bottom: ${spacings.small};
  @media (max-width: ${breakpoints.desktop}) {
    margin-bottom: ${spacings.base};
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const YesNo = styled.p`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  margin: 0;
  @media (max-width: ${breakpoints.desktop}) {
    justify-content: space-around;
  }
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: ${spacings.larger};
    @media (max-width: ${breakpoints.desktop}) {
      margin-left: 0;
    }
  }
`;

const FullWidthParagraph = styled.p`
  flex: 1 0 100%;
  @media (max-width: ${breakpoints.desktop}) {
    margin-top: 0;
  }
`;
