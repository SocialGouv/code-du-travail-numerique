import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Button, theme } from "@cdt/ui";
import styled from "styled-components";

import { branches } from "../branches";
import { Label, SectionTitle } from "../../common/stepStyles";
import { getIndemniteFromFinalForm } from "../indemnite";
import { IndemniteLegale } from "../components/IndemniteLegale";

function validateCCn(idcc) {
  const selectedBranche = branches.find(branche => branche.value === idcc);
  if (!selectedBranche) {
    return "Cette branche n’est pas encore intégrée.";
  }
}

function StepIndemnite({ form }) {
  const { indemniteLegale, formuleLegale } = getIndemniteFromFinalForm(form);
  return (
    <>
      <IndemniteLegale
        indemniteLegale={indemniteLegale}
        formuleLegale={formuleLegale}
      />
      <SectionTitle>
        Votre convention collective peut prévoir un montant plus important
      </SectionTitle>
      <p>
        Selon la convention collective dont vous dépendez, le montant minimum de
        votre indemnité de licenciement peut être supérieur au montant de
        l’indemnité légale.
      </p>
      <Field
        name="branche"
        subscribe={{ error: true, dirty: true }}
        validate={validateCCn}
      >
        {({ input, meta: { error, dirty } }) => {
          return (
            <>
              <SelectWrapper>
                <Label htmlFor="ccn">
                  Sélectionnez votre convention collective pour en savoir plus :
                </Label>
                <Select {...input} id="ccn">
                  <option disabled value="">
                    Selectionner
                  </option>
                  {branches.map(branche => (
                    <option value={branche.value} key={branche.value}>
                      {branche.label}
                    </option>
                  ))}
                </Select>
                {input.value && input.value.length > 0 && (
                  <CancelButton
                    variant="link"
                    onClick={() => input.onChange("")}
                  >
                    annuler
                  </CancelButton>
                )}
              </SelectWrapper>
              {error && dirty && <span>{error}</span>}
            </>
          );
        }}
      </Field>
    </>
  );
}
StepIndemnite.propTypes = {
  form: PropTypes.object.isRequired
};
export { StepIndemnite };

const { spacing } = theme;

const SelectWrapper = styled.label`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Select = styled.select`
  margin-top: ${spacing.small};
  margin-right: ${spacing.interComponent};
  flex: 1 1 70%;
  min-width: 400px;
`;
const CancelButton = styled(Button)`
  margin: ${spacing.interComponent} 0;
`;
