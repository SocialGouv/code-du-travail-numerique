import {
  AlertWithIcon,
  ComboBox,
  ComboBoxInput,
  Input,
  Label,
  Section as SectionUi,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import styled from "styled-components";

import {
  Enterprise,
  searchEnterprises,
} from "../../../conventions/Search/api/enterprises.service";
import { InfoBulle } from "../../common/InfoBulle";
import { SectionTitle } from "../../common/stepStyles";
import { useNavContext } from "../common/NavContext";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Enterprise[]>,
    params: SearchParams
  ) => JSX.Element;
  inputRef: ForwardedRef<HTMLDivElement>;
};

export type SearchParams = {
  address: string;
  query: string;
};

export function SearchEnterprise({
  renderResults,
  inputRef,
}: Props): JSX.Element {
  const { searchParams, setSearchParams } = useNavContext();

  const trackingContext = useTrackingContext();

  const useEnterpriseSuggester = createSuggesterHook(
    searchEnterprises,
    "enterprise_search",
    trackingContext
  );

  const state = useEnterpriseSuggester(
    searchParams.query,
    searchParams.address
  );

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <Section>
      <SectionTitle>Précisez et sélectionnez votre entreprise</SectionTitle>

      <AlertWithMargin variant="secondary">
        Avec le nom de l’entreprise, il est possible de retrouver la convention
        collective associée.
      </AlertWithMargin>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Box ref={inputRef}>
          <InlineLabel htmlFor="enterprise-search">
            Nom de votre entreprise ou numéro Siret{" "}
            <Text fontWeight="400">(obligatoire)</Text>
          </InlineLabel>
          <InfoBulle title={"Qu’est ce qu’un n°siret ?"}>
            <p>
              Le numéro Siret est un <strong>numéro de 14 chiffres</strong>{" "}
              unique pour chaque entreprise. Il est présent sur la{" "}
              <strong>fiche de paie du salarié</strong>.<br />
              Ex : 40123778000127
            </p>
          </InfoBulle>
          <BlockComboBox aria-label="Rechercher mon entreprise">
            <ComboBoxInput
              placeholder="Ex : Café de la gare ou 40123778000127"
              id="enterprise-search"
              name="query"
              value={searchParams.query}
              onChange={searchInputHandler}
            />
            {renderResults(state, searchParams)}
          </BlockComboBox>
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
          />
        </Box>
      </Form>
    </Section>
  );
}

const Section = styled(SectionUi)`
  padding-top: 0;
`;
const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.base};
  width: 100%;
`;
const BlockComboBox = styled(ComboBox)`
  padding-top: ${theme.spacings.base};
`;

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const InlineLabel = styled(Label)`
  display: inline;
`;

const Box = styled.div`
  flex: 1;
  align-self: flex-start;
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

const AlertWithMargin = styled(AlertWithIcon)`
  margin: ${theme.spacings.large} 0;
`;
