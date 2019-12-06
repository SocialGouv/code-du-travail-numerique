import React, { useState } from "react";
import {
  Button,
  Container,
  Section,
  theme,
  Title,
  Wrapper
} from "@socialgouv/react-ui";
import styled from "styled-components";
import { matopush } from "../../piwik";
import ServiceRenseignementModal from "../ServiceRenseignementModal";

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
        <Wrapper variant="dark">
          <Title as="h3">Avez-vous trouvé la réponse à votre question ?</Title>
          {isSatisfied === null && (
            <P>
              <StyledButton
                variant="secondary"
                onClick={() => onSetSatisfaction(false)}
              >
                Non
              </StyledButton>
              <StyledButton onClick={() => onSetSatisfaction(true)}>
                Oui
              </StyledButton>
            </P>
          )}
          {isSatisfied === true && <p>Merci pour votre réponse.</p>}
          {isSatisfied === false && (
            <p>
              Pour obtenir une réponse à votre question de droit du travail,
              nous vous invitons à joindre les{" "}
              <ServiceRenseignementModal>
                <Button variant="link">services de renseignement</Button>
              </ServiceRenseignementModal>
              .
            </p>
          )}
        </Wrapper>
      </Container>
    </Section>
  );
}

export { Feedback };

const { spacings } = theme;

const P = styled.p`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: ${spacings.base};
  }
`;
