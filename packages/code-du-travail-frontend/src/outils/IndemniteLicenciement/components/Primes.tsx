import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { AddButton, DelButton } from "../../common/Buttons";
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
                  error: true,
                  invalid: true,
                  touched: true,
                  value: true,
                }}
                render={({ input, meta: { touched, error, invalid } }) => (
                  <div>
                    <Input
                      {...input}
                      type="number"
                      invalid={touched && invalid}
                      icon={icons.Euro}
                    />
                    {error && touched && invalid ? (
                      <InlineError>{error}</InlineError>
                    ) : null}
                  </div>
                )}
              />
              <StyledDelButton onClick={() => fields.remove(index)}>
                Supprimer
              </StyledDelButton>
            </Row>
          ))}
          {visible && (
            <AddButton onClick={() => fields.push({ prime: null })}>
              Ajouter une prime
            </AddButton>
          )}
          {onChange && (
            <OnChange name={name}>{(values) => onChange(values)}</OnChange>
          )}
        </>
      )}
    </FieldArray>
  );
}
Primes.propTypes = {
  name: PropTypes.string.isRequired,
};
export { Primes };

const { spacings } = theme;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};
`;

const StyledDelButton = styled(DelButton)`
  margin-left: ${spacings.base};
`;
