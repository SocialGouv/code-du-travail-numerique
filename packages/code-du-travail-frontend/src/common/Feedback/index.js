import React, { useState } from "react";
import { Button, theme, Section, ToggleButton } from "@cdt/ui";
import styled from "styled-components";
import ReactPiwik from "react-piwik";

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
    ReactPiwik.push([
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
      url,
      userAgent: typeof navigator !== "undefined" && navigator.userAgent
    });
    setSatisfaction(answer);
  };

  const submitFeedback = data => {
    ReactPiwik.push([
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
    <SectionWrapper className="wrapper-dark">
      <ContentWrapper>
        <Title>Avez-vous trouvé la réponse à votre question ?</Title>
        {isSatisfied === null && (
          <p>
            <StyledToggle
              variant="secondary"
              onClick={() => onSetSatisfaction(false)}
            >
              Non
            </StyledToggle>
            <StyledToggle onClick={() => onSetSatisfaction(true)}>
              Oui
            </StyledToggle>
          </p>
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
            Pour obtenir une réponse à votre question de droit du travail, nous
            vous invitons à joindre les{" "}
            <ServiceRenseignementModal>
              <Button link className="link">
                services de renseignement
              </Button>
            </ServiceRenseignementModal>
            .
          </p>
        )}
      </ContentWrapper>
    </SectionWrapper>
  );
}

export { Feedback };

const { spacing, breakpoints } = theme;

const SectionWrapper = styled(Section)`
  margin: 0 auto;
  max-width: calc(3 * ${breakpoints.desktop} / 4);
`;

const ContentWrapper = styled.div`
  position: relative;
  padding: 0 ${spacing.large};
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
  }
`;

const Title = styled.h3`
  margin-bottom: ${spacing.base};
`;

const StyledToggle = styled(ToggleButton)`
  min-width: 7rem;
  & + & {
    margin-left: ${spacing.base};
  }
`;
