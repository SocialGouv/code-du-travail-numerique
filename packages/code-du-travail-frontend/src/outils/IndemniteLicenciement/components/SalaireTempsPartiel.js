import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import { Button, icons, Input, Select, theme } from "@socialgouv/react-ui";
import { Error } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { isNumber } from "../../common/validators";

function SalaireTempsPartiel({ name, visible = true, onChange }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          {visible && (
            <>
              <Question>
                Quels ont été les durées et les salaires des périodes à temps
                plein et à temps partiel&nbsp;?
              </Question>
              <Row>
                <CellHeader as={CellType}>Type de durée de travail</CellHeader>
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
                      <Input
                        {...input}
                        type="number"
                        invalid={touched && invalid}
                      />
                      {error && touched && invalid ? (
                        <Error>{error}</Error>
                      ) : null}
                    </>
                  )}
                />
              </CellDuration>
              <CellRemuneration>
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
                      <Input
                        {...input}
                        type="number"
                        invalid={touched && invalid}
                        icon={icons.Euro}
                      />
                      {error && touched && invalid ? (
                        <Error>{error}</Error>
                      ) : null}
                    </>
                  )}
                />
              </CellRemuneration>
              <DelButton variant="flat" onClick={() => fields.remove(index)}>
                Supprimer
              </DelButton>
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

const { spacings } = theme;

const AddButton = styled(Button)`
  margin: ${spacings.medium} 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};
`;

const CellType = styled.div`
  flex-basis: 20rem;
  margin-right: ${spacings.medium};
`;
const CellDuration = styled.div`
  flex-basis: 15rem;
  margin-right: ${spacings.medium};
`;
const CellRemuneration = styled.div`
  flex-basis: 20rem;
`;
const CellHeader = styled.div`
  font-weight: 700;
`;

const DelButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin-left: ${spacings.medium};
`;

export const TEMPS_PLEIN = "Temps plein";
export const TEMPS_PARTIEL = "Temps partiel";
export const typePeriod = [TEMPS_PARTIEL, TEMPS_PLEIN];
