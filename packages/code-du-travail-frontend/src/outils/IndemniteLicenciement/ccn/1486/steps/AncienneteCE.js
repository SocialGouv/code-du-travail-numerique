import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@cdt/ui";

import {
  InlineError,
  Input,
  Label,
  SectionTitle
} from "../../../../common/stepStyles";
import { isNumber } from "../../../../common/validators";

export const ANCIENNETE_CE_KEY = "brancheAncienneteCE";
export const ANCIENNETE_CE_ENQUETEUR_KEY = "brancheAncienneteEnqueteur";

export const AncienneteCE = () => {
  return (
    <>
      <SectionTitle>Activité exclusive et régulière</SectionTitle>
      <p>
        Renseignez la durée pendant laquelle le salarié a exercé une activité
        exclusive et régulière pour le compte de la société.
      </p>

      <Field
        name={ANCIENNETE_CE_KEY}
        validate={isNumber}
        render={({ input, meta: { error, invalid, touched } }) => (
          <>
            <StyledLabel htmlFor="ancienneteCE">Durée (en mois):</StyledLabel>
            <Input
              {...input}
              id="ancienneteCE"
              type="number"
              size="7"
              invalid={touched && invalid}
            />
            {error && touched && <StyledInlineError>{error}</StyledInlineError>}
          </>
        )}
      />
      <SectionTitle>Activité supplémentaire</SectionTitle>
      <p>
        Renseignez le nombre d’années pendant lesquelles le salarié a perçu au
        moins 11 bulletins de salaire sur 12 et au moins 3 fois la valeur du
        SMIC.
      </p>
      <Field
        name={ANCIENNETE_CE_ENQUETEUR_KEY}
        validate={isNumber}
        defaultValue={0}
        render={({ input, meta: { error, invalid, touched } }) => (
          <>
            <StyledLabel htmlFor="ancienneteEnqueteur">
              Total (en années):
            </StyledLabel>
            <Input
              {...input}
              id="ancienneteEnqueteur"
              type="number"
              size="7"
              invalid={touched && invalid}
            />
            {error && touched && <StyledInlineError>{error}</StyledInlineError>}
          </>
        )}
      />
    </>
  );
};

const { spacing } = theme;

const StyledLabel = styled(Label)`
  margin-top: ${spacing.interComponent};
  margin-bottom: ${spacing.small};
`;

const StyledInlineError = styled(InlineError)`
  margin-left: ${spacing.interComponent};
`;
