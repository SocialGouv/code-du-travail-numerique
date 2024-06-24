import { Label, Text, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";
import { formatIdcc } from "@socialgouv/modeles-social";
import { InfoBulle } from "../../../InfoBulle";
import { searchAgreements } from "../../../../../conventions/Search/api/agreements.service";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";
import { AgreementNoResult } from "../AgreementNoResult";
import { Agreement } from "../../../../../outils/types";
import { useCombobox } from "downshift";
import {
  StyledSuggestion,
  StyledList,
  StyledInput,
} from "../../../../../search/SearchBar";

type Props = {
  onSelectAgreement: (agreement: Agreement) => void;
  searchResultOverride?: (query: string, results: Agreement[]) => Agreement[];
} & TrackingProps;

export const SearchAgreementInput = ({
  onUserAction,
  onSelectAgreement,
  searchResultOverride,
}: Props): JSX.Element => {
  const [query, setQuery] = useState<null | string>(null);
  const [suggestions, setSuggestions] = useState<Agreement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getLabelProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    onInputValueChange: async ({ inputValue }) => {
      setIsLoading(true);
      setQuery(inputValue);
      try {
        const results = await searchAgreements(inputValue);
        if (inputValue) {
          onUserAction(UserAction.SearchAgreement, { query: inputValue });
        }
        if (searchResultOverride) {
          setSuggestions(searchResultOverride(inputValue, results));
        } else {
          setSuggestions(results);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    onSelectedItemChange(changes) {
      const suggestion: Agreement = changes.selectedItem;
      if (suggestion) {
        onSelectAgreement(suggestion);
      }
    },
    itemToString(item) {
      return item ? item.shortTitle : "";
    },
  });

  return (
    <>
      <InlineLabel
        {...getLabelProps()}
        htmlFor="agreement-search"
        id="agreement-search-label"
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

      <StyledSearch
        {...getInputProps()}
        data-testid="agreement-search-input"
        id="agreement-search"
        placeholder={"Ex : Transports routiers ou 1486"}
        type="search"
      />

      <StyledUl
        {...getMenuProps()}
        hideBorder={suggestions.length === 0 || !isOpen}
      >
        {isOpen &&
          suggestions.map((item: Agreement, index) => (
            <StyledSuggestion
              {...getItemProps({
                item,
                index,
              })}
              key={`${item}${index}`}
              isHighlighted={highlightedIndex === index}
            >
              {item.shortTitle} (IDCC {formatIdcc(item.num)})
            </StyledSuggestion>
          ))}
      </StyledUl>
      {query !== null && query !== "" && (
        <AgreementNoResult
          data={suggestions}
          isLoading={isLoading}
          error={error}
          onUserAction={onUserAction}
        />
      )}
    </>
  );
};

const StyledSearch = styled(StyledInput)`
  margin-top: ${theme.spacings.small};
  padding: 1rem 1.6rem;
`;

const StyledUl = styled(StyledList)`
  position: initial;
  border: ${({ hideBorder }) =>
    hideBorder ? "0px" : `1px solid ${theme.colors.border}`};
  box-shadow: initial;
`;

const InlineLabel = styled(Label)`
  display: inline;
`;
