import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Button, theme } from "@cdt/ui";
import { Input } from "../stepStyles";
import { isNumber } from "./validators";

function AbsencePeriods({ name }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          {fields.map((name, index) => (
            <Row key={name}>
              <div>
                <Field name={`${name}.type`} component="select">
                  {motifs.map(({ label }) => (
                    <option key={label}>{label}</option>
                  ))}
                </Field>
              </div>
              <div>
                <Field
                  name={`${name}.duration`}
                  validate={isNumber}
                  subscribe={{ error: true, touched: true }}
                  render={({ input, meta: { touched, error, invalid } }) => (
                    <>
                      <Input {...input} size="5" invalid={touched && invalid} />
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
          <AddButton
            variant="link"
            onClick={() =>
              fields.push({
                type: "Absence pour maladie non professionnelle",
                duration: null
              })
            }
          >
            Ajouter une période
          </AddButton>
        </>
      )}
    </FieldArray>
  );
}
export { AbsencePeriods };
const { colors, fonts, spacing } = theme;

const AddButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin: ${spacing.interComponent} 0;
`;
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${spacing.tiny};
  & > *:nth-child(1) {
    flex-basis: 25rem;
    margin-right: ${spacing.interComponent};
  }
  & > *:nth-child(2) {
    margin-right: ${spacing.interComponent};
  }
`;

const DelButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin-left: ${spacing.interComponent};
  font-size: ${fonts.sizeSmall};
`;

const InlineError = styled.div`
  font-weight: 600;
  color: ${colors.darkerGrey};
`;

export const motifs = [
  { label: "Absence pour maladie non professionnelle", value: 1.0 },
  { label: "Grève", value: 1.0 },
  { label: "Mise à pied", value: 1.0 },
  { label: "Congé sabbatique", value: 1.0 },
  { label: "Congé pour création d'entreprise", value: 1.0 },
  { label: "Congé de solidarité familiale", value: 1.0 },
  { label: "Congé de solidarité internationale", value: 1.0 },
  { label: "Congé parental d'éducation", value: 0.5 }
];
