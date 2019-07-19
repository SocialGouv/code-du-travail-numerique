import React, { useState } from "react";
import { Button, Container, Section, theme, Wrapper } from "@cdt/ui";
import styled from "styled-components";
import { matopush } from "../../piwik";

import { FeedbackForm } from "./FeedbackForm";
import {
  feedbackUrl,
  feedbackLightUrl,
  postFeedback
} from "./feedback.service";
import ServiceRenseignementModal from "../ServiceRenseignementModal";

function Feedback({
  query = "",
  sourceType = "",
  sourceFilter = "Tous contenus",
  url = document ? document.location.href : "",
  title = ""
}) {
  const [isSatisfied, setSatisfaction] = useState(null); // null, true, false,
  const [isSent, setSent] = useState(false); // false, true,

  const onSetSatisfaction = answer => {
    matopush([
      "trackEvent",
      "feedback",
      answer ? "positive" : "negative",
      url,
      query
    ]);
    postFeedback(feedbackLightUrl, {
      sourceFilter,
      isSatisfied: answer,
      query,
      title,
      sourceType,
      url: document.location.href,
      userAgent: typeof navigator !== "undefined" && navigator.userAgent
    });
    setSatisfaction(answer);
  };

  const submitFeedback = data => {
    matopush([
      "trackEvent",
      "feedback",
      isSatisfied ? "submit positive form" : "submit negative form",
      url,
      query
    ]);

    return postFeedback(feedbackUrl, data).then(() => {
      setSent(true);
    });
  };

  return (
    <Section>
      <Container narrow>
        <Wrapper variant="dark">
          <Title>Avez-vous trouvé la réponse à votre question ?</Title>
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
          {isSatisfied !== null && !isSent && (
            <FeedbackForm
              query={query}
              sourceFilter={sourceFilter}
              sourceType={sourceType}
              url={url}
              title={title}
              onSubmit={submitFeedback}
              isSatisfied={isSatisfied}
            />
          )}
          {isSent && <p>Nous avons bien reçu votre commentaire. Merci !</p>}
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

const { spacing } = theme;

const Title = styled.h3`
  margin-bottom: ${spacing.base};
`;

const P = styled.p`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  min-width: 7rem;
  & + & {
    margin-left: ${spacing.base};
  }
`;
