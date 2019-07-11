import React from "react";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";
import { Button, theme } from "@cdt/ui";
import { CurrencyField } from "../../common/CurrencyField";
import { UID } from "react-uid";

function Salaires({ name, onChange }) {
  return (
    <>
      <FieldArray name={name}>
        {({ fields }) => (
          <>
            <p>
              Indiquez vos salaires bruts perçus pendant votre contrat&nbsp;*
            </p>
            {fields.map((name, index) => (
              <Row key={index}>
                <UID>
                  {uid => (
                    <>
                      <MontantLabel htmlFor={uid}>Montant :</MontantLabel>
                      <CurrencyField name={`${name}.salaire`} id={uid}>
                        <DelButton
                          variant="link"
                          onClick={() => fields.remove(index)}
                        >
                          Supprimer
                        </DelButton>
                      </CurrencyField>
                    </>
                  )}
                </UID>
              </Row>
            ))}
            <AddButton
              variant="link"
              onClick={() => fields.push({ salaire: null })}
            >
              Ajouter un salaire
            </AddButton>
            {onChange && (
              <OnChange name={name}>{values => onChange(values)}</OnChange>
            )}
          </>
        )}
      </FieldArray>
    </>
  );
}

export { Salaires };

const { fonts, spacing } = theme;

const MontantLabel = styled.label`
  margin-right: ${spacing.small};
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${spacing.tiny};
`;
const DelButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin-right: ${spacing.interComponent};
  font-size: ${fonts.sizeSmall};
`;

const AddButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin: ${spacing.interComponent} 0;
`;
