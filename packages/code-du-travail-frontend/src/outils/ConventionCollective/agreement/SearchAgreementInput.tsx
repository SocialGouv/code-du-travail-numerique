import { Alert, Button, icons, Input, Label, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";

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
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  return (
    <>
      <Label htmlFor="agreement-search">
        Nom de la convention collective ou son numéro d’identification (IDCC)
      </Label>
      <InfoButton
        variant="navLink"
        size="small"
        onClick={() => setIsNoticeVisible(!isNoticeVisible)}
      >
        Qu’est ce qu’un idcc&nbsp;
        <icons.HelpCircle size="20" aria-label="?" />
      </InfoButton>
      {isNoticeVisible && (
        <Alert variant="secondary">
          <p>
            L’Identifiant de la Convention Collective (IDCC) est un numéro
            unique de
            <strong>4 chiffres</strong> déterminant chaque convention collective
            (Ex&nbsp; : 1090 ou 1486).
          </p>
          <p>
            <strong>Attention à ne pas confondre</strong> avec les codes APE
            (Activité Principale Exercée) ou NAF (Nomenclature des Activités
            Françaises) qui sont des numéros composés de 4 chiffres et d’une
            lettre dont l’objectif est d’identifier l’activité principale de
            l’entreprise (Ex : 4752A).
          </p>
        </Alert>
      )}
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

const { spacings, fonts } = theme;

const BlockInput = styled(Input)`
  padding-top: ${spacings.base};
  width: 100%;
`;

const InfoButton = styled(Button)`
  font-weight: 700;
  font-size: ${fonts.sizes.small};
  color: ${({ theme }) => theme.secondary};
`;
