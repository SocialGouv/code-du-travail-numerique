import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Accordion, theme, Title } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Html from "../../common/Html";
import References from "../../common/References";
import { trackAccordionPanelState } from "./utils";

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
            items={contributionsByTheme[theme].map((item) => ({
              body: AccordionContent(item),
              id: item.slug,
              title: item.question,
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
      <Title
        subtitle="Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le ministère du Travail concernant cette convention collective."
        shift={spacings.larger}
      >
        Questions-réponses fréquentes
      </Title>
      <Accordion items={themes} />
    </>
  );
}

function AccordionContent({ answer, slug, references }) {
  return (
    <>
      <Html>{answer}</Html>
      {references && (
        <StyledReferences
          references={references.map((reference) => ({
            title: reference.title,
            type:
              reference.category === "labour_code"
                ? SOURCES.CDT
                : SOURCES.EXTERNALS,
            url: reference.url,
          }))}
        />
      )}
      <strong>
        Pour savoir si la mesure prévue par la convention collective s’applique
        à votre situation, reportez-vous{" "}
        <Link href={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`}>
          <a>à la réponse complète à cette question</a>
        </Link>
        .
      </strong>
    </>
  );
}

export { Contributions };

const StyledReferences = styled(References)`
  margin-bottom: ${spacings.xmedium};
`;
