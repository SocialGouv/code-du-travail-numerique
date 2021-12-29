import { Alert, Paragraph, Text, theme, Toast } from "@socialgouv/cdtn-ui";
import { FormApi } from "final-form";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import ConventionSearch from "../../conventions/Search";
import { trackConventionCollective } from "../../lib/matomo";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
import { FormContent } from "./type/WizardType";
import { required } from "./validators";

export const CONVENTION_NAME = "ccn";

type IdccInfo = {
  fullySupported: boolean;
  idcc: number;
};

type BaseProps = {
  form: FormApi<FormContent>;
  supportedCcn?: IdccInfo[];
  onChange?: (oldValue: any, newValue: any) => void;
};

type Props = BaseProps & {
  isOptional: boolean;
};

function StepInfoCCn({
  form,
  supportedCcn,
  isOptional = true,
  onChange,
}: Props): JSX.Element {
  const [storedConvention, setConvention] = useLocalStorage(
    "convention",
    undefined
  );
  const router = useRouter();
  const onSelectConvention = useCallback(
    (data) => {
      const oldData = storedConvention;
      setConvention(data);
      if (window) {
        window.scrollTo(0, 0);
      }
      if (oldData !== data && onChange) {
        onChange(storedConvention, data);
      }
    },
    [storedConvention, setConvention, onChange]
  );
  useEffect(() => {
    trackConventionCollective(storedConvention, router.asPath);
    form.batch(() => {
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
            <Paragraph noMargin>
              La convention collective sélectionnée n&apos;a pas été traitée par
              nos services. Vous pouvez poursuivre la simulation pour connaitre
              la durée prévue par le code du travail mais nous vous conseillons
              de vérifier si votre convention collective prévoit un délai plus
              favorable qui vous serait applicable.
            </Paragraph>
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
            <Paragraph noMargin>
              Cette convention collective n&apos;est pas encore traitée par nos
              services mais le sera très prochainement. Vous pouvez poursuivre
              la simulation pour connaitre la durée prévue par le code du
              travail mais nous vous conseillons de vérifier si votre convention
              collective prévoit un délai plus favorable qui vous serait
              applicable.
            </Paragraph>
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
                    onSelectConvention(undefined);
                  }}
                >
                  {input.value.shortTitle}
                  {input.value.highlight && (
                    <Paragraph variant="altText">
                      {input.value.highlight.searchInfo}
                    </Paragraph>
                  )}
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
              <Question required={!isOptional}>
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

export const StepInfoCCnMandatory = (props: BaseProps): JSX.Element => (
  <StepInfoCCn
    {...props}
    isOptional={false}
    supportedCcn={props.supportedCcn}
  />
);

export const StepInfoCCnOptionnal = (props: BaseProps): JSX.Element => (
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
