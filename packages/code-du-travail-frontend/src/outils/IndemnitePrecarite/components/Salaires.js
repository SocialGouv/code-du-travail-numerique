import React from "react";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";
import { CurrencyField } from "../../common/CurrencyField";
import { AddButton, DelButton } from "../../common/Buttons";
import { UID } from "react-uid";
import { Question } from "../../common/Question";

function Salaires({ name, visible = true, onChange }) {
  return (
    <>
      <FieldArray name={name}>
        {({ fields }) => (
          <>
            {visible && (
              <Question required>
                Quels sont les salaires mensuels bruts perçus durant le contrat
                de travail&nbsp;?
              </Question>
            )}
            {fields.map((name, index) => (
              <Row key={index}>
                <UID>
                  {(uid) => (
                    <>
                      <MontantLabel htmlFor={uid}>Montant&nbsp;:</MontantLabel>
                      <CurrencyField name={`${name}.salaire`} id={uid}>
                        <StyledDelButton onClick={() => fields.remove(index)}>
                          Supprimer
                        </StyledDelButton>
                      </CurrencyField>
                    </>
                  )}
                </UID>
              </Row>
            ))}
            {visible > 0 && (
              <AddButton onClick={() => fields.push({ salaire: null })}>
                Ajouter un salaire
              </AddButton>
            )}
            {onChange && (
              <OnChange name={name}>{(values) => onChange(values)}</OnChange>
            )}
          </>
        )}
      </FieldArray>
    </>
  );
}

export { Salaires };

const { spacings, breakpoints } = theme;

const MontantLabel = styled.label`
  display: inline-block;
  flex: 0 1 auto;
  margin-right: ${spacings.small};
`;
const StyledDelButton = styled(DelButton)`
  @media (max-width: ${breakpoints.mobile}) {
    align-self: center;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
