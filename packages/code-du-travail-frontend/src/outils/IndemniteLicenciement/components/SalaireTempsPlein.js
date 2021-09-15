import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import { InlineError } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { SmallText } from "../../common/stepStyles";
import { isNumber } from "../../common/validators";

function SalaireTempsPlein({ name }) {
  return (
    <FieldArray name={name}>
      {({ fields }) =>
        fields.length > 0 && (
          <Table>
            <Caption>
              <Question required as="p">
                Salaire mensuel brut
              </Question>
              <SmallText>
                Prendre en compte les primes et avantages en nature.
              </SmallText>
            </Caption>
            <thead>
              <tr>
                <Th>Mois</Th>
                <Th>Salaire mensuel brut</Th>
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
                      format={(value) => {
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
                        blur: true,
                        error: true,
                        invalid: true,
                        touched: true,
                        value: true,
                      }}
                      render={({
                        input,
                        meta: { touched, error, invalid },
                      }) => (
                        <>
                          <Input
                            {...input}
                            title={`Salaire mensuel brut pour le mois ${
                              index + 1
                            } (prendre en compte les primes et avantages en nature)`}
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
  name: PropTypes.string.isRequired,
};

export { SalaireTempsPlein };

const { fonts, breakpoints } = theme;

const Table = styled.table`
  width: 100%;
  text-align: left;
  & tr > td:nth-child(2) {
    width: 80%;
    text-align: left;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    & tr > td:nth-child(2) {
      width: 60%;
    }
  }
`;

const Caption = styled.caption`
  text-align: left;
`;

const Th = styled.th`
  font-size: ${fonts.sizes.small};
`;
