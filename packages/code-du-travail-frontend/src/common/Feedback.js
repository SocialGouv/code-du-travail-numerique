import React, { useState } from "react";
import { Button, theme, Section, ToggleButton, icons } from "@cdt/ui";
import { FeedbackForm } from "./FeedbackForm";
import styled from "styled-components";
import ReactPiwik from "react-piwik";

import { postFeedback } from "./feedback.service";
import ServiceRenseignementModal from "./ServiceRenseignementModal";

function Feedback({ query = "", source = "Tous contenus", url = "" }) {
  const [isSatisfied, setSatisfaction] = useState(null); // null, true, false,
  const [isSent, setIsSent] = useState(false); // false, true,

  const onAnswerChange = answer => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      answer ? "thumb up" : "thumb down",
      url,
      query
    ]);
    setSatisfaction(answer);
  };

  const resetAnswer = () => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      isSatisfied ? "cancel form positive" : "cancel form negative",
      url,
      query
    ]);
    setSatisfaction(null);
  };

  const submitFeedback = data => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      isSatisfied ? "submit positive form" : "submit negative form",
      url,
      query
    ]);

    return postFeedback(data).then(() => {
      setIsSent(true);
    });
  };

  return (
    <Section className="wrapper-dark wrapper-narrow">
      <Layout>
        <Icon />
        <div>
          <Title>Avez-vous trouvé la réponse à votre question ?</Title>
          <p>
            <StyledToggle
              secondary
              disabled={isSatisfied !== null}
              pressed={isSatisfied === false}
              onClick={() => onAnswerChange(false)}
            >
              Non
            </StyledToggle>
            <StyledToggle
              disabled={isSatisfied !== null}
              pressed={isSatisfied === true}
              onClick={() => onAnswerChange(true)}
            >
              Oui
            </StyledToggle>
          </p>
          {isSatisfied !== null && !isSent && (
            <FeedbackForm
              query={query}
              source={source}
              url={url}
              onSubmit={submitFeedback}
              onReset={resetAnswer}
              askMotif={isSatisfied === false}
            />
          )}
          {isSent && <p>Nous avons bien reçu votre commentaire. Merci !</p>}
          {isSatisfied === false && (
            <div>
              Vous pouvez également{" "}
              <ServiceRenseignementModal>
                <Button link className="link">
                  joindre les services de renseignement
                </Button>
              </ServiceRenseignementModal>{" "}
              de votre région afin d&apos;obtenir une réponse
            </div>
          )}
        </div>
      </Layout>
    </Section>
  );
}

export { Feedback };

const { colors, spacing, fonts } = theme;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${spacing.base};
`;
const Icon = styled(icons.Lost)`
  flex-basis: calc(2rem + 0.5vw);
  min-width: 2rem;
  margin: ${spacing.small};
  margin-left: 0;
  margin-right: ${spacing.medium};
`;
const Title = styled.h3`
  color: ${colors.title};
  line-height: 2rem;
  margin-bottom: ${spacing.large};
  font-size: ${fonts.sizeH3};
`;

const StyledToggle = styled(ToggleButton)`
  min-width: 7rem;
  margin-right: 1rem;
`;
