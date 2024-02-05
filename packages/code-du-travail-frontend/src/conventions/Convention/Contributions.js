import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { Accordion, theme, Title } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import References from "../../common/References";

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

  const getContribSlug = (item) => {
    const slug = /^\d\d\d*-/.test(item.slug)
      ? item.slug
      : `${convention.num}-${item.slug}`;
    return `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`;
  };

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
          <ul>
            {contributionsByTheme[theme].map((item) => (
              <li key={item.slug}>
                <Link href={getContribSlug(item)}>
                  {item.question ?? item.questionName}
                </Link>
              </li>
            ))}
          </ul>
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
