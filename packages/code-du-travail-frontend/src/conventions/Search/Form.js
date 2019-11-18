import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Spinner from "react-svg-spinner";

import slugify from "@cdt/data/slugify";
import { Table, Container, Heading, theme } from "@socialgouv/react-ui";

import SearchCC from "./SearchCC";

// following data/populate.js slug rules
const getConventionSlug = convention =>
  slugify(`${convention.num}-${convention.title}`.substring(0, 80));

// link to a Convention
const Convention = ({ num, title, onClick }) => {
  return (
    <Box>
      {onClick ? (
        <ConventionLink onClick={onClick}>{title}</ConventionLink>
      ) : (
        <Link
          href="/convention-collective/[slug]"
          as={`/convention-collective/${getConventionSlug({
            num,
            title
          })}`}
          passHref
        >
          <ConventionLink>{title}</ConventionLink>
        </Link>
      )}
    </Box>
  );
};

const TagSiret = ({ siret }) => (
  <a
    title="Ouvrir la fiche entreprise"
    target="_blank"
    rel="noopener noreferrer"
    style={{ fontSize: "0.8em" }}
    href={`https://entreprise.data.gouv.fr/etablissement/${siret}`}
  >
    Fiche entreprise
  </a>
);

const SearchResult = ({ label, siret, conventions, selectConvention }) => (
  <tr>
    <td>
      <Flex>
        <ResultLabel>{label}</ResultLabel>
        {siret && <TagSiret siret={siret} />}
      </Flex>
      <ConventionsContainer>
        {conventions && conventions.length ? (
          conventions.map(convention => (
            <Convention
              onClick={
                selectConvention &&
                (() => selectConvention({ convention, label }))
              }
              key={convention.id}
              {...convention}
            />
          ))
        ) : (
          <div>Aucune convention collective connue pour cette entreprise</div>
        )}
      </ConventionsContainer>
    </td>
  </tr>
);

// demo app
// userland UI
const Search = ({
  title = "Recherche de convention collective",
  resetOnClick = true,
  style,
  className,
  onSelectConvention
}) => {
  const [query, setQuery] = useState("");
  const onInputChange = e => {
    const value = e.target.value;
    setQuery(value);
  };
  const selectConvention = convention => {
    if (onSelectConvention) {
      onSelectConvention(convention);
      if (resetOnClick) {
        setQuery("");
      }
    }
  };

  return (
    <Container style={style} className={className}>
      {title && <Heading>{title}</Heading>}
      <p>
        Renseignez le nom de votre entreprise, son SIRET ou le nom de votre
        convention collective.
      </p>
      <Input
        role="search"
        placeholder="Nom d'entreprise, SIRET, nom de convention collective"
        value={query}
        type="search"
        onChange={onInputChange}
      />
      <SearchCC
        query={query}
        render={({ status, results }) => {
          const resultsConventions =
            results && results.filter(r => r.type === "convention");
          const resultsEntreprises =
            results && results.filter(r => r.type === "entreprise");
          return (
            query && (
              <ResultsContainer>
                {status === "loading" && (
                  <div>
                    <Spinner /> Recherche des convention collectives...
                  </div>
                )}
                {status === "error" && (
                  <div>Aucun résultat pour votre recherche.</div>
                )}
                {status === "success" && results && results.length !== 0 && (
                  <FixedTable>
                    <tbody>
                      {resultsConventions.length !== 0 && (
                        <React.Fragment>
                          <TitleResults>
                            <td>Conventions collectives</td>
                          </TitleResults>
                          {resultsConventions.map(result => (
                            <SearchResult
                              key={result.id}
                              {...result}
                              selectConvention={
                                // only use callback when defined. otherwise, use <Link/>
                                onSelectConvention && selectConvention
                              }
                            />
                          ))}
                        </React.Fragment>
                      )}
                      {resultsEntreprises.length !== 0 && (
                        <React.Fragment>
                          <TitleResults>
                            <td>Entreprises</td>
                          </TitleResults>
                          {resultsEntreprises.map(result => (
                            <SearchResult
                              key={result.id}
                              {...result}
                              selectConvention={
                                // only use callback when defined. otherwise, use <Link/>
                                onSelectConvention && selectConvention
                              }
                            />
                          ))}
                        </React.Fragment>
                      )}
                    </tbody>
                  </FixedTable>
                )}
              </ResultsContainer>
            )
          );
        }}
      />
    </Container>
  );
};

const { colors, fonts, spacings } = theme;

const FixedTable = styled(Table)`
  width: 100%;
  table-layout: fixed;
`;

const TitleResults = styled.tr`
  font-weight: bold;
  background: ${colors.bgTertiary};
`;

const ResultsContainer = styled.div`
  margin-top: ${spacings.medium};
`;

const ConventionLink = styled.a`
  color: ${colors.altText};
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
`;

const Box = styled.div`
  margin: ${spacings.small} 0;
`;

const ConventionsContainer = styled.div`
  margin-top: ${spacings.small};
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const ResultLabel = styled.div`
  flex: 1 1 calc(100% - 200px);
  margin-right: ${spacings.small};
  overflow: hidden;
  color: ${colors.paragraph};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default Search;
