import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Accordion, theme, Alert } from "@socialgouv/react-ui";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import slugify from "@cdt/data/slugify";

import { Title } from "./index";
import Html from "../../common/Html";
import { jsxJoin } from "../../lib/jsxJoin";

function getContributionUrl({ slug }) {
  return `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`;
}

function Contributions({ contributions }) {
  // group questions by theme
  const contributionsByTheme = contributions.reduce((state, answer) => {
    if (!state[answer.theme]) {
      state[answer.theme] = [answer];
    } else {
      state[answer.theme].push(answer);
    }
    return state;
  }, {});

  // show themes contents in Accordions
  const themes = Object.keys(contributionsByTheme).map(theme => ({
    id: theme,
    title: <AccordionHeader>{theme}</AccordionHeader>,
    body: <Accordion items={accordionize(contributionsByTheme[theme])} />
  }));

  return (
    <React.Fragment>
      <Title>Questions fréquentes sur cette convention collective</Title>
      <Accordion items={themes} />
    </React.Fragment>
  );
}

function accordionize(items) {
  return items.map(item => ({
    id: item.slug,
    title: <AccordionHeader>{item.question}</AccordionHeader>,
    body: AccordionContent({ ...item })
  }));
}

function AccordionContent({ answer, slug, references }) {
  return (
    <React.Fragment>
      <Html>{answer}</Html>
      {references && <AnswerReferences articles={references} />}
      <Alert>
        Pour savoir si la mesure prévue par la convention collective
        s&apos;applique à votre situation, reportez-vous{" "}
        <Link href={getContributionUrl({ slug })} passHref>
          <a>à la réponse complète à cette question</a>
        </Link>
      </Alert>
    </React.Fragment>
  );
}

function AnswerReferences({ articles }) {
  const refs = articles.map(ref => {
    switch (ref.category) {
      case "agreement": {
        return ref.url ? (
          <a target="_blank" rel="noopener nofollow noreferrer" href={ref.url}>
            {ref.title}
          </a>
        ) : (
          <div>{ref.title}</div>
        );
      }
      case "labor_code": {
        return (
          <Link
            href={{
              pathname: `${getRouteBySource(SOURCES.CDT)}/[slug]`
            }}
            as={`/${getRouteBySource(SOURCES.CDT)}/${slugify(ref.title)}`}
          >
            <a>{ref.title} du Code du travail</a>
          </Link>
        );
      }
      default: {
        return ref.url ? (
          <a
            target="_blank"
            rel="noopener nofollow noreferrer"
            title={ref.title}
            href={ref.url}
          >
            {ref.title}
          </a>
        ) : (
          <div>{ref.title}</div>
        );
      }
    }
  });
  return <p>Sources {jsxJoin(refs)}</p>;
}

const { spacings } = theme;
const AccordionHeader = styled.strong`
  margin: ${spacings.base} 0;
`;

export { Contributions };
