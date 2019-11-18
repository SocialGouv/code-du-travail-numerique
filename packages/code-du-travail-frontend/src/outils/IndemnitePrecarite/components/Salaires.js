import React from "react";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";
import { Button, theme } from "@socialgouv/react-ui";
import { CurrencyField } from "../../common/CurrencyField";
import { UID } from "react-uid";

function Salaires({ name, visible = true, onChange }) {
  return (
    <>
      <FieldArray name={name}>
        {({ fields }) => (
          <>
            {visible && (
              <p>
                Indiquez les salaires mensuels bruts perçus pendant le
                contrat&nbsp;*
              </p>
            )}
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
            {visible > 0 && (
              <AddButton
                variant="link"
                onClick={() => fields.push({ salaire: null })}
              >
                Ajouter un salaire
              </AddButton>
            )}
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

const { fonts, spacings } = theme;

const MontantLabel = styled.label`
  margin-right: ${spacings.small};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};
`;
const DelButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin-right: ${spacings.medium};
  font-size: ${fonts.sizes.small};
`;

const AddButton = styled(Button).attrs(() => ({ type: "button" }))`
  margin: ${spacings.medium} 0;
`;
