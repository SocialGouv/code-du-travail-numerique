import React from "react";
import { SectionTitle, Input, InlineError } from "../../stepStyles";
import { Field } from "react-final-form";
import styled from "styled-components";
import { theme } from "@cdt/ui";

import { isNumber } from "../../validators";

function CategoryPeriod() {
  return (
    <>
      <SectionTitle>
        Précisez les périodes éventuelles passées au statut de TAM ou employé
      </SectionTitle>
      <Field name="tamDuration" validate={isNumber}>
        {({ input, meta: { error, touched, invalid } }) => {
          return (
            <VerticalLabel>
              <p>Période passée en tant que TAM ou employé</p>
              <div>
                <Input
                  size="5"
                  min="0"
                  type="number"
                  invalid={touched && invalid}
                  {...input}
                />{" "}
                mois
                {error && touched && invalid && (
                  <ErrorWrapper>
                    <InlineError>{error}</InlineError>
                  </ErrorWrapper>
                )}
              </div>
            </VerticalLabel>
          );
        }}
      </Field>
      <Field
        name="cadreDuration"
        validate={isNumber}
        subscribe={{ error: true, touched: true, dirty: true }}
      >
        {({ input, meta: { error, touched, invalid } }) => {
          return (
            <VerticalLabel>
              <p>Période passée en tant que cadre</p>
              <div>
                <Input
                  size="5"
                  min="0"
                  type="number"
                  invalid={touched && invalid}
                  {...input}
                />{" "}
                mois
                {error && touched && invalid && (
                  <InlineError>{error}</InlineError>
                )}
              </div>
            </VerticalLabel>
          );
        }}
      </Field>
    </>
  );
}

export { CategoryPeriod };
const { spacing } = theme;
const VerticalLabel = styled.label`
  display: flex;
  flex-direction: column;
`;
const ErrorWrapper = styled.div`
  display: inline-block;
  margin-left: ${spacing.interComponent};
`;
