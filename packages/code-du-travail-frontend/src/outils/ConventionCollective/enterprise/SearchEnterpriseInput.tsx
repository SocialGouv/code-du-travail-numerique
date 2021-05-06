import { Input, Label, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { InfoBulle } from "../common/InfoBulle";

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
  return (
    <Form>
      <Box>
        <InlineLabel htmlFor="enterprise-search">
          Nom de votre entreprise ou numéro Siret{" "}
          <Text fontWeight="400">(obligatoire)</Text>
        </InlineLabel>
        <InfoBulle title={"Qu’est ce qu’un n°siret ?"}>
          <p>
            Le numéro Siret est un <strong>numéro de 14 chiffres</strong> unique
            pour chaque entreprise. Il est présent sur la{" "}
            <strong>fiche de paie du salarié</strong>.<br />
            Ex : 40123778000127
          </p>
        </InfoBulle>
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
        <InlineLabel htmlFor="enterprise-search-address">
          Code postal ou ville
        </InlineLabel>
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

const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.base};
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const InlineLabel = styled(Label)`
  display: inline;
  font-weight: 700;
`;

const Box = styled.div`
  flex: 1;
  & + & {
    flex: 0 1 25rem;
    padding-left: ${theme.spacings.xmedium};
  }
`;
