import React, { useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import { Button, Toast, theme } from "@socialgouv/react-ui";

import Search from "../../conventions/Search/Form";
import { required } from "./validators";
import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
export const CCN = "ccn";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

function StepInfoCCn({ form, isOptionnal = true }) {
  const [ccInfo, setCcInfo] = useConventionState({});
  useEffect(() => {
    form.batch(() => {
      form.change(CCN, ccInfo.convention);
    });
  }, [ccInfo, form]);
  return (
    <>
      <Field
        name={CCN}
        validate={isOptionnal ? null : required}
        render={({ input, meta: { error } }) => {
          if (input.value) {
            return (
              <>
                <Question>La convention collective</Question>
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
              <Question as="p" required={!isOptionnal}>
                Quelle est la convention collective du salarié ?
              </Question>
              {isOptionnal && (
                <P>
                  <strong>* optionnel</strong>, si vous ne connaissez pas la
                  convention collective, vous pouvez passer à l’étape suivante
                  en cliquant sur le bouton Suivant.
                </P>
              )}
              <SearchStyled title="" onSelectConvention={setCcInfo} />
              <ErrorField name={CCN} />
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
  padding-right: 0;
  padding-left: 0;
`;

const { spacings } = theme;
const P = styled.p`
  font-style: italic;
`;
const StyledToast = styled(Toast)`
  width: 100%;
  margin-top: ${spacings.medium};
`;
