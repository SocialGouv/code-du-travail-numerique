import React from "react";
import { SectionTitle, Input, InlineError } from "../../../common/stepStyles";
import { Field } from "react-final-form";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";

import { isNumber } from "../../../common/validators";

function CategoriePeriod() {
  return (
    <>
      <SectionTitle>
        Précisez les périodes éventuelles passées au statut de TAM ou employé
      </SectionTitle>
      <Field
        name="tamDuration"
        validate={isNumber}
        subscription={{
          value: true,
          error: true,
          touched: true,
          invalid: true
        }}
      >
        {({ input, meta: { error, touched, invalid } }) => {
          return (
            <VerticalLabel>
              <p>Période passée en tant que TAM ou employé</p>
              <div>
                <Input
                  {...input}
                  size="5"
                  min="0"
                  type="number"
                  invalid={touched && invalid}
                />{" "}
                mois
                {error && touched && (
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
        subscription={{
          value: true,
          error: true,
          touched: true,
          invalid: true
        }}
      >
        {({ input, meta: { error, touched, invalid } }) => {
          return (
            <VerticalLabel>
              <p>Période passée en tant que cadre</p>
              <div>
                <Input
                  {...input}
                  size="5"
                  min="0"
                  type="number"
                  invalid={touched && invalid}
                />{" "}
                mois
                {error && touched && <InlineError>{error}</InlineError>}
              </div>
            </VerticalLabel>
          );
        }}
      </Field>
    </>
  );
}

export { CategoriePeriod };
const { spacing } = theme;
const VerticalLabel = styled.label`
  display: flex;
  flex-direction: column;
`;
const ErrorWrapper = styled.div`
  display: inline-block;
  margin-left: ${spacing.interComponent};
`;
