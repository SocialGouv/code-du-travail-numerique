import { Input, Label, Text, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";
import Autosuggest from "react-autosuggest";
import { formatIdcc } from "@socialgouv/modeles-social";
import { suggesterTheme } from "../../../../../search/SearchBar/DocumentSuggesterTheme";
import { InfoBulle } from "../../../InfoBulle";
import { createSuggesterHook } from "../../components/Suggester";
import { searchAgreements } from "../../../../../conventions/Search/api/agreements.service";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";
import { renderResults } from "../AgreementNoResult";

type Props = {
  onSelectAgreement: (Agreement) => void;
} & TrackingProps;

export const SearchAgreementInput = ({
  onUserAction,
  onSelectAgreement,
}: Props): JSX.Element => {
  const [query, setQuery] = useState("");

  const useAgreementSuggester = createSuggesterHook(
    searchAgreements,
    (query) => {
      onUserAction(UserAction.SearchAgreement, { query });
    }
  );

  const state = useAgreementSuggester(query);

  const onChange = () => {};

  const onClear = () => {
    setQuery("");
  };

  const onSearch = async ({ value }) => {
    setQuery(value);
  };

  const onSelect = async (event, data) => {
    event.preventDefault();
    onSelectAgreement(data.suggestion);
  };
  const inputProps = {
    "aria-label": "agreement-search-label",
    id: "agreement-search",
    name: "agreement-search",
    onChange: onChange,
    placeholder: "Ex : Transports routiers ou 1486",
    title: "Nom de la convention collective",
    type: "search",
    value: query,
  };
  return (
    <>
      <InlineLabel htmlFor="agreement-search" id="agreement-search-label">
        Nom de la convention collective ou son numéro d’identification{" "}
        <abbr title="Identifiant de la Convention Collective">IDCC</abbr>{" "}
        <Text fontWeight="400" fontSize="small">
          (champ obligatoire)
        </Text>
      </InlineLabel>
      <InfoBulle title="Qu'est ce qu'un IDCC">
        <p>
          L’Identifiant de la Convention Collective (IDCC) est un numéro unique
          de <strong>4 chiffres</strong> déterminant chaque convention
          collective (Ex&nbsp; : 1090 ou 1486).
        </p>
        <p>
          <strong>Attention à ne pas confondre</strong> avec les codes APE
          (Activité Principale Exercée) ou NAF (Nomenclature des Activités
          Françaises) qui sont des numéros composés de 4 chiffres et d’une
          lettre dont l’objectif est d’identifier l’activité principale de
          l’entreprise (Ex : 4752A).
        </p>
      </InfoBulle>

      <Autosuggest
        theme={suggesterTheme}
        suggestions={state.data ?? []}
        alwaysRenderSuggestions={false}
        onSuggestionSelected={onSelect}
        onSuggestionsFetchRequested={onSearch}
        onSuggestionsClearRequested={onClear}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderInputComponent={renderInputComponent}
        inputProps={inputProps}
        focusInputOnSuggestionClick={false}
      />
      {renderResults({ onUserAction, state })}
    </>
  );
};

const renderInputComponent = (inputProps) => <BlockInput {...inputProps} />;

const SuggestionsContainer = styled.div`
  li[role="option"]:nth-child(2n + 1) {
    background: ${theme.colors.bgSecondary};
  }
`;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion.shortTitle} <IDCC>(IDCC {formatIdcc(suggestion.num)})</IDCC>
  </div>
);
const IDCC = styled.span`
  font-weight: normal;
`;
const renderSuggestionsContainer = ({ containerProps, children }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.small};
  width: 100%;
`;

const InlineLabel = styled(Label)`
  display: inline;
`;
