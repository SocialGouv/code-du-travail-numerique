import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { Table as UITable, theme } from "@cdt/ui";

import { Input, InlineError } from "../../common/stepStyles";
import { isNumber } from "../../common/validators";

function SalaireTempsPlein({ name }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
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
                            fields.value[fieldIndex].salary =
                              parseFloat(value) || null;
                          }
                        });
                        return parseFloat(value) || null;
                      }}
                      subscribe={{ blur: true, error: true, touched: true }}
                      render={({
                        input,
                        meta: { touched, error, invalid }
                      }) => (
                        <>
                          <CurrencyWrapper>
                            <NumberInput
                              {...input}
                              size="10"
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
        </>
      )}
    </FieldArray>
  );
}

SalaireTempsPlein.propTypes = {
  name: PropTypes.string.isRequired
};

export { SalaireTempsPlein };

const { colors, spacing } = theme;

const Table = styled(UITable)`
  & tr > td:nth-child(2) {
    text-align: left;
    width: 70%;
  }
`;
const NumberInput = styled(Input)`
  text-align: right;
  padding-right: ${spacing.base};
`;

const CurrencyWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-right: ${spacing.interComponent};
`;

const Currency = styled.span`
  color: ${colors.grey};
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
`;
