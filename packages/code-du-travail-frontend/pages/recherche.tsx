import {
  Alert,
  Button,
  Container,
  Heading,
  PageTitle,
  Section,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { ConventionModal } from "../src/conventions/SearchModal";
import { Layout } from "../src/layout/Layout";
import { fetchSearchResults } from "../src/search/search.service";
import SearchBar from "../src/search/SearchBar";
import { SearchResults } from "../src/search/SearchResults";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

const SEARCH_ID = "search-input";

const SearchPage = ({
  items = { articles: [], documents: [], themes: [] },
}) => {
  const router = useRouter();

  const { q: query = "" } = router.query;

  const goToThemes = (e) => {
    e.preventDefault();
    router.push("/themes");
  };

  return (
    <Layout currentPage="search">
      <Head>
        <meta key="robots" name="robots" content="noindex, nofollow" />
      </Head>
      <Metas
        title={`${"Recherche " + query} - Code du travail numérique`}
        description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
      />
      <Container narrow>
        <PageTitle>Recherche</PageTitle>
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
            <SearchResults items={items} isSearch query={query} />
          </Section>
          <Section>
            <Container>
              <StyledWrapper variant="light">
                <Heading
                  as="strong"
                  shift={theme.spacings.xmedium}
                  variant="primary"
                  stripe="left"
                  role="heading"
                  ariaLevel="2"
                >
                  Vous n’avez pas trouvé ce que vous cherchiez ? Essayez
                  &hellip;
                </Heading>
                <StyledContent>
                  <Button variant="flat" onClick={goToThemes}>
                    Consulter les thèmes
                  </Button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = (context.query.q as string) ?? "";
  const items = await fetchSearchResults(q);
  return { props: { items } };
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

  button {
    margin-right: ${spacings.medium};
    @media (max-width: ${breakpoints.mobile}) {
      margin-bottom: ${spacings.medium};
    }
  }
`;
