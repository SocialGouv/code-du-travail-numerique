import React, { useState } from "react";
import styled from "styled-components";

import kali from "@socialgouv/kali-data/data/index.json";

import { theme, Container, Table, Tag } from "@cdt/ui";

import SearchHoc from "./SearchHoc";

// normalize idcc nums
const formatIdCc = num => {
  while (num.length < 4) num = "0" + num;
  return num;
};

// link to a CC
const CC = ({ idcc }) => {
  const data = kali.find(c => formatIdCc(c.num) === formatIdCc(idcc));
  if (data) {
    return (
      <Box>
        <Flex>
          <Tag title="Numéro de convention collective" variant="info">
            IDCC {formatIdCc(idcc)}
          </Tag>
          <Spacer />
          <a
            target="_blank"
            style={{ textDecoration: "none", color: theme.colors.lightText }}
            rel="noopener noreferrer"
            href={`https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${
              data.id
            }`}
          >
            {data.titre}
          </a>
        </Flex>
      </Box>
    );
  }
  return null;
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
const Search = () => {
  const [query, setQuery] = useState("");
  const onInputChange = e => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <Container>
      <h3>Recherche de convention collective</h3>
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
      <SearchHoc
        query={query}
        render={({ status, results }) =>
          (
            <div style={{ marginTop: 25 }}>
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
                            {result.idcc.length ? (
                              result.idcc.map(id => <CC key={id} idcc={id} />)
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
            </div>
          ) || null
        }
      />
    </Container>
  );
};

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
