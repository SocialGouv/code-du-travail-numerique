import React from "react";
import Link from "next/link";
import styled from "styled-components";
import getConfig from "next/config";
import {
  Container,
  Grid,
  GridCell,
  PageTitle,
  Section,
  Tile
} from "@socialgouv/react-ui";
import { Layers } from "react-feather";
import fetch from "isomorphic-unfetch";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const ThemesPage = ({ pageUrl, ogImage, children = [] }) => (
  <Layout>
    <Metas
      url={pageUrl}
      title={`Thèmes - Code du travail numérique`}
      description={`Explorez les contenus autour des thèmes`}
      image={ogImage}
    />
    <Section>
      <Container>
        <PageTitle>Retrouvez toutes nos thématiques</PageTitle>
        {children && children.length > 0 && (
          <Grid>
            {children.map(({ slug, title }) => (
              <GridCell key={slug}>
                <Link
                  key={slug}
                  href="/themes/[slug]"
                  as={`/themes/${slug}`}
                  passHref
                >
                  <StyledTile icon={Layers}>{title}</StyledTile>
                </Link>
              </GridCell>
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  </Layout>
);

ThemesPage.getInitialProps = async () => {
  const response = await fetch(`${API_URL}/themes`);
  if (!response.ok) {
    return { statusCode: response.status };
  }
  const { children } = await response.json();
  return { children };
};

export default ThemesPage;

const StyledTile = styled(Tile)`
  height: 120px;
`;
