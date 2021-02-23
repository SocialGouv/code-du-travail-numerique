import { Button, Input, InputRadio, theme } from "@socialgouv/cdtn-ui";
import debounce from "debounce-promise";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";
import { v4 as generateUUID } from "uuid";

import { matopush } from "../../piwik";
import { CompanyTile } from "./CompanyTile";
import { ConventionLink } from "./ConventionLink";
import { HelpModal } from "./HelpModal";
import { ResultList } from "./ResultList";
import useSearchCC, {
  ADRESSE_SEARCH,
  CONVENTION_SEARCH,
  ENTERPRISE_SEARCH,
  ENTERPRISE_SEARCH_NO_CC,
} from "./searchHook";

const trackInput = debounce((query, path, trackingUID) => {
  if (query.length > 1) {
    matopush(["trackEvent", "cc_search", path, `${trackingUID} : ${query}`]);
  }
}, 2000);

const searchTypes = [
  {
    key: ENTERPRISE_SEARCH,
    label: "Nom de votre entreprise ou numéro de SIRET",
    placeholder: "Saisissez le nom de votre entreprise",
  },
  {
    key: ENTERPRISE_SEARCH_NO_CC,
    label:
      "Nom de votre entreprise ou numéro de SIRET : entreprises sans conventions",
    placeholder: "Saisissez le nom de votre entreprise",
  },
  {
    key: ADRESSE_SEARCH,
    label: "Nom de votre entreprise & adresse ",
    placeholder: "Saisissez l'adresse de votre société",
  },
  {
    key: CONVENTION_SEARCH,
    label: "Nom de votre convention collective ou IDCC",
    placeholder: "Saisissez votre convention collective ou IDCC",
  },
];

const Search = ({ onSelectConvention }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");
  const [trackingUID, setTrackingUID] = useState("");
  const [searchType, setSearchType] = useState(ENTERPRISE_SEARCH);

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

  const onAddressChange = (keyEvent) => {
    const value = keyEvent.target.value;
    trackInput(value, router.asPath, trackingUID);
    setAddress(value);
  };

  const [status, { conventions = [], entreprises = [] } = {}] = useSearchCC(
    query,
    address,
    searchType
  );

  // TODO copied from outils
  const { breakpoints, fonts, spacings } = theme;
  const RadioContainer = styled.div`
    display: flex;
    flex-direction: ${(props) =>
      props.direction === "row" ? "row" : "column"};
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: ${spacings.medium};
  `;
  const Label = styled.label`
    display: block;
    margin-top: ${spacings.medium};
    margin-bottom: ${spacings.small};
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
    cursor: ${(props) => (props.as ? "default" : "pointer")};
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.default};
    }
  `;

  return (
    <>
      <Label htmlFor="convention-search">
        Recherchez votre convention collective par :
      </Label>

      <RadioContainer>
        {searchTypes.map(({ key, label }) => {
          return (
            <InputRadio
              key={`radio-${key}`}
              label={label}
              name={`radio-${key}`}
              id={`radio-${key}`}
              value={searchType === key}
              checked={searchType === key}
              onChange={() => setSearchType(key)}
            />
          );
        })}
      </RadioContainer>

      <BlockInput
        role="search"
        placeholder={
          searchTypes.find(({ key }) => key == searchType).placeholder
        }
        value={query}
        type="search"
        name="q"
        id="convention-search"
        onChange={onInputChange}
      />

      {searchType == ADRESSE_SEARCH ? (
        <BlockInput
          role="search"
          placeholder="Ville, code postal ou adresse complète"
          value={address}
          type="search"
          name="a"
          id="convention-search-address"
          onChange={onAddressChange}
        />
      ) : (
        ""
      )}
      {query && (
        <ResultsContainer>
          {status === "loading" && (
            <div>
              <Spinner /> Recherche des convention collectives...
            </div>
          )}
          {status === "error" && (
            <div>Le service de recherche est indisponible.</div>
          )}
          {status === "empty" && <div>Aucun résultat n’a été trouvé.</div>}
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
                      searchType={searchType}
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
  color: ${theme.colors.secondary};
  text-decoration: underline;
`;

const ResultsContainer = styled.div`
  margin-top: ${spacings.medium};
`;

export default Search;
