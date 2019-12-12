import React, { useEffect, useCallback } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import { Button, Toast, theme } from "@socialgouv/react-ui";

import Search from "../../conventions/Search/Form";
import { required } from "./validators";
import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
import { useLocalStorage } from "../../lib/useLocalStorage";

export const CCN = "ccn";

function StepInfoCCn({ form, isOptionnal = true }) {
  const [ccInfo, setCcInfo] = useLocalStorage("convention", {});

  const clearCCInfo = useCallback(() => {
    setCcInfo();
  }, [setCcInfo]);

  const setCCInfoMemo = useCallback(
    ({ convention, label }) => {
      setCcInfo({ convention, label });
    },
    [setCcInfo]
  );
  useEffect(() => {
    form.batch(() => {
      const { convention, label } = ccInfo || {};
      form.change("criteria", undefined);
      form.change(CCN, convention && label ? { convention, label } : null);
    });
    // INFO(@lionelb): do not put form in useEffect dependencies
    // it will cause useEffect to run continuously in IE11
    // eslint-disable-next-line
  }, [ccInfo]);
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
                  {input.value.convention.title}
                  <br />
                  {input.value.label && `(${input.value.label})`}
                </p>

                <Button variant="link" type="button" onClick={clearCCInfo}>
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
              <SearchStyled title="" onSelectConvention={setCCInfoMemo} />
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
