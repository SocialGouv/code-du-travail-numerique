import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Input, Select, theme } from "@socialgouv/react-ui";
import { Error } from "../../common/ErrorField";
import { isNumber } from "../../common/validators";
import { AddButton, DelButton } from "../../common/Buttons";
import { Question } from "../../common/Question";
import { OnChange } from "react-final-form-listeners";

const mobileMediaQuery = `(max-width: ${theme.breakpoints.mobile})`;

function AbsencePeriods({ name, visible = true, onChange }) {
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
              <p>
                Les congés payés, le congé de maternité ou d&apos;adoption, le
                congé de présence parental ,l&apos;arrêt de travail lié à un
                accident du travail ou une maladie professionnelle, le congé
                individuel de formation (CIF), le congé de solidarité
                internationale, le congé de solidarité familiale et le stage de
                fin d&apos;étude de plus de 2 mois sont déjà prises en compte
                dans l&apos;ancienneté et ne sont pas des périodes à renseigner
                ci-après :
              </p>
              <Question as="p">
                Quels sont le motif et la durée de ces absences
                prolongées&nbsp;?
              </Question>
              {!isHeaderVisible && (
                <Row key={name}>
                  <CellHeader as={MotifCell}>Motif</CellHeader>
                  <CellHeader as={DurationCell}>Durée (en mois)</CellHeader>
                </Row>
              )}
            </>
          )}
          {fields.map((name, index) => (
            <Row key={name}>
              <MotifCell>
                {isHeaderVisible && (
                  <CellHeader as={MotifCell}>Motif</CellHeader>
                )}
                <Field name={`${name}.type`} component={StyledSelect}>
                  {motifs.map(({ label }) => (
                    <option key={label}>{label}</option>
                  ))}
                </Field>
              </MotifCell>
              <DurationCell>
                {isHeaderVisible && (
                  <CellHeader as={DurationCell}>Durée (en mois)</CellHeader>
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
                      {error && touched && invalid && <Error>{error}</Error>}
                    </>
                  )}
                />
              </DurationCell>
              <DelButton onClick={() => fields.remove(index)}>
                Supprimer
              </DelButton>
            </Row>
          ))}
          {visible && (
            <AddButton
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

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};
  @media ${mobileMediaQuery} {
    flex-direction: column;
  }
`;
const MotifCell = styled.div`
  flex: 0 1 35rem;
  margin-right: ${spacings.medium};
  @media ${mobileMediaQuery} {
    flex-basis: 100%;
    margin-right: 0;
  }
`;
const DurationCell = styled.div`
  margin-right: ${spacings.medium};
  @media ${mobileMediaQuery} {
    flex-basis: 100%;
    margin-right: 0;
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

export const motifs = [
  { label: "Absence pour maladie non professionnelle", value: 1.0 },
  { label: "Arrêt maladie lié à un accident de trajet", value: 1.0 },
  { label: "Congé sabbatique", value: 1.0 },
  { label: "Congé pour création d'entreprise", value: 1.0 },
  { label: "Congé parental d'éducation", value: 0.5 },
  { label: "Congés sans solde", value: 1.0 },
  { label: "Grève", value: 1.0 },
  { label: "Mise à pied", value: 1.0 },
  { label: "Maladie d'origine non professionnelle", value: 1.0 },
  { label: "Congé de paternité", value: 1.0 }
];
