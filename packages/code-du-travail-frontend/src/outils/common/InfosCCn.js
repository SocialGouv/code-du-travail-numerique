import React, { useCallback, useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import { Button, Toast, theme } from "@socialgouv/react-ui";

import ConventionSearch from "../../conventions/Search";
import { required } from "./validators";
import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
import { useLocalStorage } from "../../lib/useLocalStorage";

export const CONVENTION_NAME = "ccn";

function StepInfoCCn({ form, isOptionnal = true }) {
  const [storedConvention, setConvention] = useLocalStorage("convention");
  const onSelectConvention = useCallback(
    data => {
      setConvention(data);
      if (window) {
        window.scrollTo(0, 0);
      }
    },
    [setConvention]
  );
  useEffect(() => {
    form.batch(() => {
      form.change("criteria", undefined);
      form.change(CONVENTION_NAME, storedConvention);
    });
    // eslint-disable-next-line
  }, [storedConvention]);
  return (
    <>
      <Field
        name={CONVENTION_NAME}
        validate={isOptionnal ? null : required}
        render={({ input, meta: { error } }) => {
          if (input.value) {
            return (
              <>
                <Question>La convention collective</Question>
                <p>{input.value.title}</p>
                <p>
                  <Button
                    variant="link"
                    type="button"
                    onClick={onSelectConvention}
                  >
                    Changer de convention collective
                  </Button>
                </p>
                {error && <ErrorToast>{error}</ErrorToast>}
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
              <StyledConventionSearch onSelectConvention={setConvention} />
              <ErrorField name={CONVENTION_NAME} />
            </>
          );
        }}
      />
    </>
  );
}

export const StepInfoCCnMandatory = props => (
  <StepInfoCCn {...props} isOptionnal={false} />
);

export const StepInfoCCnOptionnal = props => (
  <StepInfoCCn {...props} isOptionnal={true} />
);

const StyledConventionSearch = styled(ConventionSearch)`
  padding-right: 0;
  padding-left: 0;
`;

const { spacings } = theme;
const P = styled.p`
  font-style: italic;
`;
export const ErrorToast = styled(Toast)`
  width: 100%;
  margin-top: ${spacings.medium};
`;
