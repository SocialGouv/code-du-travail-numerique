import React from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  Accordion,
  Grid,
  InsertTitle,
  MoreContent,
  theme,
  Tile,
  Title,
} from "@socialgouv/react-ui";

import { blocs as blocsLabels } from "./blocs.data";

const { spacings } = theme;

function getArticleUrl({ id, containerId }) {
  return `https://beta.legifrance.gouv.fr/conv_coll/id/${id}/?idConteneur=${containerId}`;
}

function Articles({ blocs, containerId }) {
  const articlesByTheme = blocs.map(({ bloc, articles }) => {
    return {
      id: `bloc-${bloc}`,
      title: blocsLabels[bloc].label,
      body: (
        <>
          {blocsLabels[bloc].important && (
            <>
              <InsertTitle>Important</InsertTitle>
              <P>
                Pour que ce thème s’applique à votre situation, il doit être
                indiqué dans l’article en question qu’un accord d’entreprise ne
                peut par déroger à la convention collective; à moins que
                l’accord d’entreprise ne prévoie des garanties au moins
                équivalentes.
              </P>
            </>
          )}
          <Grid columns={3}>
            {articles.map(({ title, id, section }) => (
              <Tile
                key={id}
                wide
                target="_blank"
                rel="nofollow noopener"
                href={getArticleUrl({ id, containerId })}
                subtitle={`Article ${title}`}
                className={"no-after"}
              >
                {section}
              </Tile>
            ))}
          </Grid>
        </>
      ),
    };
  });

  return (
    <React.Fragment>
      <Title
        subtitle="Consultez les articles de la convention collective qui s’appliquent à votre situation dans les thèmes sélectionnés ci-dessous."
        shift={spacings.larger}
      >
        Articles de la convention collective
      </Title>
      <MoreContent title="En savoir plus">
        <>
          <p>
            Les thèmes sélectionnés par le ministère du Travail sont les thèmes
            pour lesquels la convention collective s’applique à votre situation.
            Cela signifique que même s’il existe un accord d’entreprise sur ces
            thèmes, celui-ci ne peut prévoir de règles différentes de celles
            prévues par la convention collective.
          </p>
          <p>
            En effet, selon la loi, il existe 13 thèmes dans lesquels l’accord
            d’entreprise ne peut prévoir de règles différentes de celles de la
            convention collective, et 4 thèmes dans lesquels la convention
            collective doit indiquer expressément que l’accord d’entreprise ne
            peut prévoir de règles différentes.
          </p>
          <p>
            Sources:{" "}
            <Link href="/code-du-travail/[slug]" as="/code-du-travail/l2253-1">
              <a>Article L2253-1</a>
            </Link>
            ,{" "}
            <Link href="/code-du-travail/[slug]" as="/code-du-travail/l2253-2">
              <a>Article L2253-2</a>
            </Link>
            ,{" "}
            <Link href="/code-du-travail/[slug]" as="/code-du-travail/l2253-3">
              <a>Article L2253-3</a>
            </Link>
            .
          </p>
        </>
      </MoreContent>
      <Accordion items={articlesByTheme} />
    </React.Fragment>
  );
}

export { Articles };

const P = styled.p`
  margin-top: 0;
`;
