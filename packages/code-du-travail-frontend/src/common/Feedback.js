import React, { useState } from "react";
import { theme, Section, ToggleButton, icons } from "@cdt/ui";
import { FeedbackForm } from "./FeedbackForm";
import styled from "styled-components";
import ReactPiwik from "react-piwik";

import { postFeedback } from "./feedback.service";
import ServiceRenseignementModal from "./ServiceRenseignementModal";

function Feedback({ query = "", source = "Tous contenus", url = "" }) {
  const [answer, setAnswer] = useState(null); // null, "yes", "no",
  const [status, setStatus] = useState(null); // null, "sent",

  const onAnswerChange = answer => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      answer === "yes" ? "thumb up" : "thumb down",
      url,
      query
    ]);
    setAnswer(answer);
  };

  const resetAnswer = () => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      answer === "yes" ? "cancel form positive" : "cancel form negative",
      url,
      query
    ]);
    setAnswer(null);
  };

  const submitFeedback = data => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      answer === "yes" ? "submit positive form" : "submit negative form",
      url,
      query
    ]);

    return postFeedback(data).then(() => {
      setStatus("send");
    });
  };

  return (
    <Section className="wrapper-dark wrapper-narrow">
      <Layout>
        <Icon />
        <div>
          <Title>Avez vous trouvez la réponse à votre question</Title>
          <p>
            <StyledToggle
              secondary
              disabled={answer !== null}
              pressed={answer === "no"}
              onClick={() => onAnswerChange("no")}
            >
              Non
            </StyledToggle>
            <StyledToggle
              disabled={answer !== null}
              pressed={answer === "yes"}
              onClick={() => onAnswerChange("yes")}
            >
              Oui
            </StyledToggle>
          </p>
          {answer && !status && (
            <FeedbackForm
              query={query}
              source={source}
              url={url}
              onSubmit={submitFeedback}
              onReset={resetAnswer}
              askMotif={answer === "no"}
            />
          )}
          {status === "send" && (
            <p> Nous avons bien recu votre commentaire. Merci !</p>
          )}
          {answer === "no" && (
            <div>
              Vous pouvez également{" "}
              <ServiceRenseignementModal>
                joindre les services de reseignement
              </ServiceRenseignementModal>{" "}
              de votre régions afin d&apos;obtenir une réponse
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
