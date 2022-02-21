import { Input, Label, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import styled from "styled-components";

import { InfoBulle } from "../../common/InfoBulle";
import EmbeddedInForm from "../common/EmbeddedInForm";

type Props = {
  embeddedForm: boolean;
  query?: string;
  address?: string;
  onChange: (event: React.ChangeEvent) => void;
  placeholder?: string;
};

export const SearchEnterpriseInput = React.forwardRef(
  function _SearchEnterpriseInput(
    { query = "", address = "", onChange, embeddedForm = true }: Props,
    ref: ForwardedRef<HTMLFormElement>
  ): JSX.Element {
    return (
      <>
        <ParagraphNoMarginBottom fontWeight="600" fontSize="default">
          Précisez et sélectionnez votre entreprise
        </ParagraphNoMarginBottom>

        <EmbeddedInForm
          enable={embeddedForm}
          onSubmit={(event) => event.preventDefault()}
          reference={ref}
        >
          <Flex>
            <Box ref={ref}>
              <InlineLabel htmlFor="enterprise-search">
                Nom de votre entreprise ou numéro Siret{" "}
                <Text fontWeight="400">(obligatoire)</Text>
              </InlineLabel>
              <InfoBulle title={"Qu’est ce qu’un n°siret ?"}>
                <p>
                  Le numéro Siret est un <strong>numéro de 14 chiffres</strong>{" "}
                  unique pour chaque entreprise. Il est présent sur la{" "}
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
          </Flex>
        </EmbeddedInForm>
      </>
    );
  }
);
const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.base};
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const InlineLabel = styled(Label)`
  display: inline;
`;

const ParagraphNoMarginBottom = styled(Paragraph)`
  margin-bottom: 0;
`;

const Box = styled.div`
  flex: 1;

  & + & {
    flex: 0 1 25rem;
    padding-left: ${theme.spacings.xmedium};
    @media (max-width: ${theme.breakpoints.mobile}) {
      padding-top: ${theme.spacings.xmedium};
      padding-left: 0;
    }
    @media (max-width: ${theme.breakpoints.mobile}) {
      flex: 0 1 auto;
    }
  }
`;
