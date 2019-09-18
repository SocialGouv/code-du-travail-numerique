import React, { useState } from "react";
import styled from "styled-components";

import { theme, Container, Table, Tag } from "@cdt/ui-old";

import SearchCC from "./SearchCC";

// link to a CC
const CC = ({ id, num, title, onClick }) => {
  return (
    <Box>
      <Flex>
        <Tag title="Numéro de convention collective" variant="info">
          IDCC {`0000${num}`.slice(-4)}
        </Tag>
        <Spacer />
        {onClick ? (
          <CCLink onClick={onClick}>{title}</CCLink>
        ) : (
          <CCLink
            target={`_blank`}
            rel="noopener noreferrer"
            href={`https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${id}`}
          >
            {title}
          </CCLink>
        )}
      </Flex>
    </Box>
  );
};

const TagSiret = ({ siret }) => (
  <Tag title="Numéro SIRET" size="small" variant="info">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://entreprise.data.gouv.fr/etablissement/${siret}`}
    >
      {siret}
    </a>
  </Tag>
);

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
    <Container>
      <h3>{title}</h3>
      <p>
        Saisissez le nom de votre entreprise, la convention collective ou le
        numéro SIRET
      </p>
      <Input
        placeholder="Ex: 'Corso Balard' ou '82161143100015' ou '1486' "
        value={query}
        type="text"
        onChange={onInputChange}
      />
      <SearchCC
        query={query}
        render={({ status, results }) =>
          query && (
            <ResultsContainer>
              {status === "loading" && (
                <div>Recherche des convention collectives...</div>
              )}
              {status === "error" && (
                <div>Aucun résultat pour votre recherche.</div>
              )}
              {status === "success" && results && results.length ? (
                <Table stripes>
                  <tbody>
                    {results.map(result => (
                      <tr key={result.id}>
                        <td>
                          <Flex>
                            <ResultLabel>{result.label}</ResultLabel>
                            {result.siret && <TagSiret siret={result.siret} />}
                          </Flex>
                          <CCsContainer>
                            {result.conventions && result.conventions.length ? (
                              result.conventions.map(convention => (
                                <CC
                                  onClick={
                                    onSelectConvention &&
                                    (() => selectConvention(convention))
                                  }
                                  key={convention.id}
                                  {...convention}
                                />
                              ))
                            ) : (
                              <div className="text-danger">
                                Aucune convention collective connue pour cette
                                entreprise
                              </div>
                            )}
                          </CCsContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                ""
              )}
            </ResultsContainer>
          )
        }
      />
    </Container>
  );
};

const ResultsContainer = styled.div`
  margin-top: ${theme.spacing.medium};
`;

const CCLink = styled.a`
  color: ${theme.colors.lightText};
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
`;

const Box = styled.div`
  margin: ${theme.spacing.small} 0;
`;

const CCsContainer = styled.div`
  margin-top: ${theme.spacing.small};
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Spacer = styled.div`
  display: inline-block;
  width: ${theme.spacing.small};
  flex: 0 0 auto;
`;

const ResultLabel = styled.div`
  flex: 1 0 auto;
  fontsize: ${theme.fonts.sizeH4};
  margin-right: ${theme.spacing.tiny};
  overflow: hidden;
  text-overflow: ellipsis;
  whitespace: nowrap;
  max-width: calc(100% - 200px);
  font-weight: bold;
  color: ${theme.colors.blue};
`;

export default Search;
