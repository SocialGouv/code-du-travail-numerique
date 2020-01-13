import React, { useState } from "react";

import styled from "styled-components";
import Link from "next/link";
import Spinner from "react-svg-spinner";

import slugify from "@cdt/data/slugify";
import { Input, Table, Heading, theme } from "@socialgouv/react-ui";
import { formatIdcc } from "@cdt/data/lib";

import SearchCC from "./SearchCC";

// following data/populate.js slug rules
const getConventionSlug = convention =>
  slugify(`${convention.num}-${convention.shortTitle}`.substring(0, 80));

// link to a Convention
const Convention = ({ num, shortTitle, onClick }) => {
  return (
    <Box>
      {onClick ? (
        <span>
          <ConventionLink onClick={onClick}>{shortTitle}</ConventionLink> (IDCC{" "}
          {formatIdcc(num)})
        </span>
      ) : (
        <>
          <Link
            href="/convention-collective/[slug]"
            as={`/convention-collective/${getConventionSlug({
              num,
              shortTitle
            })}`}
            passHref
          >
            <ConventionLink>{shortTitle}</ConventionLink>
          </Link>
          <span> (IDCC {formatIdcc(num)})</span>
        </>
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

const SearchResult = ({ label, siret, conventions, selectConvention }) => {
  return (
    <StyledTr>
      <StyledTd>
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
      </StyledTd>
    </StyledTr>
  );
};

// demo app
// userland UI
const Search = ({
  title = "Recherche de convention collective",
  resetOnClick = true,
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
    <>
      {title && <Heading>{title}</Heading>}
      <p>
        Renseignez le nom de votre entreprise, son SIRET ou le nom de votre
        convention collective.
      </p>
      <BlockInput
        role="search"
        placeholder="Nom d'entreprise, SIRET, nom de convention collective"
        value={query}
        type="search"
        name="q"
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
                  <div>La convention collective n‘a pas été trouvée.</div>
                )}
                {status === "success" && results && results.length !== 0 && (
                  <FixedTable>
                    <tbody>
                      {resultsConventions.length !== 0 && (
                        <React.Fragment>
                          <TitleResults>
                            <StyledTd>Conventions collectives</StyledTd>
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
                            <StyledTd>Entreprises</StyledTd>
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
    </>
  );
};

const { box, colors, fonts, spacings, breakpoints } = theme;
const BlockInput = styled(Input)`
  display: block;
`;
const FixedTable = styled(Table)`
  width: 100%;
  overflow: hidden;
  border: none;
  border-radius: ${box.borderRadius};
`;

const TitleResults = styled.tr`
  font-weight: bold;
  background: ${colors.bgTertiary};
`;

const StyledTr = styled.tr`
  & + & {
    border-top: ${({ theme }) => box.border(theme.border)};
  }
`;

const StyledTd = styled.td`
  border: none !important;
`;

const ResultsContainer = styled.div`
  margin-top: ${spacings.medium};
`;

const ConventionLink = styled.a`
  color: ${colors.altText};
  cursor: pointer;
`;

const Box = styled.div`
  margin: ${spacings.small} 0;
`;

const ConventionsContainer = styled.div`
  margin-top: ${spacings.small};
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: space-between;
  @media screen and (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: baseline;
  }
`;

const ResultLabel = styled.div`
  flex: 1 1 calc(100% - 200px);
  align-self: flex-start;
  margin-top: ${spacings.small};
  margin-right: ${spacings.small};
  overflow: hidden;
  color: ${colors.paragraph};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
  @media screen and (min-width: ${breakpoints.tablet}) {
    align-self: baseline;
    margin-top: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default Search;
