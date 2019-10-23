import React, { useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import { Button, Toast, theme } from "@socialgouv/react-ui";

import { QuestionLabel } from "./stepStyles";
import Search from "../../conventions/Search/Form";

export const CCN = "ccn";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

function StepInfoCCn({ form, isOptionnal = true }) {
  const [ccInfo, setCcInfo] = useConventionState({});
  useEffect(() => {
    form.batch(() => {
      Object.keys(form.getState().values)
        .filter(key => key !== CCN)
        .forEach(key => form.change(key, undefined));
      form.change(CCN, ccInfo.convention);
    });
  }, [ccInfo, form]);
  return (
    <>
      <Field
        name={CCN}
        render={({ input, meta: { error } }) => {
          if (input.value) {
            return (
              <>
                <QuestionLabel>Votre convention collective</QuestionLabel>
                <p>
                  {input.value.title}
                  <br />
                  {ccInfo.label && `(${ccInfo.label})`}
                </p>

                <Button
                  variant="link"
                  type="button"
                  onClick={() => setCcInfo({})}
                >
                  Changer de convention collective
                </Button>
                {error && <StyledToast>{error}</StyledToast>}
              </>
            );
          }
          return (
            <>
              <QuestionLabel>
                Quelle est votre convention collective ?
              </QuestionLabel>
              {isOptionnal && (
                <P>
                  <strong>* optionnel</strong>, si vous ne connaissez pas votre
                  convention collective, vous pouvez passer à l’étape suivante
                  en cliquant sur le bouton Suivant.
                </P>
              )}
              <SearchStyled title="" onSelectConvention={setCcInfo} />
            </>
          );
        }}
      />
    </>
  );
}

export { StepInfoCCn };

export const StepInfoCCnMandatory = props => (
  <StepInfoCCn {...props} isOptionnal={false} />
);

export const StepInfoCCnOptionnal = props => (
  <StepInfoCCn {...props} isOptionnal={true} />
);

const SearchStyled = styled(Search)`
  padding-left: 0;
  padding-right: 0;
`;

const { spacing } = theme;
const P = styled.p`
  font-style: italic;
`;
const StyledToast = styled(Toast)`
  width: 100%;
  margin-top: ${spacing.interComponent};
`;
