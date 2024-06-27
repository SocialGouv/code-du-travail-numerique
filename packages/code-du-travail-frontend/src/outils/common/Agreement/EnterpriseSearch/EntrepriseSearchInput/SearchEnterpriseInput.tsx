import { Button, icons, Input, Label, Text, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";
import { createSuggesterHook } from "../../components/Suggester";
import {
  Enterprise,
  searchEnterprises,
} from "../../../../../conventions/Search/api/enterprises.service";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";
import { InfoBulle } from "../../../InfoBulle";
import { EntrepriseSearchResults } from "../EntrepriseSearchResult";
import {
  ApiGeoResultWithSelectedPostCode,
  LocationSearchInput,
} from "../Location/Search";

type Props = {
  searchParams?: SearchParams;
  placeholder?: string;
  onSearchParamsChange: (params: SearchParams) => void;
  isDisabled?: boolean;
  handleEnterpriseSelection: (
    enterprise: Enterprise,
    params?: SearchParams
  ) => void;
} & TrackingProps;

export type SearchParams = {
  query: string;
  apiGeoResult?: ApiGeoResultWithSelectedPostCode;
};

export const SearchEnterpriseInput = ({
  searchParams = { query: "" },
  onUserAction,
  onSearchParamsChange,
  isDisabled,
  handleEnterpriseSelection,
}: Props): JSX.Element => {
  const useEnterpriseSuggester = createSuggesterHook(
    searchEnterprises,
    (searchParams) => {
      onUserAction(UserAction.SearchEnterprise, searchParams);
    }
  );
  const state = useEnterpriseSuggester(searchParams);
  const [query, setQuery] = useState(searchParams.query);
  const [selectedApiGeoResult, setSelectedApiGeoResult] = useState<
    ApiGeoResultWithSelectedPostCode | undefined
  >(searchParams.apiGeoResult);

  const searchInputHandler = (e) => {
    e.preventDefault();
    onSearchParamsChange({
      ...searchParams,
      query,
      apiGeoResult: selectedApiGeoResult,
    });
  };

  return (
    <>
      <Flex>
        <Box>
          <InlineLabel htmlFor="enterprise-search" disabled={isDisabled}>
            Nom de votre entreprise ou numéro Siret
          </InlineLabel>
          <InfoBulle
            title={"Qu’est ce qu’un n°siret ?"}
            isDisabled={isDisabled}
          >
            <p>
              Le numéro Siret est un <strong>numéro de 14 chiffres</strong>{" "}
              unique pour chaque entreprise. Il est présent sur la{" "}
              <strong>fiche de paie du salarié</strong>.<br />
              Ex : 40123778000127
            </p>
          </InfoBulle>

          <BlockInputLeft
            placeholder="Ex : Café de la gare ou 40123778000127"
            value={query}
            type="text"
            name="query"
            id="enterprise-search"
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            data-testid="agreement-company-search-input"
            disabled={isDisabled}
          />
        </Box>
        <Box>
          <LocationSearchInput
            searchInputHandler={searchInputHandler}
            setSelectedApiGeoResult={setSelectedApiGeoResult}
            selectedApiGeoResult={selectedApiGeoResult}
            isDisabled={isDisabled}
          />
        </Box>
      </Flex>
      <EntrepriseSearchResults
        handleEnterpriseSelection={handleEnterpriseSelection}
        onUserAction={onUserAction}
        state={state}
        params={searchParams}
      />
    </>
  );
};

const BlockInput = styled(Input)`
  width: 100%;
`;

const BlockInputLeft = styled(BlockInput)`
  @media (min-width: ${theme.breakpoints.tablet}) {
    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

const InlineLabel = styled(Label)`
  display: inline;
  color: ${({ theme, disabled }) =>
    disabled ? theme.placeholder : theme.paragraph};
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Box = styled.div`
  flex: 1;
  width: 100%;

  & + & {
    @media (min-width: ${theme.breakpoints.mobile}) {
      flex: 0 1 26rem;
    }
    @media (max-width: ${theme.breakpoints.mobile}) {
      padding-top: ${theme.spacings.xmedium};
    }
  }
`;
