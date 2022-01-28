import {
  ComboBox,
  ComboBoxInput,
  Label,
  Section as SectionUi,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import React, { ForwardedRef, useState } from "react";
import styled from "styled-components";

import { searchAgreements } from "../../../conventions/Search/api/agreements.service";
import { Agreement } from "../../../conventions/Search/api/type";
import { InfoBulle } from "../../common/InfoBulle";
import { SectionTitle } from "../../common/stepStyles";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Agreement[]>,
    query: string
  ) => JSX.Element;
  inputRef: ForwardedRef<HTMLFormElement>;
};

export function SearchAgreement({
  renderResults,
  inputRef,
}: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const trackingContext = useTrackingContext();

  const useAgreementSuggester = createSuggesterHook(
    searchAgreements,
    "cc_search",
    trackingContext
  );

  const state = useAgreementSuggester(query);

  const searchInputHandler = (keyEvent) => {
    const value = keyEvent.target.value;
    setQuery(value);
  };

  return (
    <Section>
      <SectionTitle>
        Précisez et sélectionnez votre convention collective
      </SectionTitle>
      <form ref={inputRef} onSubmit={(event) => event.preventDefault()}>
        <InlineLabel htmlFor="agreement-search">
          Nom de la convention collective ou son numéro d’identification{" "}
          <abbr title="Identifiant de la Convention Collective">IDCC</abbr>{" "}
          <Text fontWeight="400">(champ obligatoire)</Text>
        </InlineLabel>
        <InfoBulle title="Qu'est ce qu'un IDCC">
          <p>
            L’Identifiant de la Convention Collective (IDCC) est un numéro
            unique de <strong>4 chiffres</strong> déterminant chaque convention
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
        <StyledComboBox aria-label="choose a fruit" id="comboBoxInput">
          <StyledComboBoxInput
            placeholder="Ex : Transports routiers ou 1486"
            onChange={searchInputHandler}
          />
          {renderResults(state, query)}
        </StyledComboBox>
      </form>
    </Section>
  );
}

const StyledComboBox = styled(ComboBox)`
  padding-top: ${theme.spacings.base};
`;
const StyledComboBoxInput = styled(ComboBoxInput)`
  width: 100%;
`;

const Section = styled(SectionUi)`
  padding-top: 0;
`;
const InlineLabel = styled(Label)`
  display: inline;
  margin-right: 0;
`;
