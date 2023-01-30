import {
  Container,
  FlatList,
  Heading,
  PageTitle,
  Section,
  Select,
  theme,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import React, { useCallback, useState } from "react";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { handleError } from "../../src/lib/fetch-error";
import styled from "styled-components";
import { ListLink } from "../../src/search/SearchResults/Results";
import { SOURCES } from "@socialgouv/cdtn-sources";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

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
          <LargeSelect value={selectedTheme} onChange={selectThemeHandler}>
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
          {Object.keys(documents).map((theme) => (
            <>
              <Heading as={HeadingBlue}>{theme}</Heading>
              <FlatList>
                {contribs[theme].map((item) => (
                  <ListItem key={`${item.source}-${item.slug}`}>
                    <ListLink item={item} showTheme={true} titleTagType="h3" />
                  </ListItem>
                ))}
              </FlatList>
            </>
          ))}
        </Container>
      </Section>
    </Layout>
  );
}

export default Page;

export const getServerSideProps = async () => {
  const response = await fetch(`${API_URL}/contributions/generics`);
  if (!response.ok) {
    return handleError(response);
  }
  const contribs = await response.json();
  return { props: { contribs } };
};
const ListItem = styled.li`
  margin-top: ${theme.spacings.medium};
`;
const HeadingBlue = styled.h2`
  color: ${({ theme }) => theme.secondary};
`;
const LargeSelect = styled(Select)`
  width: 100%;
`;
