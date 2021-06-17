import { theme, Toast } from "@socialgouv/cdtn-ui";
import React, { useCallback, useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import ConventionSearch from "../../conventions/Search";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
import { required } from "./validators";

export const CONVENTION_NAME = "ccn";

function StepInfoCCn({ form, isOptionnal = true }) {
  const [storedConvention, setConvention] = useLocalStorage("convention");
  const onSelectConvention = useCallback(
    (data) => {
      setConvention(data);
      if (window) {
        window.scrollTo(0, 0);
      }
    },
    [setConvention]
  );
  useEffect(() => {
    form.batch(() => {
      // Simulateur Duree Preavis Retraite:  Delete infos when change CC
      form.change("infos", undefined);
      form.change("contrat salarié - ancienneté", undefined);
      form.change("criteria", undefined);
      form.change("typeRupture", undefined);
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
                <p>
                  Vous avez sélectionné la convention collective&nbsp;:&nbsp;
                </p>
                <Toast
                  variant="secondary"
                  onRemove={(event) => {
                    event.preventDefault();
                    setConvention();
                  }}
                >
                  {input.value.shortTitle}
                </Toast>
                <p>Cliquez sur Suivant pour poursuivre la simulation.</p>
                {error && <ErrorToast>{error}</ErrorToast>}
              </>
            );
          }
          return (
            <>
              <Question as="p" required={!isOptionnal}>
                Quelle est la convention collective applicable au salarié ?
              </Question>
              <StyledConventionSearch onSelectConvention={onSelectConvention} />
              <ErrorField name={CONVENTION_NAME} />
            </>
          );
        }}
      />
    </>
  );
}

export const StepInfoCCnMandatory = (props) => (
  <StepInfoCCn {...props} isOptionnal={false} />
);

export const StepInfoCCnOptionnal = (props) => (
  <StepInfoCCn {...props} isOptionnal={true} />
);

const StyledConventionSearch = styled(ConventionSearch)`
  padding-right: 0;
  padding-left: 0;
`;

const { spacings } = theme;

export const ErrorToast = styled(Toast)`
  width: 100%;
  margin-top: ${spacings.medium};
`;
