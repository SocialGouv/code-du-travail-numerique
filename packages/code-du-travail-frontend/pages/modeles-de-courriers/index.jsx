import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  Container,
  FlatList,
  Heading,
  PageTitle,
  Section,
  Select,
  theme,
  Tile,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { summarize } from "../../src/search/utils";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const title = "Modèles de documents";
const subtitle =
  "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail";

function Modeles(props) {
  const { data = [] } = props;
  const themes = [];
  const modelesByTheme = data.reduce((state, templateDoc) => {
    const other = {
      label: "Autres",
      slug: "autres",
      title: "Autres",
    };
    const [theme = other] = templateDoc.breadcrumbs;
    if (!state[theme.slug]) {
      state[theme.slug] = {
        items: [],
        title: theme.label,
      };
      themes.push(theme);
    }
    state[theme.slug].items.push(templateDoc);
    return state;
  }, {});

  const [selectedTheme, setSelectedTheme] = useState("all");
  const [documents, setDocuments] = useState(modelesByTheme);
  const selectThemeHandler = useCallback(
    (event) => {
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
      <Metas title={title} description={subtitle} />
      <Section>
        <Container narrow>
          <PageTitle subtitle={subtitle}>{title}</PageTitle>
          <LargeSelect value={selectedTheme} onChange={selectThemeHandler}>
            {themes &&
              [
                <option key="all" value="all">
                  Tous les thèmes
                </option>,
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
                {items.map(({ description, slug, title }) => (
                  <StyledListItem key={slug}>
                    <Link
                      href={`${getRouteBySource(SOURCES.LETTERS)}/${slug}`}
                      passHref
                    >
                      <Tile
                        wide
                        custom
                        title={title}
                        subtitle={theme.title}
                        titleTagType="h3"
                      >
                        {summarize(description)}
                      </Tile>
                    </Link>
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

Modeles.getInitialProps = async function () {
  const response = await fetch(`${API_URL}/modeles`);
  if (!response.ok) {
    return { statusCode: response.status };
  }
  const data = await response.json();
  return { data };
};

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
