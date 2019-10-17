import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import { Button, theme } from "@socialgouv/react-ui";
import { Input, InlineError, SectionTitle } from "../../common/stepStyles";
import { isNumber } from "../../common/validators";

function SalaireTempsPartiel({ name, visible = true, onChange }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          {visible && (
            <>
              <SectionTitle>Périodes de travail</SectionTitle>
              <p>Renseigner vos différentes périodes de travail</p>
              <Row>
                <CellHeader as={CellType}>Type de contrat</CellHeader>
                <CellHeader as={CellDuration}>Durée en mois</CellHeader>
                <CellHeader>Rémunération</CellHeader>
              </Row>
            </>
          )}
          {fields.map((name, index) => (
            <Row key={name}>
              <CellType>
                <Field name={`${name}.type`}>
                  {({ input }) => (
                    <Select {...input}>
                      {typePeriod.map(item => (
                        <option key={item}>{item}</option>
                      ))}
                    </Select>
                  )}
                </Field>
              </CellType>
              <CellDuration>
                <Field
                  name={`${name}.duration`}
                  validate={isNumber}
                  subscription={{
                    value: true,
                    error: true,
                    touched: true,
                    invalid: true
                  }}
                  render={({ input, meta: { touched, error, invalid } }) => (
                    <>
                      <NumberInput
                        {...input}
                        size="8"
                        type="number"
                        invalid={touched && invalid}
                      />
                      {error && touched && invalid ? (
                        <InlineError>{error}</InlineError>
                      ) : null}
                    </>
                  )}
                />
              </CellDuration>
              <div>
                <Field
                  name={`${name}.salary`}
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
                          type="number"
                          invalid={touched && invalid}
                        />
                        <Currency aria-hidden="true">€</Currency>
                      </CurrencyWrapper>

                      <DelButton
                        variant="link"
                        onClick={() => fields.remove(index)}
                      >
                        Supprimer
                      </DelButton>
                      {error && touched && invalid ? (
                        <InlineError>{error}</InlineError>
                      ) : null}
                    </>
                  )}
                />
              </div>
            </Row>
          ))}
          {visible && (
            <AddButton
              variant="link"
              type="button"
              onClick={() =>
                fields.push({
                  type: TEMPS_PARTIEL,
                  duration: null,
                  salary: null
                })
              }
            >
              Ajouter une période
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
export { SalaireTempsPartiel };

const { colors, fonts, spacing } = theme;

const AddButton = styled(Button)`
  margin: ${spacing.interComponent} 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${spacing.tiny};
`;

const CellType = styled.div`
  flex-basis: 15rem;
  margin-right: ${spacing.interComponent};
`;
const CellDuration = styled.div`
  flex-basis: 8rem;
  margin-right: ${spacing.interComponent};
`;
const CellHeader = styled.div`
  font-weight: 700;
`;

const Select = styled.select`
  width: 100%;
`;
const NumberInput = styled(Input)`
  padding-right: ${spacing.base};
  text-align: right;
`;

const CurrencyWrapper = styled.div`
  position: relative;
  display: inline-block;
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

export const TEMPS_PLEIN = "Temps plein";
export const TEMPS_PARTIEL = "Temps partiel";
export const typePeriod = [TEMPS_PARTIEL, TEMPS_PLEIN];
