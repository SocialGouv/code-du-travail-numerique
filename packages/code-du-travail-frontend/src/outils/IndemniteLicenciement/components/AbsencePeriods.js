import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Button, theme } from "@socialgouv/react-ui";
import { Input } from "../../common/stepStyles";
import { Error } from "../../common/ErrorField";
import { isNumber } from "../../common/validators";
import { Question } from "../../common/Question";
import { OnChange } from "react-final-form-listeners";

function AbsencePeriods({ name, visible = true, onChange }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          {visible && (
            <>
              <p>
                Les congés maternité, arrêts de travail liés à un accident du
                travail ou une maladie professionnelle, congés individuels de
                formation (Cif) et stage de fin d’étude de plus de 2 mois ne
                sont pas considérés comme des absences. Merci de ne pas les
                renseigner.
              </p>
              <Question as="p">
                Quels sont le motif et la durée de ces absences
                prolongées&nbsp;?
              </Question>
              <Row key={name}>
                <CellHeader as={MotifCell}>Motif</CellHeader>
                <CellHeader as={DurationCell}>Durée (en mois)</CellHeader>
              </Row>
            </>
          )}
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
                        size="7"
                        type="number"
                        invalid={touched && invalid}
                      />
                      <DelButton
                        variant="link"
                        type="button"
                        onClick={() => fields.remove(index)}
                      >
                        Supprimer
                      </DelButton>
                      {error && touched && invalid && <Error>{error}</Error>}
                    </>
                  )}
                />
              </DurationCell>
            </Row>
          ))}
          {visible && (
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
          )}
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

const { fonts, spacings } = theme;

const AddButton = styled(Button)`
  margin: ${spacings.medium} 0;
`;
const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};
`;
const MotifCell = styled.div`
  flex-basis: 25rem;
  margin-right: ${spacings.medium};
`;
const DurationCell = styled.div`
  margin-right: ${spacings.medium};
`;
const CellHeader = styled.div`
  font-weight: 700;
`;

const DelButton = styled(Button)`
  margin-left: ${spacings.medium};
  font-size: ${fonts.sizes.small};
`;

export const motifs = [
  { label: "Absence pour maladie non professionnelle", value: 1.0 },
  { label: "Grève", value: 1.0 },
  { label: "Mise à pied", value: 1.0 },
  { label: "Congé sabbatique", value: 1.0 },
  { label: "Congé pour création d'entreprise", value: 1.0 },
  { label: "Congé de solidarité familiale", value: 1.0 },
  { label: "Congé de solidarité internationale", value: 1.0 },
  { label: "Congé parental d'éducation", value: 0.5 },
  { label: "Congé de proche aidant", value: 1.0 },
  { label: "Congés sans solde", value: 1.0 },
  { label: "Arrêt maladie lié à un accident de trajet", value: 1.0 }
];
