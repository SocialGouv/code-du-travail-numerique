import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import { Input, Select, Text, icons, theme } from "@socialgouv/react-ui";
import { AddButton, DelButton } from "../../common/Buttons";
import { Error } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { isNumber } from "../../common/validators";
import {
  Row,
  MobileOnlyCell,
  DesktopOnly,
  CellHeader,
} from "../../common/stepStyles";

const mobileMediaQuery = `(max-width: ${theme.breakpoints.mobile})`;

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
              <Row as={DesktopOnly}>
                <CellHeader as={CellType}>Type de durée de travail</CellHeader>
                <CellHeader as={CellDuration}>Durée (en mois)</CellHeader>
                <CellHeader>Rémunération</CellHeader>
              </Row>
            </>
          )}
          {fields.map((name, index) => (
            <Row key={name}>
              <MobileOnlyCell>
                <Text variant="secondary" fontSize="hsmall">
                  Période {index + 1}
                </Text>
                <DelButton small onClick={() => fields.remove(index)}>
                  Supprimer
                </DelButton>
              </MobileOnlyCell>
              <CellType>
                <CellHeader as={MobileOnlyCell}>
                  Type de durée de travail
                </CellHeader>
                <Field name={`${name}.type`}>
                  {({ input }) => (
                    <Select {...input}>
                      {typePeriod.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </Select>
                  )}
                </Field>
              </CellType>
              <CellDuration>
                <CellHeader as={MobileOnlyCell}>Durée (en mois)</CellHeader>
                <Field
                  name={`${name}.duration`}
                  validate={isNumber}
                  subscription={{
                    value: true,
                    error: true,
                    touched: true,
                    invalid: true,
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
                <CellHeader as={MobileOnlyCell}>Rémunération</CellHeader>
                <Field
                  name={`${name}.salary`}
                  validate={isNumber}
                  subscription={{
                    value: true,
                    error: true,
                    touched: true,
                    invalid: true,
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
              <DesktopOnly>
                <DelButton onClick={() => fields.remove(index)}>
                  Supprimer
                </DelButton>
              </DesktopOnly>
            </Row>
          ))}
          {visible && (
            <AddButton
              onClick={() =>
                fields.push({
                  type: TEMPS_PARTIEL,
                  duration: null,
                  salary: null,
                })
              }
            >
              Ajouter une période
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
export { SalaireTempsPartiel };

const { spacings } = theme;

const CellType = styled.div`
  flex-basis: 20rem;
  margin-right: ${spacings.medium};
  @media ${mobileMediaQuery} {
    flex-basis: 100%;
    margin-right: 0;
  }
`;
const CellDuration = styled.div`
  flex-basis: 15rem;
  margin-right: ${spacings.medium};
  @media ${mobileMediaQuery} {
    flex-basis: 100%;
    margin-right: 0;
  }
`;
const CellRemuneration = styled.div`
  flex-basis: 20rem;
  @media ${mobileMediaQuery} {
    flex-basis: 100%;
  }
`;

export const TEMPS_PLEIN = "Temps plein";
export const TEMPS_PARTIEL = "Temps partiel";
export const typePeriod = [TEMPS_PARTIEL, TEMPS_PLEIN];
