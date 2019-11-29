import React from "react";
import { Button, Heading } from "@socialgouv/react-ui";
import Link from "next/link";
import { SOURCES, getRouteBySource } from "@cdt/sources";

import Html from "../../common/Html";

function getContributionUrl({ slug }) {
  return `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`;
}
function Contributions({ contributions }) {
  const contributionsByTheme = contributions.reduce(
    (state, { theme, question, answer, slug }) => {
      if (!state[theme]) {
        state[theme] = [{ question, answer, slug }];
      } else {
        state[theme].push({ question, answer, slug });
      }
      return state;
    },
    {}
  );

  return (
    <>
      <Heading>Questions fréquentes sur cette convention collective</Heading>
      {Object.entries(contributionsByTheme).map(([theme, items]) => (
        <div key={theme}>
          <strong>{theme}</strong>
          <ul>
            {items.map(({ question, answer, slug }) => (
              <li key={slug}>
                <details>
                  <summary>{question}</summary>
                  <Html>{answer}</Html>
                  <Link href={getContributionUrl({ slug })} passHref>
                    <Button varaint="secondary" as="a">
                      Voir la réponse en détail
                    </Button>
                  </Link>
                </details>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export { Contributions };
