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

const { Search: SearchIcon } = icons;

type Props = {
  searchParams?: SearchParams;
  placeholder?: string;
  onSearchParamsChange: (params: SearchParams) => void;
  handleEnterpriseSelection: (
    enterprise: Enterprise,
    params?: SearchParams
  ) => void;
} & TrackingProps;
export type SearchParams = {
  address: string;
  query: string;
};
export const SearchEnterpriseInput = ({
  searchParams = { address: "", query: "" },
  onUserAction,
  onSearchParamsChange,
  handleEnterpriseSelection,
}: Props): JSX.Element => {
  const useEnterpriseSuggester = createSuggesterHook(
    searchEnterprises,
    (query, address) => {
      onUserAction(UserAction.SearchEnterprise, { address, query });
    }
  );
  const state = useEnterpriseSuggester(
    searchParams.query,
    searchParams.address
  );
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");
  const searchInputHandler = () => {
    onSearchParamsChange({ ...searchParams, query: query, address: address });
  };

  return (
    <>
      <Flex>
        <Box>
          <InlineLabel htmlFor="enterprise-search">
            Nom de votre entreprise ou numéro Siret
          </InlineLabel>
          <InfoBulle title={"Qu’est ce qu’un n°siret ?"}>
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
          />
        </Box>
        <Box>
          <InlineLabel htmlFor="enterprise-search-address">
            Code postal ou ville
          </InlineLabel>{" "}
          <Text fontWeight="400" fontSize="small">
            (facultatif)
          </Text>
          <InputWithButton>
            <BlockInputRight
              placeholder="Ex : 31000 ou Toulouse"
              value={address}
              type="text"
              name="address"
              id="enterprise-search-address"
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="off"
              data-testid="agreement-postal-code-search-input"
            />
            <SubmitIcon
              type="submit"
              title="Lancer ma recherche"
              aria-label="Lancer ma recherche"
              onClick={searchInputHandler}
              small
              narrow
              variant="secondary"
              data-testid="agreement-company-search-button"
            >
              <MobileOnly>Rechercher</MobileOnly>
              <StyledSearchIcon />
            </SubmitIcon>
          </InputWithButton>
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
const BlockInputRight = styled(BlockInput)`
  @media (min-width: ${theme.breakpoints.tablet}) {
    input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const InlineLabel = styled(Label)`
  display: inline;
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

const InputWithButton = styled.div`
  position: relative;
`;
const SubmitIcon = styled(Button)`
  @media (min-width: ${theme.breakpoints.mobile}) {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 2.5rem;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    margin-top: ${theme.spacings.xmedium};
    box-sizing: inherit;
  }
  color: ${({ theme }) => theme.white};
`;

const StyledSearchIcon = styled(SearchIcon)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
  color: ${({ theme }) => theme.white};
  height: 25px;
  width: 25px;
`;

const MobileOnly = styled.span`
  @media (min-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;
