import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import {
  Container,
  FlatList,
  Heading,
  PageTitle,
  Section,
  Select,
  theme as th,
} from "@socialgouv/cdtn-ui";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { summarize } from "../../src/search/utils";
import { SITE_URL } from "../../src/config";
import { LinkedTile } from "../../src/common/tiles/LinkedTile";

const title = "Modèles de documents";
const subtitle =
  "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail";

function Modeles(props) {
  const { data = [] } = props;
  const themes: any = [];
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
    <Layout currentPage={SOURCES.LETTERS}>
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
            {Object.values(documents).map(({ title, items }: any) => (
              <React.Fragment key={title}>
                <Heading as={HeadingBlue}>{title}</Heading>
                {items.map(({ description, slug, title }) => (
                  <StyledListItem key={slug}>
                    <LinkedTile
                      wide
                      custom
                      title={title}
                      titleTagType="h3"
                      href={`${getRouteBySource(SOURCES.LETTERS)}/${slug}`}
                    >
                      {summarize(description)}
                    </LinkedTile>
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

export const getServerSideProps = async () => {
  const response = await fetch(`${SITE_URL}/api/modeles`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();

  return {
    props: { data },
    revalidate: 600, // 10 minutes
  };
};

const { spacings } = th;

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
