import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme, Button } from "@cdt/ui";

import { SectionTitle, Label } from "../../common/stepStyles";
import { branches } from "../branches";

function StepInformations() {
  return (
    <>
      <SectionTitle>Quelle est votre convention collective&nbsp;?</SectionTitle>
      <Field name="branche" subscribe={{ error: true, dirty: true }}>
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
                  {Object.entries(branches).map(([key, label]) => (
                    <option value={key} key={key}>
                      {label}
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

export { StepInformations };

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
