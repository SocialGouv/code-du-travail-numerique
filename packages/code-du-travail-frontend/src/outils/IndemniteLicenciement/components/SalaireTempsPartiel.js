import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import { Input, Select, icons, theme } from "@socialgouv/react-ui";
import { AddButton, DelButton } from "../../common/Buttons";
import { Error } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { isNumber } from "../../common/validators";

const mobileMediaQuery = `(max-width: ${theme.breakpoints.mobile})`;

function SalaireTempsPartiel({ name, visible = true, onChange }) {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const mqlListener = useCallback(
    e => {
      setHeaderVisible(e.matches);
    },
    [setHeaderVisible]
  );
  useEffect(() => {
    if (window.matchMedia) {
      const mql = window.matchMedia(mobileMediaQuery);
      setHeaderVisible(mql.matches);
      mql.addListener(mqlListener);
      return () => {
        mql.removeListener(mqlListener);
      };
    }
  }, [mqlListener]);

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
              {!isHeaderVisible && (
                <Row>
                  <CellHeader as={CellType}>
                    {" "}
                    Type de durée de travail{" "}
                  </CellHeader>
                  <CellHeader as={CellDuration}>Durée (en mois)</CellHeader>
                  <CellHeader>Rémunération</CellHeader>
                </Row>
              )}
            </>
          )}
          {fields.map((name, index) => (
            <Row key={name}>
              <CellType>
                {isHeaderVisible && (
                  <CellHeader as={CellType}>
                    Type de durée de travail
                  </CellHeader>
                )}
                <Field name={`${name}.type`}>
                  {({ input }) => (
                    <StyledSelect {...input}>
                      {typePeriod.map(item => (
                        <option key={item}>{item}</option>
                      ))}
                    </StyledSelect>
                  )}
                </Field>
              </CellType>
              <CellDuration>
                {isHeaderVisible && (
                  <CellHeader as={CellDuration}>Durée (en mois)</CellHeader>
                )}
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
                      <StyledInput
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
                {isHeaderVisible && <CellHeader>Rémunération</CellHeader>}
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
                      <StyledInput
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
              <DelButton onClick={() => fields.remove(index)}>
                Supprimer
              </DelButton>
            </Row>
          ))}
          {visible && (
            <AddButton
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

const { fonts, spacings } = theme;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};
  @media ${mobileMediaQuery} {
    flex-direction: column;
  }
`;

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
const CellHeader = styled.div`
  padding-top: ${spacings.small};
  padding-bottom: ${spacings.tiny};
  font-weight: 700;
  font-size: ${fonts.sizes.small};
`;
const StyledSelect = styled(Select)`
  @media ${mobileMediaQuery} {
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  @media ${mobileMediaQuery} {
    width: 100%;
  }
`;

export const TEMPS_PLEIN = "Temps plein";
export const TEMPS_PARTIEL = "Temps partiel";
export const typePeriod = [TEMPS_PARTIEL, TEMPS_PLEIN];
