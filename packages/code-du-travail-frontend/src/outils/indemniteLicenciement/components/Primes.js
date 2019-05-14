import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";
import { FieldArray } from "react-final-form-arrays";
import { Button, theme } from "@cdt/ui";
import { Input } from "../stepStyles";
import { isNumber } from "./validators";

function Primes({ name }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          <p>
            Primes annuelles ou exceptionnelles perçues au cours des 3 derniers
            mois
          </p>
          {fields.map((name, index) => (
            <Row key={name}>
              <Field
                name={`${name}.prime`}
                validate={isNumber}
                subscribe={{ error: true, touched: true }}
                render={({ input, meta: { touched, error, invalid } }) => (
                  <>
                    <CurrencyWrapper>
                      <NumberInput
                        {...input}
                        size="10"
                        invalid={touched && invalid}
                      />
                      <Currency aria-hidden="true">€</Currency>
                    </CurrencyWrapper>
                    {error && touched && invalid ? (
                      <InlineError>{error}</InlineError>
                    ) : null}
                  </>
                )}
              />
              <DelButton variant="link" onClick={() => fields.remove(index)}>
                Supprimer
              </DelButton>
            </Row>
          ))}
          <AddButton
            variant="link"
            onClick={() => fields.push({ prime: null })}
          >
            Ajouter une prime
          </AddButton>
        </>
      )}
    </FieldArray>
  );
}

export { Primes };

const { colors, fonts, spacing } = theme;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${spacing.tiny};
`;

const NumberInput = styled(Input)`
  text-align: right;
  padding-right: ${spacing.base};
`;

const CurrencyWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Currency = styled.span`
  color: ${colors.grey};
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
`;
const DelButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin-left: ${spacing.interComponent};
  font-size: ${fonts.sizeSmall};
`;
const InlineError = styled.span`
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
  color: ${colors.darkerGrey};
`;

const AddButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin: ${spacing.interComponent} 0;
`;
