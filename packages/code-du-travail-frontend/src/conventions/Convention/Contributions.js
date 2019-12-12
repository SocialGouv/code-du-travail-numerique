import React from "react";
import { Accordion, Button, Heading as SubHeading } from "@socialgouv/react-ui";
import Link from "next/link";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import { slugify } from "@cdt/data/slugify";

import { Heading } from "./index";
import Html from "../../common/Html";
import { jsxJoin } from "../../lib/jsxJoin";

function getContributionUrl({ slug }) {
  return `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`;
}
function Contributions({ contributions }) {
  const contributionsByTheme = contributions.reduce((state, answer) => {
    if (!state[answer.theme]) {
      state[answer.theme] = [answer];
    } else {
      state[answer.theme].push(answer);
    }
    return state;
  }, {});

  return (
    <>
      <Heading>Questions fréquentes sur cette convention collective</Heading>
      {Object.entries(contributionsByTheme).map(([theme, items]) => (
        <div key={theme}>
          <SubHeading as="h4">{theme}</SubHeading>
          {items.map(answer => (
            <Accordion
              key={answer.slug}
              items={[
                {
                  id: answer.slug,
                  as: "h6",
                  title: answer.question,
                  body: AccordionContent({ ...answer })
                }
              ]}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function AccordionContent({ answer, slug, references }) {
  return (
    <>
      <Html>{answer}</Html>
      {references && <AnswerReferences articles={references} />}
      <Link href={getContributionUrl({ slug })} passHref>
        <Button varaint="secondary" as="a">
          Voir la fiche complète
        </Button>
      </Link>
    </>
  );
}

function AnswerReferences({ articles }) {
  const refs = articles.map(ref => {
    switch (ref.category) {
      case "agreement": {
        return (
          <a target="_blank" rel="noopener nofollow noreferrer" href={ref.url}>
            {ref.value}
          </a>
        );
      }
      case "labor_code": {
        return (
          <Link
            href={{
              pathname: `${getRouteBySource(SOURCES.CDT)}/[slug]`
            }}
            as={`/${getRouteBySource(SOURCES.CDT)}/${slugify(ref.value)}`}
          >
            <a>{ref.value} du Code du travail </a>
          </Link>
        );
      }
      default: {
        return (
          <a
            target="_blank"
            rel="noopener nofollow noreferrer"
            title={ref.value}
            href={ref.url}
          >
            {ref.value}
          </a>
        );
      }
    }
  });
  return <p>Sources {jsxJoin(refs)}</p>;
}

export { Contributions };
