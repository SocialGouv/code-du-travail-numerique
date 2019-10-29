import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import styled from "styled-components";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import { Button, theme } from "@socialgouv/react-ui";
import { Input } from "../../common/stepStyles";
import { InlineError } from "../../common/ErrorField";
import { isNumber } from "../../common/validators";

function Primes({ name, visible = true, onChange }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          {visible && (
            <p>
              Primes annuelles ou exceptionnelles perçues au cours des 3
              derniers mois
            </p>
          )}
          {fields.map((name, index) => (
            <Row key={name}>
              <Field
                name={`${name}.prime`}
                validate={isNumber}
                subscription={{
                  value: true,
                  error: true,
                  touched: true,
                  invalid: true
                }}
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
          {visible && (
            <AddButton
              variant="link"
              onClick={() => fields.push({ prime: null })}
            >
              Ajouter une prime
            </AddButton>
          )}
          {onChange && (
            <OnChange name={name}>{values => onChange(values)}</OnChange>
          )}
        </>
      )}
    </FieldArray>
  );
}
Primes.propTypes = {
  name: PropTypes.string.isRequired
};
export { Primes };

const { colors, fonts, spacing } = theme;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${spacing.tiny};
`;

const NumberInput = styled(Input)`
  padding-right: ${spacing.base};
  text-align: right;
`;

const CurrencyWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: ${spacing.interComponent};
`;

const Currency = styled.span`
  position: absolute;
  top: 50%;
  right: 0.25rem;
  color: ${colors.grey};
  transform: translateY(-50%);
`;
const DelButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin-left: ${spacing.interComponent};
  font-size: ${fonts.sizeSmall};
`;

const AddButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin: ${spacing.interComponent} 0;
`;
