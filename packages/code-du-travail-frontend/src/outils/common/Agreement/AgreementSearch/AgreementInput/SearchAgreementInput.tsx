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

type Props = {
  onSelectAgreement: (agreement: Agreement) => void;
  searchResultOverride?: (query: string, results: Agreement[]) => Agreement[];
} & TrackingProps;

export const SearchAgreementInput = ({
  onUserAction,
  onSelectAgreement,
  searchResultOverride,
}: Props): JSX.Element => {
  const [suggestions, setSuggestions] = useState<Agreement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasAlreadyFetched, setHasAlreadyFetched] = useState(false);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    onInputValueChange: async ({ inputValue }) => {
      setHasAlreadyFetched(true);
      setIsLoading(true);
      onUserAction(UserAction.SearchAgreement, { query: inputValue });
      try {
        const results = await searchAgreements(inputValue);
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

      <StyledInput {...getInputProps()} data-testid="agreement-search-input" />

      <StyledList {...getMenuProps()}>
        {isOpen &&
          suggestions.map((item: Agreement, index) => (
            <StyledSuggestion
              isHighlighted={highlightedIndex === index}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item.shortTitle} (IDCC {formatIdcc(item.num)})
            </StyledSuggestion>
          ))}
      </StyledList>
      {hasAlreadyFetched && (
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

const { breakpoints, spacings, fonts, box, colors } = theme;

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  height: 5.4rem;
  margin: 0;
  color: ${({ theme }) => theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: inherit;
  background: ${({ theme }) => theme.white};
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 5.4rem;
    padding: 1rem 5.5rem 1rem ${spacings.base};
  }

  margin-top: ${spacings.small};
`;

const StyledList = styled.ul`
  width: 100%;
  z-index: 1;
  background: ${colors.white};
  box-shadow: 0 10px 10px -10px #b7bcdf;
  margin: 0;
  margin-top: ${spacings.tiny};
  padding: 0;
  border-radius: 3px;
`;

const StyledSuggestion = styled.li`
  border-radius: 3px;
  cursor: pointer;
  line-height: 2rem;
  list-style-type: none;
  padding: ${spacings.base};
  background: ${({ isHighlighted, theme }) =>
    isHighlighted ? theme.bgTertiary : "initial"};
`;

const InlineLabel = styled(Label)`
  display: inline;
`;
