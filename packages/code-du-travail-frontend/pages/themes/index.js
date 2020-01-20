import React from "react";
import styled from "styled-components";
import Link from "next/link";
import getConfig from "next/config";
import {
  Button,
  Container,
  Grid,
  icons,
  PageTitle,
  Section,
  theme,
  Tile
} from "@socialgouv/react-ui";
import fetch from "isomorphic-unfetch";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { FocusRoot } from "../../src/a11y";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const SubThemes = ({ children = [] }) => {
  return (
    <div>
      {children.slice(0, 3).map(({ title }, index) => (
        <React.Fragment key={title}>
          {title}
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

const ThemesPage = ({ pageUrl, ogImage, children = [] }) => (
  <Layout currentPage="themes">
    <Metas
      url={pageUrl}
      title={`Thèmes - Code du travail numérique`}
      description={`Explorez les contenus autour des thèmes`}
      image={ogImage}
    />
    <Section>
      <Container>
        <FocusRoot>
          <PageTitle subtitle="Découvrez l’intégralité de nos contenus organisés par grands thèmes">
            Contenus par thème
          </PageTitle>
        </FocusRoot>
        <Grid>
          {children &&
            children.map(({ children, icon, slug, title }) => (
              <Link
                key={slug}
                href="/themes/[slug]"
                as={`/themes/${slug}`}
                passHref
              >
                <Tile icon={icons[icon]} title={title}>
                  <TileChildren>
                    <SubThemes>{children}</SubThemes>
                    <StyledDiv hasContentAbove={Boolean(children)}>
                      <Button variant="link" as="div" />
                    </StyledDiv>
                  </TileChildren>
                </Tile>
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

const { spacings } = theme;

const TileChildren = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const PrimaryColored = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const StyledDiv = styled.div`
  margin-top: ${({ hasContentAbove }) =>
    hasContentAbove ? spacings.base : spacings.small};
`;
