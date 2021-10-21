import { Alert, Text, theme, Toast } from "@socialgouv/cdtn-ui";
import { FormApi } from "final-form";
import React, { useCallback, useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import ConventionSearch from "../../conventions/Search";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
import { FormContent } from "./type/WizardType";
import { required } from "./validators";

export const CONVENTION_NAME = "ccn";

type IdccInfo = {
  idcc: number;
  fullySupported: boolean;
};

type Props = {
  form: FormApi<FormContent>;
  supportedCcn?: IdccInfo[];
  isOptional: boolean;
};

function StepInfoCCn({
  form,
  supportedCcn,
  isOptional = true,
}: Props): JSX.Element {
  const [storedConvention, setConvention] = useLocalStorage(
    "convention",
    undefined
  );
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

  const ShowIdccInfo = ({
    currentIdcc,
    supportedCcn,
  }: {
    currentIdcc: number | undefined;
    supportedCcn: IdccInfo[];
  }): JSX.Element => {
    if (currentIdcc) {
      const idccInfo = supportedCcn.find((item) => item.idcc == currentIdcc);
      if (!idccInfo) {
        return (
          <Alert variant="primary">
            <p>
              <Text variant="primary" fontSize="hsmall" fontWeight="700">
                À noter&nbsp;: convention collective non traitée
              </Text>
            </p>
            La convention collective sélectionnée n&apos;a pas été traitée par
            nos services. Vous pouvez poursuivre la simulation pour connaitre la
            durée prévue par le code du travail mais nous vous conseillons de
            vérifier si votre convention collective prévoit un délai plus
            favorable qui vous serait applicable.
          </Alert>
        );
      }
      if (!idccInfo.fullySupported) {
        return (
          <Alert variant="primary">
            <p>
              <Text variant="primary" fontSize="hsmall" fontWeight="700">
                À noter&nbsp;: convention prochainement traitée
              </Text>
            </p>
            Cette convention collective n&apos;est pas encore traitée par nos
            services mais le sera très prochainement. Vous pouvez poursuivre la
            simulation pour connaitre la durée prévue par le code du travail
            mais nous vous conseillons de vérifier si votre convention
            collective prévoit un délai plus favorable qui vous serait
            applicable.
          </Alert>
        );
      }
    }
    return <></>;
  };
  return (
    <>
      <Field
        name={CONVENTION_NAME}
        validate={isOptional ? null : required}
        render={({ input, meta: { error } }) => {
          if (input.value) {
            return (
              <>
                <Question required={!isOptional}>
                  La convention collective
                </Question>
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
                {supportedCcn && (
                  <ShowIdccInfo
                    currentIdcc={input.value.num}
                    supportedCcn={supportedCcn}
                  />
                )}
              </>
            );
          }
          return (
            <>
              <Question as="p" required={!isOptional}>
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

export const StepInfoCCnMandatory = (props: Props): JSX.Element => (
  <StepInfoCCn
    {...props}
    isOptional={false}
    supportedCcn={props.supportedCcn}
  />
);

export const StepInfoCCnOptionnal = (props: Props): JSX.Element => (
  <StepInfoCCn {...props} isOptional={true} supportedCcn={props.supportedCcn} />
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
