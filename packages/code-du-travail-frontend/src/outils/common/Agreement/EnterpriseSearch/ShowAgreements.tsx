import { formatIdcc } from "@socialgouv/modeles-social";
import { InputRadio, Text } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "@socialgouv/cdtn-utils";
import { ErrorField } from "../../ErrorField";
import { Question } from "../../Question";
import { RadioContainer } from "../../stepStyles";
import { required } from "../../validators";
import { AGREEMENT_ID_NAME } from "../form-constants";
import ShowAlert from "../components/ShowAlert";
import { AgreementSupportInfo } from "../types";

type Props = {
  enterprise: Enterprise;
  onChange: (enterprise: Enterprise, agreement: Agreement | null) => void;
  supportedAgreements: AgreementSupportInfo[];
  alertAgreementNotSupported?: (string) => JSX.Element;
};

const ShowAgreements = ({
  enterprise,
  onChange,
  supportedAgreements,
  alertAgreementNotSupported,
}: Props): JSX.Element => {
  const [agreement, setAgreement] = useState<Agreement | undefined>();

  return (
    <>
      <Question required={false} htmlFor="ccn.selected.id" as="p">
        {enterprise.conventions.length} conventions collectives ont été trouvées
        pour cette entreprise, sélectionnez la vôtre&nbsp;:&nbsp;
      </Question>
      <RadioContainer>
        {enterprise.conventions.map((agreement) => {
          return (
            <Field
              key={agreement.id}
              type="radio"
              name={AGREEMENT_ID_NAME}
              value={`${agreement.id}`}
              validate={required}
            >
              {(props) => (
                <InputRadio
                  label={
                    <Text>
                      {agreement.shortTitle} (IDCC {formatIdcc(agreement.num)})
                    </Text>
                  }
                  id={`agreement-${agreement.id}`}
                  {...props.input}
                />
              )}
            </Field>
          );
        })}
        <OnChange name={AGREEMENT_ID_NAME}>
          {(values) => {
            const agreement = enterprise?.conventions?.find(
              (agreement) => agreement.id === values
            );
            setAgreement(agreement);
            onChange(enterprise, agreement ?? null);
          }}
        </OnChange>
        <ErrorField name={AGREEMENT_ID_NAME} />
      </RadioContainer>
      {agreement && (
        <ShowAlert
          currentAgreement={agreement}
          supportedAgreements={supportedAgreements}
          alertAgreementNotSupported={alertAgreementNotSupported}
        />
      )}
    </>
  );
};

export default ShowAgreements;
