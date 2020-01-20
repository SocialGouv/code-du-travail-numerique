import React, { useCallback, useState } from "react";
import getConfig from "next/config";
import Link from "next/link";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import {
  Container,
  FlatList,
  Tile,
  PageTitle,
  Heading,
  Section,
  Select,
  theme
} from "@socialgouv/react-ui";
import { summarize } from "../../src/search/utils";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { FocusRoot } from "../../src/a11y";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const title = "Modèles de documents";
const subtitle =
  "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail";

function Modeles(props) {
  const { data = [], pageUrl, ogImage } = props;
  const themes = [];
  const modelesByTheme = data.reduce((state, templateDoc) => {
    const [theme] = templateDoc.breadcrumbs;
    if (!state[theme.slug]) {
      state[theme.slug] = {
        title: theme.label,
        items: []
      };
      themes.push(theme);
    }
    state[theme.slug].items.push(templateDoc);
    return state;
  }, {});

  const [selectedTheme, setSelectedTheme] = useState("all");
  const [documents, setDocuments] = useState(modelesByTheme);
  const selectThemeHandler = useCallback(
    event => {
      const themeSlug = event.target.value;
      setSelectedTheme(event.target.value);
      if (themeSlug === "all") {
        setDocuments(modelesByTheme);
      } else {
        setDocuments({ [themeSlug]: modelesByTheme[themeSlug] });
      }
    },
    [modelesByTheme, setDocuments, setSelectedTheme]
  );
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={`${title} - Code du travail numérique`}
        description={subtitle}
        image={ogImage}
      />
      <Section>
        <Container narrow>
          <FocusRoot>
            <PageTitle subtitle={subtitle}>{title}</PageTitle>
          </FocusRoot>
          <LargeSelect value={selectedTheme} onChange={selectThemeHandler}>
            {themes &&
              [
                <option key="all" value="all">
                  Tous les thèmes
                </option>
              ].concat(
                themes.map(({ label, slug }) => (
                  <option key={slug} value={slug}>
                    {label}
                  </option>
                ))
              )}
          </LargeSelect>
          <StyledList>
            {Object.values(documents).map(({ title, items }) => (
              <React.Fragment key={title}>
                <Heading as={HeadingBlue}>{title}</Heading>
                {items.map(docTemplate => (
                  <StyledListItem key={docTemplate.slug}>
                    <ModeleCourrier modele={docTemplate} />
                  </StyledListItem>
                ))}
              </React.Fragment>
            ))}
          </StyledList>
        </Container>
      </Section>
    </Layout>
  );
}

Modeles.getInitialProps = async function() {
  const response = await fetch(`${API_URL}/modeles`);
  if (!response.ok) {
    return { statusCode: response.status };
  }
  const data = await response.json();
  return { data };
};

function ModeleCourrier({ modele }) {
  const { title, description, breadcrumbs, slug } = modele;
  const [theme] = breadcrumbs.slice(-1);

  return (
    <Link
      href={`${getRouteBySource(SOURCES.LETTERS)}/[slug]`}
      as={`${getRouteBySource(SOURCES.LETTERS)}/${slug}`}
      passHref
    >
      <Tile wide custom title={title} subtitle={theme.title}>
        {summarize(description)}
      </Tile>
    </Link>
  );
}

const { spacings } = theme;

const StyledList = styled(FlatList)`
  margin: ${spacings.small} 0;
`;

const StyledListItem = styled.li`
  margin-bottom: ${spacings.medium};
`;

const LargeSelect = styled(Select)`
  width: 100%;
`;
const HeadingBlue = styled.h2`
  color: ${({ theme }) => theme.secondary};
`;
export default Modeles;
