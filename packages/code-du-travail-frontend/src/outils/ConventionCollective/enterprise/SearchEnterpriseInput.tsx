import { Alert, Button, icons, Input, Label, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";

import { Mandatory } from "../../common/Question";

type Props = {
  query?: string;
  address?: string;
  onChange: (event: React.ChangeEvent) => void;
  placeholder?: string;
};

export function SearchEnterpriseInput({
  query = "",
  address = "",
  onChange,
}: Props): JSX.Element {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  return (
    <Form>
      <Box>
        <Label htmlFor="enterprise-search">
          Nom de votre entreprise ou numéro Siret{" "}
          <Mandatory>(obligatoire)</Mandatory>
        </Label>
        <InfoButton
          type="button"
          variant="navLink"
          size="small"
          onClick={() => setIsNoticeVisible(!isNoticeVisible)}
        >
          Qu’est ce qu’un n°siret &nbsp;
          <icons.HelpCircle size="20" aria-label="?" />
        </InfoButton>
        {isNoticeVisible && (
          <Alert variant="secondary">
            <p>
              Le numéro Siret est un <strong>numéro de 14 chiffres</strong>{" "}
              unique pour chaque entreprise. Il est présent sur la{" "}
              <strong>fiche de paie du salarié</strong>.<br />
              Ex : 40123778000127
            </p>
          </Alert>
        )}
        <BlockInput
          placeholder="Ex : Café de la gare ou 40123778000127"
          value={query}
          type="text"
          name="query"
          id="enterprise-search"
          onChange={onChange}
          autoComplete="off"
        />
      </Box>
      <Box>
        <Label htmlFor="enterprise-search-address">Code postal ou ville</Label>
        <BlockInput
          placeholder="Ex : 31000 ou Toulouse "
          value={address}
          type="text"
          name="address"
          id="enterprise-search-address"
          onChange={onChange}
          autoComplete="off"
        />
      </Box>
    </Form>
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
const Form = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Box = styled.div`
  flex: 1;
  & + & {
    padding-left: ${spacings.xmedium};
  }
`;
