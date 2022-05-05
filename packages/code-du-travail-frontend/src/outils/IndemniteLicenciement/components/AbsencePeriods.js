import { Input, Label, Select, Text, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field, useForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import { AddButton, DelButton } from "../../common/Buttons";
import { Error } from "../../common/ErrorField";
import { MultiFieldRow } from "../../common/MultiFieldRow";
import { Question } from "../../common/Question";
import { isNumber } from "../../common/validators";

export const MOTIFS = [
  { label: "Absence pour maladie non professionnelle", value: 1.0 },
  { label: "Arrêt maladie lié à un accident de trajet", value: 1.0 },
  { label: "Congé sabbatique", value: 1.0 },
  { label: "Congé pour création d'entreprise", value: 1.0 },
  { label: "Congé parental d'éducation", value: 0.5 },
  { label: "Congés sans solde", value: 1.0 },
  { label: "Grève", value: 1.0 },
  { label: "Mise à pied", value: 1.0 },
  { label: "Maladie d'origine non professionnelle", value: 1.0 },
  { label: "Congé de paternité", value: 1.0 },
];

export const AbsencePeriods = ({ name }) => {
  const form = useForm();

  return (
    <FieldArray name={name}>
      {({ fields }) =>
        fields.length > 0 && (
          <>
            <p>
              Les congés payés, le congé de maternité ou d&apos;adoption, le
              congé de présence parental ,l&apos;arrêt de travail lié à un
              accident du travail ou une maladie professionnelle, le congé
              individuel de formation (CIF), le congé de solidarité
              internationale, le congé de solidarité familiale et le stage de
              fin d&apos;étude de plus de 2 mois sont déjà prises en compte dans
              l&apos;ancienneté et ne sont pas des périodes à renseigner
              ci-après :
            </p>
            <Question>
              Quels sont le motif et la durée de ces absences prolongées&nbsp;?
            </Question>
            {fields.map((name, index) => (
              <RelativeDiv key={name}>
                <RowTitle>
                  <Text
                    variant="secondary"
                    fontSize="hsmall"
                    role="heading"
                    aria-level="2"
                  >
                    Absence {index + 1}
                  </Text>
                </RowTitle>
                <MultiFieldRow
                  gridRows={["auto", "auto"]}
                  gridColumns={["2fr", "1fr", "13rem"]}
                  emptyCells={[5]}
                >
                  <Label htmlFor={`${name}.type`}>Motif</Label>
                  <FieldWrapper>
                    <Field
                      name={`${name}.type`}
                      id={`${name}.type`}
                      component={StyledSelect}
                      onChange={(e) => {
                        const value = e.target.value;
                        const absencePeriods =
                          form.getState().values.absencePeriods;
                        fields.forEach((field, index) => {
                          if (field === name && absencePeriods[index]) {
                            fields.update(index, {
                              type: value,
                              duration: absencePeriods[index]?.duration ?? null,
                            });
                          }
                        });
                      }}
                    >
                      {MOTIFS.map(({ label }) => (
                        <option
                          key={label}
                          selected={
                            form.getState().values.absencePeriods?.[index]
                              ?.type === label
                          }
                        >
                          {label}
                        </option>
                      ))}
                    </Field>
                  </FieldWrapper>
                  <Label htmlFor={`${name}.duration`}>Durée (en mois)</Label>
                  <div>
                    <Field
                      name={`${name}.duration`}
                      validate={isNumber}
                      subscription={{
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
                            id={`${name}.duration`}
                            type="number"
                            invalid={touched && invalid}
                          />
                          {error && touched && invalid && (
                            <StyledError>{error}</StyledError>
                          )}
                        </>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <StyledDelButton onClick={() => fields.remove(index)}>
                      Supprimer
                    </StyledDelButton>
                  )}
                </MultiFieldRow>
              </RelativeDiv>
            ))}
            <AddButton
              onClick={() =>
                fields.push({
                  duration: null,
                  type: "Absence pour maladie non professionnelle",
                })
              }
            >
              Ajouter une absence
            </AddButton>
          </>
        )
      }
    </FieldArray>
  );
};

AbsencePeriods.propTypes = {
  name: PropTypes.string.isRequired,
};

const { breakpoints, spacings } = theme;

const RelativeDiv = styled.div`
  position: relative;
`;

const RowTitle = styled.div`
  margin-bottom: ${spacings.base};
  padding-top: ${spacings.small};
`;

const StyledSelect = styled(Select)`
  display: flex;
`;

const FieldWrapper = styled.div`
  margin-right: ${spacings.base};
  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0;
    margin-bottom: ${spacings.base};
  }
`;

const StyledError = styled(Error)`
  margin-bottom: 0;
`;

const StyledDelButton = styled(DelButton)`
  margin-top: ${spacings.xsmall};
  @media (max-width: ${breakpoints.mobile}) {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0;
  }
`;
