import {
  Container,
  FlatList,
  Heading,
  PageTitle,
  Section,
  Select,
  theme,
} from "@socialgouv/cdtn-ui";
import React, { useCallback, useState } from "react";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import styled from "styled-components";
import { ListLink } from "../../src/search/SearchResults/Results";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { REVALIDATE_TIME, SITE_URL } from "../../src/config";
import { getGenericContributionsGroupByThemes } from "../../src/api";

const ALL = "all";

function Page({ contribs }) {
  const [selectedTheme, setSelectedTheme] = useState(ALL);
  const [documents, setDocuments] = useState(contribs);
  const selectThemeHandler = useCallback(
    (event) => {
      const themeSlug = event.target.value;
      setSelectedTheme(event.target.value);
      if (themeSlug === ALL) {
        setDocuments(contribs);
      } else {
        setDocuments({ [themeSlug]: contribs[themeSlug] });
      }
    },
    [contribs, setDocuments, setSelectedTheme]
  );
  return (
    <Layout currentPage={SOURCES.CONTRIBUTIONS}>
      <Metas
        title="Vos fiches pratiques"
        description="Obtenez une réponses personnalisée selon votre convention collective"
      />

      <Section>
        <Container narrow>
          <PageTitle
            subtitle={
              "Obtenez une réponses personnalisée selon votre convention collective"
            }
          >
            Vos fiches pratiques
          </PageTitle>
          <LargeSelect
            value={selectedTheme}
            onChange={selectThemeHandler}
            aria-label="Choississez un thème"
          >
            {Object.keys(contribs) &&
              [
                <option key={ALL} value={ALL}>
                  Tous les thèmes
                </option>,
              ].concat(
                Object.keys(contribs).map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))
              )}
          </LargeSelect>
          {Object.keys(documents).map((theme, index) => (
            <div key={index.toString()}>
              <Heading as={HeadingBlue}>{theme}</Heading>
              <FlatList>
                {contribs[theme].map((item) => (
                  <ListItem key={`${item.source}-${item.slug}`}>
                    <ListLink item={item} showTheme={true} titleTagType="h3" />
                  </ListItem>
                ))}
              </FlatList>
            </div>
          ))}
        </Container>
      </Section>
    </Layout>
  );
}

export default Page;

export async function getStaticProps() {
  try {
    const data: any = await getGenericContributionsGroupByThemes();
    return { props: { contribs: data }, revalidate: REVALIDATE_TIME };
  } catch (error) {
    console.error(error);
    return { props: { contribs: {} }, revalidate: REVALIDATE_TIME };
  }
}

const ListItem = styled.li`
  margin-top: ${theme.spacings.medium};
`;
const HeadingBlue = styled.h2`
  color: ${({ theme }) => theme.secondary};
`;
const LargeSelect = styled(Select)`
  width: 100%;
`;
