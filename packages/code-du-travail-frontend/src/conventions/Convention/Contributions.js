import { Accordion, theme, Title } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import References from "../../common/References";
import { trackAccordionPanelState } from "./utils";
import { AccordionContentContribution } from "./AccordionContentContribution";

const { spacings } = theme;

function Contributions({ contributions, convention }) {
  const UNTHEMED_LABEL = "Autres";
  // group questions by theme
  const contributionsByTheme = contributions.reduce((state, answer) => {
    if (!answer.theme) {
      answer.theme = UNTHEMED_LABEL;
    }
    if (!state[answer.theme]) {
      state[answer.theme] = [answer];
    } else {
      state[answer.theme].push(answer);
    }
    return state;
  }, {});

  // show themes contents in Accordions
  const themes = Object.keys(contributionsByTheme)
    .sort((a, b) => {
      if (b === UNTHEMED_LABEL) {
        return -1;
      }
      if (a === UNTHEMED_LABEL) {
        return 1;
      }
      return a.localeCompare(b);
    })
    .map((theme) => {
      return {
        body: (
          <Accordion
            titleLevel={4}
            items={contributionsByTheme[theme].map((item) => ({
              body: AccordionContentContribution(item),
              id: item.slug,
              title: item.question ?? item.questionName,
            }))}
            onChange={trackAccordionPanelState(
              convention.shortTitle,
              "pagecc_clickcontrib"
            )}
          />
        ),
        title: theme,
      };
    });

  return (
    <>
      <Title subtitle={convention.description} shift={spacings.larger}>
        Questions-réponses fréquentes
      </Title>
      <Accordion titleLevel={3} items={themes} />
    </>
  );
}

export { Contributions };

const StyledReferences = styled(References)`
  margin-bottom: ${spacings.xmedium};
`;
