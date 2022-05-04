import { Button, Input, Label, Paragraph, theme } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import debounce from "debounce-promise";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";
import { v4 as generateUUID } from "uuid";

import { CompanyTile } from "./CompanyTile";
import { ConventionLink } from "./ConventionLink";
import { HelpModal } from "./HelpModal";
import { ResultList } from "./ResultList";
import useSearchCC from "./searchHook";

const trackInput = debounce((query, path, trackingUID) => {
  if (query.length > 1) {
    matopush(["trackEvent", "cc_search", path, `${trackingUID} : ${query}`]);
  }
}, 2000);

type Props = {
  onSelectConvention?: () => void;
};

const Search = ({ onSelectConvention }: Props): JSX.Element => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [trackingUID, setTrackingUID] = useState("");

  useEffect(() => {
    // we want to connect events that are
    // related so we only generate an uuid on mount
    setTrackingUID(generateUUID());
  }, []);

  const onInputChange = (keyEvent) => {
    const value = keyEvent.target.value;
    trackInput(value, router.asPath, trackingUID);
    setQuery(value);
  };

  //@ts-ignore
  const [status, { conventions = [], entreprises = [] } = {}] =
    useSearchCC(query);

  return (
    <>
      <Label htmlFor="convention-search">
        Renseignez le nom de votre convention collective, le nom de votre
        entreprise ou son SIRET.
      </Label>
      <BlockInput
        placeholder="Nom de la convention collective, de l’entreprise ou son SIRET"
        value={query}
        type="search"
        name="q"
        id="convention-search"
        onChange={onInputChange}
      />
      {query && (
        <ResultsContainer>
          {status === "loading" && (
            <Paragraph noMargin>
              <Spinner /> Recherche des convention collectives...
            </Paragraph>
          )}
          {status === "error" && (
            <Paragraph noMargin>
              Le service de recherche est indisponible.
            </Paragraph>
          )}
          {status === "empty" && (
            <Paragraph noMargin>Aucun résultat n’a été trouvé.</Paragraph>
          )}
          {status === "success" && (
            <>
              {conventions.length !== 0 && (
                <ResultList
                  title="CONVENTIONS COLLECTIVES"
                  query={query}
                  items={conventions.map((convention, index) => (
                    <ConventionLink
                      convention={convention}
                      isFirst={index === 0}
                      key={convention.slug}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
              {entreprises.length !== 0 && (
                <ResultList
                  title="ENTREPRISES"
                  query={query}
                  items={entreprises.map((entreprise) => (
                    <CompanyTile
                      {...entreprise}
                      key={entreprise.siret}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
            </>
          )}
        </ResultsContainer>
      )}
      <P>
        Vous ne connaissez pas ou ne trouvez pas votre convention
        collective&nbsp;?
        <Span>
          Consultez{" "}
          <HelpModal>
            {(openModal) => (
              <HelpButton
                type="button"
                variant="navLink"
                onClick={() => {
                  matopush([
                    "trackEvent",
                    "cc_search_help",
                    router.asPath,
                    `${trackingUID}`,
                  ]);
                  openModal();
                }}
              >
                notre aide
              </HelpButton>
            )}
          </HelpModal>
          .
        </Span>
      </P>
    </>
  );
};

const { spacings } = theme;
const BlockInput = styled(Input)`
  width: 100%;
`;

const P = styled.p`
  margin-top: ${spacings.xmedium};
`;

const Span = styled.span`
  display: block;
  margin-top: ${spacings.base};
`;

const HelpButton = styled(Button)`
  color: ${({ theme }) => theme.secondary};
  text-decoration: underline;
`;

const ResultsContainer = styled.div`
  margin-top: ${spacings.medium};
`;

export default Search;
