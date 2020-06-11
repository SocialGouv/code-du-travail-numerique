import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import {
  Alert,
  Button,
  Container,
  PageTitle,
  Section,
  Heading,
  theme,
  Wrapper,
} from "@socialgouv/react-ui";

import { ConventionModal } from "../src/conventions/SearchModal";
import { fetchSearchResults } from "../src/search/search.service";
import { SearchResults } from "../src/search/SearchResults";
import SearchBar from "../src/search/SearchBar";
import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";
import { FocusRoot } from "../src/a11y";

import CustomError from "./_error";

const SEARCH_ID = "search-input";

export async function getServerSideProps({ query: { q: query } }) {
  try {
    // beware, fetchSearchResults can throw an error !
    const items = await fetchSearchResults(query);
    return { props: { items, query } };
  } catch (err) {
    return { props: { errorCode: 500 } };
  }
}

const SearchPage = ({
  errorCode,
  items = { documents: [], articles: [], themes: [] },
  query,
}) => {
  if (errorCode) {
    return <CustomError statusCode={errorCode} />;
  }
  return (
    <Layout
      currentPage="search"
      initialTitle={`${query} - Code du travail numérique`}
    >
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Metas
        title={`${query} - Code du travail numérique`}
        pathname="/recherche"
        description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
      />
      <Container narrow>
        <label htmlFor={SEARCH_ID}>
          <PageTitle>Recherche</PageTitle>
        </label>
        <SearchBarWrapper>
          <SearchBar inputId={SEARCH_ID} hasButton hasSearchIcon />
        </SearchBarWrapper>
      </Container>
      {query &&
      items.documents.length === 0 &&
      items.articles.length === 0 &&
      items.themes.length === 0 ? (
        <Section>
          <Container narrow>
            <Alert>
              Nous n’avons pas trouvé de résultat pour votre recherche.
            </Alert>
          </Container>
        </Section>
      ) : (
        <>
          <Section>
            <FocusRoot />
            <SearchResults items={items} isSearch query={query} />
          </Section>
          <Section>
            <Container>
              <StyledWrapper variant="light">
                <Heading
                  shift={theme.spacings.xmedium}
                  variant="primary"
                  stripped
                >
                  Vous n’avez pas trouvé ce que vous cherchiez ? Essayez
                  &hellip;
                </Heading>
                <StyledContent>
                  <Link href="/themes" passHref>
                    <StyledLink variant="flat" as={Button}>
                      Consulter les thèmes
                    </StyledLink>
                  </Link>
                  <ConventionModal>
                    {(openModal) => (
                      <Button variant="flat" onClick={openModal}>
                        Chercher une convention collective
                      </Button>
                    )}
                  </ConventionModal>
                </StyledContent>
              </StyledWrapper>
            </Container>
          </Section>
        </>
      )}
    </Layout>
  );
};
export default SearchPage;

const { breakpoints, spacings } = theme;

const SearchBarWrapper = styled.div`
  margin-bottom: ${spacings.large} !important;
`;

const StyledWrapper = styled(Wrapper)`
  padding-top: ${spacings.large};
  padding-bottom: ${spacings.large};
`;

const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled.a`
  margin-right: ${spacings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.medium};
  }
`;
