import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Accordion, theme, Title } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import { useUIDSeed } from "react-uid";
import styled from "styled-components";

import Html from "../../common/Html";
import ReferencesJuridiques from "../../common/ReferencesJuridiques";
import TYPE_REFERENCE from "../../common/ReferencesJuridiques/typeReference";
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
    .map((theme) => ({
      body: (
        <Accordion
          items={contributionsByTheme[theme].map((item) => ({
            body: AccordionContent(item),
            title: item.question,
          }))}
          onChange={trackAccordionPanelState(
            convention.shortTitle,
            "pagecc_clickcontrib"
          )}
        />
      ),
      title: theme,
    }));

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
  const seedId = useUIDSeed();
  return (
    <>
      <Html>{answer}</Html>
      {references && (
        <StyledReferencesJuridiques
          references={references.map((reference) => ({
            id: seedId(reference),
            title: reference.title,
            type:
              reference.category === "labour_code"
                ? TYPE_REFERENCE.codeDuTravail
                : TYPE_REFERENCE.external,
            url: reference.url,
          }))}
        />
      )}
      <strong>
        Pour savoir si la mesure prévue par la convention collective s’applique
        à votre situation, reportez-vous{" "}
        <Link
          href={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/[slug]`}
          as={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`}
        >
          <a>à la réponse complète à cette question</a>
        </Link>
        .
      </strong>
    </>
  );
}

export { Contributions };

const StyledReferencesJuridiques = styled(ReferencesJuridiques)`
  margin-bottom: ${spacings.xmedium};
`;
