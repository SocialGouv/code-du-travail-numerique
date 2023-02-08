import { Input, Label, Text, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";

import { InfoBulle } from "../../../InfoBulle";
import {
  createSuggesterHook,
  FetchReducerState,
} from "../../components/Suggester";
import { searchAgreements } from "../../../../../conventions/Search/api/agreements.service";
import { Agreement } from "../../../../../conventions/Search/api/type";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Agreement[]>,
    query: string
  ) => JSX.Element;
} & TrackingProps;

export const SearchAgreementInput = ({
                                       onUserAction,
                                       renderResults,
                                     }: Props): JSX.Element => {
  const [query, setQuery] = useState("");

  const useAgreementSuggester = createSuggesterHook(
    searchAgreements,
    (query) => {
      onUserAction(UserAction.SearchAgreement, {query});
    }
  );

  const state = useAgreementSuggester(query);

  const searchInputHandler = (keyEvent) => {
    const value = keyEvent.target.value;
    setQuery(value);
  };
  return (
    <>
      <InlineLabel
        htmlFor="agreement-search"
        id="agreement-search-label"
        for="agreement-search"
      >
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
      <BlockInput
        placeholder="Ex : Transports routiers ou 1486"
        value={query}
        type="search"
        name="agreement-search"
        id="agreement-search"
        onChange={searchInputHandler}
        autoComplete="off"
        data-testid="agreement-search-input"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-controls="popup_listbox"
        aria-activedescendant="selected_option"
      />

      {renderResults(state, query)}
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
