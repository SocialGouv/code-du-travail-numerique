import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { Accordion, theme, Title } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const { spacings } = theme;

function Contributions({ contributions, convention }) {
  const themes = contributions.map((group) => {
    return {
      body: (
        <ul>
          {group.answers.map((item) => (
            <li key={item.slug}>
              <StyledLink
                href={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${
                  item.slug
                }`}
              >
                {item.question}
              </StyledLink>
            </li>
          ))}
        </ul>
      ),
      title: group.theme,
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

const StyledLink = styled(Link)`
  text-decoration-color: ${theme.colors.paragraph};
`;
