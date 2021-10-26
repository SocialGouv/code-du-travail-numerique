import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  Button,
  Container,
  Grid,
  icons,
  PageTitle,
  Section,
  theme,
  Tile,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const SubThemes = ({ children = [] }) => {
  return (
    <div>
      {children.slice(0, 3).map(({ label }, index) => (
        <React.Fragment key={label}>
          {label}
          {index < 2 ? (
            index < children.length - 1 && (
              <PrimaryColored> &bull;&nbsp;</PrimaryColored>
            )
          ) : (
            <PrimaryColored>&nbsp;&hellip;</PrimaryColored>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const ThemesPage = ({ children = [] }) => (
  <Layout currentPage="themes">
    <Metas
      title={`Thèmes - Code du travail numérique`}
      description={`Explorez les contenus autour des thèmes`}
    />
    <Section>
      <Container>
        <PageTitle subtitle="Découvrez l’intégralité de nos contenus organisés par grands thèmes">
          Contenus par thème
        </PageTitle>
        <Grid>
          {children &&
            children.map(({ children, icon, slug, title }) => (
              <Link
                key={slug}
                href={`/${getRouteBySource(SOURCES.THEMES)}/${slug}`}
                passHref
              >
                <StyledTile icon={icons[icon]} title={title} titleTagType="h2">
                  <TileChildren>
                    <SubThemes>{children}</SubThemes>
                    <StyledDiv hasContentAbove={Boolean(children)}>
                      <Button variant="link" as="div" />
                    </StyledDiv>
                  </TileChildren>
                </StyledTile>
              </Link>
            ))}
        </Grid>
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

const { spacings, breakpoints, fonts } = theme;

const TileChildren = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const PrimaryColored = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const StyledTile = styled(Tile)`
  h2 {
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
    font-family: "Open Sans", sans-serif;
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.default};
    }
  }
`;

const StyledDiv = styled.div`
  margin-top: ${({ hasContentAbove }) =>
    hasContentAbove ? spacings.base : spacings.small};
`;
