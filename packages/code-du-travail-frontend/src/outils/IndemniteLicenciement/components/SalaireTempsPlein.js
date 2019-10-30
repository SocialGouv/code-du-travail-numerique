import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { Table as UITable, theme } from "@socialgouv/react-ui";

import { Input } from "../../common/stepStyles";
import { InlineError } from "../../common/ErrorField";
import { isNumber } from "../../common/validators";

function SalaireTempsPlein({ name }) {
  return (
    <FieldArray name={name}>
      {({ fields }) =>
        fields.length > 0 && (
          <Table>
            <caption>
              Salaire mensuel brut (prendre en compte les primes et avantages en
              nature)
            </caption>
            <thead>
              <tr>
                <th>Mois</th>
                <th>Salaire mensuel brut</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((name, index) => (
                <tr key={name}>
                  <td>
                    <label htmlFor={`salary${index}`}>
                      {fields.value[index].label}
                    </label>
                  </td>
                  <td>
                    <Field
                      name={`${name}.salary`}
                      validate={isNumber}
                      formatOnBlur
                      format={value => {
                        // Hack auto fill
                        fields.value.forEach((field, fieldIndex) => {
                          if (
                            fieldIndex > index &&
                            fields.value[fieldIndex].salary === null
                          ) {
                            fields.value[fieldIndex].salary = isFinite(value)
                              ? parseFloat(value)
                              : null;
                          }
                        });
                        return isFinite(value) ? parseFloat(value) : null;
                      }}
                      subscription={{
                        value: true,
                        error: true,
                        touched: true,
                        invalid: true,
                        blur: true
                      }}
                      render={({
                        input,
                        meta: { touched, error, invalid }
                      }) => (
                        <>
                          <CurrencyWrapper>
                            <NumberInput
                              {...input}
                              size="10"
                              type="number"
                              id={`salary${index}`}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      }
    </FieldArray>
  );
}

SalaireTempsPlein.propTypes = {
  name: PropTypes.string.isRequired
};

export { SalaireTempsPlein };

const { colors, spacing } = theme;

const Table = styled(UITable)`
  width: 70%;
  & tr > td:nth-child(2) {
    width: 70%;
    text-align: left;
  }
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
