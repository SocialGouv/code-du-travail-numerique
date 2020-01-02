import React from "react";
import { Accordion, Grid, Tile, theme } from "@socialgouv/react-ui";
import styled from "styled-components";

import { Title } from "./index";
import { blocs as blocsLabels } from "./blocs.data";

function getArticleUrl({ id, containerId }) {
  return `https://beta.legifrance.gouv.fr/conv_coll/id/${id}/?idConteneur=${containerId}`;
}

function Articles({ blocs, containerId }) {
  const articlesByTheme = blocs.map(({ bloc, articles }) => ({
    id: `bloc-${bloc}`,
    title: <AccordionHeader>{blocsLabels[bloc]}</AccordionHeader>,
    body: (
      <Grid columns={3}>
        {articles.map(({ title, id, section }) => (
          <Tile
            key={id}
            wide
            target="_blank"
            rel="nofollow noopener"
            href={getArticleUrl({ id, containerId })}
            title={`Article ${title}`}
            subtitle={section}
          />
        ))}
      </Grid>
    )
  }));

  return (
    <React.Fragment>
      <Title>Domaines traités par la convention collective</Title>
      <Label htmlFor="article-bloc">
        Recherchez, lorsqu&apos;elles existent, les dispositions
        conventionnelles dans&nbsp;:
        <br />
        <br />
        <li>
          les 13 domaines où la loi reconnaît la primauté à la convention
          collective de branche ;
        </li>
        <li>
          les 4 domaines où la branche elle-même peut reconnaitre sa primauté,
          sauf si l&apos;accord d&apos;entreprise a des garanties au moins
          équivalentes (représentées avec une * ci-dessous).
        </li>
      </Label>
      <Accordion items={articlesByTheme} />
    </React.Fragment>
  );
}

export { Articles };

const { spacings } = theme;

const AccordionHeader = styled.strong`
  margin: ${spacings.base} 0;
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: ${spacings.medium};
`;
