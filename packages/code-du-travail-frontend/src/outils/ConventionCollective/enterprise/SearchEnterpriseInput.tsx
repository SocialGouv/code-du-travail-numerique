import {
  Input,
  Label,
  Paragraph,
  Section as SectionUi,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import styled, { css } from "styled-components";

import { InfoBulle } from "../../common/InfoBulle";
import { SectionTitle } from "../../common/stepStyles";
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
      <Section>
        {embeddedForm ? (
          <SectionTitle>Précisez et sélectionnez votre entreprise</SectionTitle>
        ) : (
          <ParagraphNoMarginBottom fontWeight="600" fontSize="default">
            Précisez et sélectionnez votre entreprise
          </ParagraphNoMarginBottom>
        )}
        <EmbeddedInForm
          enable={embeddedForm}
          onSubmit={(event) => event.preventDefault()}
          reference={ref}
        >
          <Flex>
            <Box ref={ref}>
              <BlockLabel
                htmlFor="enterprise-search"
                embeddedForm={embeddedForm}
              >
                Nom de votre entreprise ou numéro Siret{" "}
                <Text fontWeight="400">(obligatoire)</Text>
                <InfoBulle title={"Qu’est ce qu’un n°siret ?"}>
                  <p>
                    Le numéro Siret est un{" "}
                    <strong>numéro de 14 chiffres</strong> unique pour chaque
                    entreprise. Il est présent sur la{" "}
                    <strong>fiche de paie du salarié</strong>.<br />
                    Ex : 40123778000127
                  </p>
                </InfoBulle>
              </BlockLabel>

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
              <BlockLabel
                htmlFor="enterprise-search-address"
                embeddedForm={embeddedForm}
              >
                Code postal ou ville
              </BlockLabel>
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
      </Section>
    );
  }
);

const Section = styled(SectionUi)`
  padding-top: 0;
`;

const ParagraphNoMarginBottom = styled(Paragraph)`
  margin-bottom: 0;
`;

const BlockInput = styled(Input)`
  padding-top: ${theme.spacings.small};
  width: 100%;
`;

const BlockLabel = styled(Label)`
  display: block;
  padding-bottom: 0;
  ${(props) => {
    if (!props.embeddedForm) {
      return css`
        font-weight: 400;
      `;
    }
  }}
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
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
