import { Input, Label, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import {
  createSuggesterHook,
  FetchReducerState,
} from "../../components/Suggester";
import {
  Enterprise,
  searchEnterprises,
} from "../../../../../conventions/Search/api/enterprises.service";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";
import { InfoBulle } from "../../../InfoBulle";

type Props = {
  searchParams?: SearchParams;
  placeholder?: string;
  onSearchParamsChange: (params: SearchParams) => void;
  renderResults: (
    state: FetchReducerState<Enterprise[]>,
    params: SearchParams
  ) => JSX.Element;
} & TrackingProps;
export type SearchParams = {
  address: string;
  query: string;
};
export const SearchEnterpriseInput = ({
  searchParams = { address: "", query: "" },
  onUserAction,
  onSearchParamsChange,
  renderResults,
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
  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    onSearchParamsChange({ ...searchParams, [name]: value });
  };

  return (
    <>
      <Flex>
        <Box>
          <InlineLabel htmlFor="enterprise-search">
            Nom de votre entreprise ou numéro Siret{" "}
            <Text fontWeight="400" fontSize="small">
              (obligatoire)
            </Text>
          </InlineLabel>
          <InfoBulle title={"Qu’est ce qu’un n°siret ?"}>
            <p>
              Le numéro Siret est un <strong>numéro de 14 chiffres</strong>{" "}
              unique pour chaque entreprise. Il est présent sur la{" "}
              <strong>fiche de paie du salarié</strong>.<br />
              Ex : 40123778000127
            </p>
          </InfoBulle>

          <BlockInput
            placeholder="Ex : Café de la gare ou 40123778000127"
            value={searchParams.query}
            type="text"
            name="query"
            id="enterprise-search"
            onChange={searchInputHandler}
            autoComplete="off"
            data-testid="agreement-company-search-input"
          />
        </Box>
        <Box>
          <InlineLabel htmlFor="enterprise-search-address">
            Code postal ou ville
          </InlineLabel>
          <BlockInput
            placeholder="Ex : 31000 ou Toulouse "
            value={searchParams.address}
            type="text"
            name="address"
            id="enterprise-search-address"
            onChange={searchInputHandler}
            autoComplete="off"
            data-testid="agreement-postal-code-search-input"
          />
        </Box>
      </Flex>

      {renderResults(state, searchParams)}
    </>
  );
};

const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.small};
  width: 100%;
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
  }
`;

const Box = styled.div`
  flex: 1;

  & + & {
    flex: 0 1 25rem;
    padding-left: ${theme.spacings.xmedium};
    @media (max-width: ${theme.breakpoints.mobile}) {
      padding-top: ${theme.spacings.xmedium};
      padding-left: 0;
    }
    @media (max-width: ${theme.breakpoints.mobile}) {
      flex: 0 1 auto;
    }
  }
`;
