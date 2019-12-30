import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { icons, Input, Table as UITable, theme } from "@socialgouv/react-ui";

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
                          <Input
                            {...input}
                            type="number"
                            id={`salary${index}`}
                            invalid={touched && invalid}
                            icon={icons.Euro}
                          />
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

const { breakpoints } = theme;

const Table = styled(UITable)`
  width: 70%;
  & tr > td:nth-child(2) {
    width: 70%;
    text-align: left;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    & tr > td:nth-child(2) {
      width: 60%;
    }
  }
`;
