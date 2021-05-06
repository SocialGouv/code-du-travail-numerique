import { Input, Label as LabelUI, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { InfoBulle } from "../common/InfoBulle";

type Props = {
  query?: string;
  onChange: (event: React.ChangeEvent) => void;
  placeholder?: string;
};

const defaultPlaceholder = "Ex : Transports routiers ou 1486";

export function SearchAgreementInput({
  query = "",
  onChange,
  placeholder = defaultPlaceholder,
}: Props): JSX.Element {
  return (
    <>
      <InlineLabel htmlFor="agreement-search">
        Nom de la convention collective ou son numéro d’identification{" "}
        <abbr title="Identifiant de la Convention Collective">IDCC</abbr>{" "}
        <Text fontWeight="400">(obligatoire)</Text>
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
        placeholder={placeholder}
        value={query}
        type="search"
        name="agreement-search"
        id="agreement-search"
        onChange={onChange}
        autoComplete="off"
      />
    </>
  );
}

const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.base};
  width: 100%;
`;

const InlineLabel = styled(LabelUI)`
  display: inline;
  margin-right: 0;
`;
