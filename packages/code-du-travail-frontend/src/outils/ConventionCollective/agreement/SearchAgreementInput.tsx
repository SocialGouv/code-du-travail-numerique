import {
  Input,
  Label,
  Paragraph,
  Section as SectionUi,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import styled from "styled-components";

import { InfoBulle } from "../../common/InfoBulle";
import EmbeddedInForm from "../common/EmbeddedInForm";

type Props = {
  embeddedForm: boolean;
  query?: string;
  onChange: (event: React.ChangeEvent) => void;
  placeholder?: string;
};

const defaultPlaceholder = "Ex : Transports routiers ou 1486";

export const SearchAgreementInput = React.forwardRef(
  function _SearchAgreementInput(
    {
      embeddedForm = true,
      query = "",
      onChange,
      placeholder = defaultPlaceholder,
    }: Props,
    ref: ForwardedRef<HTMLFormElement>
  ): JSX.Element {
    return (
      <Section>
        <Paragraph fontWeight="600" fontSize="default">
          Précisez et sélectionnez votre convention collective
        </Paragraph>
        <EmbeddedInForm
          enable={embeddedForm}
          reference={ref}
          onSubmit={(event) => event.preventDefault()}
        >
          <InlineLabel htmlFor="agreement-search">
            Nom de la convention collective ou son numéro d’identification{" "}
            <abbr title="Identifiant de la Convention Collective">IDCC</abbr>{" "}
            <Text fontWeight="400">(champ obligatoire)</Text>
          </InlineLabel>
          <InfoBulle title="Qu'est ce qu'un IDCC">
            <p>
              L’Identifiant de la Convention Collective (IDCC) est un numéro
              unique de <strong>4 chiffres</strong> déterminant chaque
              convention collective (Ex&nbsp; : 1090 ou 1486).
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
        </EmbeddedInForm>
      </Section>
    );
  }
);

const Section = styled(SectionUi)`
  padding-top: 0;
`;

const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.base};
  width: 100%;
`;

const InlineLabel = styled(Label)`
  display: inline;
  margin-right: 0;
`;
