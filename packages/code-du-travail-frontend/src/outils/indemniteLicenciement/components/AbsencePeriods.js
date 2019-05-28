import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Button, theme } from "@cdt/ui";
import { Input } from "../stepStyles";
import { isNumber } from "../validators";
import { OnChange } from "react-final-form-listeners";

function AbsencePeriods({ name, onChange }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          <p>
            Les congés maternité, arrêts de travail liés à une maladie
            professionnelle, congés individuel de formation (Cif) et stage de
            fin d’étude de plus de 2 mois ne sont pas considérés comme des
            absences. Merci de ne pas les renseigner.
          </p>
          <Row key={name}>
            <CellHeader as={MotifCell}>Motif</CellHeader>
            <CellHeader as={DurationCell}>Durée (en mois)</CellHeader>
          </Row>
          {fields.map((name, index) => (
            <Row key={name}>
              <MotifCell>
                <Field name={`${name}.type`} component="select">
                  {motifs.map(({ label }) => (
                    <option key={label}>{label}</option>
                  ))}
                </Field>
              </MotifCell>
              <DurationCell>
                <Field
                  name={`${name}.duration`}
                  validate={isNumber}
                  subscribe={{ error: true, touched: true }}
                  render={({ input, meta: { touched, error, invalid } }) => (
                    <>
                      <Input {...input} size="7" invalid={touched && invalid} />
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
              </DurationCell>
            </Row>
          ))}
          <AddButton
            variant="link"
            type="button"
            onClick={() =>
              fields.push({
                type: "Absence pour maladie non professionnelle",
                duration: null
              })
            }
          >
            Ajouter une période
          </AddButton>
          {onChange && (
            <OnChange name={name}>
              {values => {
                onChange(values);
              }}
            </OnChange>
          )}
        </>
      )}
    </FieldArray>
  );
}

AbsencePeriods.propTypes = {
  name: PropTypes.string.isRequired
};
export { AbsencePeriods };
const { colors, fonts, spacing } = theme;

const AddButton = styled(Button)`
  margin: ${spacing.interComponent} 0;
`;
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${spacing.tiny};
`;
const MotifCell = styled.div`
  flex-basis: 25rem;
  margin-right: ${spacing.interComponent};
`;
const DurationCell = styled.div`
  margin-right: ${spacing.interComponent};
`;
const CellHeader = styled.div`
  font-weight: 700;
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
