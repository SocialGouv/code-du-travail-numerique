import { formatIdcc } from "@socialgouv/modeles-social";
import { InputRadio, Text } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "@socialgouv/cdtn-types";
import { ErrorField } from "../../ErrorField";
import { Question } from "../../Question";
import { RadioContainer } from "../../stepStyles";
import { required } from "../../validators";
import { AGREEMENT_ID_NAME } from "../form-constants";
import ShowAlert from "../components/ShowAlert";
import { AgreementSupportInfo } from "../types";
import { Alert } from "../../../../common/Alert";
import { Simulator } from "../../NoticeExample";

type Props = {
  enterprise: Enterprise;
  onChange: (enterprise: Enterprise, agreement: Agreement | null) => void;
  supportedAgreements: AgreementSupportInfo[];
  alertAgreementNotSupported?: (string) => JSX.Element;
  simulator?: Simulator;
};

const ShowAgreements = ({
  enterprise,
  onChange,
  supportedAgreements,
  alertAgreementNotSupported,
  simulator,
}: Props): JSX.Element => {
  const [agreement, setAgreement] = useState<Agreement | undefined>();

  return (
    <>
      {enterprise.conventions.length > 0 ? (
        <Question required={false} htmlFor="ccn.selected.id">
          {enterprise.conventions.length} conventions collectives ont été
          trouvées pour cette entreprise, sélectionnez la vôtre&nbsp;:&nbsp;
        </Question>
      ) : (
        <>
          {simulator === Simulator.HEURES_RECHERCHE_EMPLOI ||
          simulator === Simulator.PREAVIS_DEMISSION ? (
            <Alert
              title={`Aucune convention collective n'a été déclarée pour l'entreprise ${enterprise.simpleLabel}.`}
              message="Or, la convention collective est nécessaire pour obtenir une réponse car le code du travail ne prévoit rien sur ce sujet."
            />
          ) : (
            <Alert
              title="Aucune convention collective n'a été déclarée pour cette entreprise."
              message="Vous pouvez tout de même poursuivre pour obtenir les informations générales prévues par le code du travail."
            />
          )}
        </>
      )}
      <RadioContainer>
        {enterprise.conventions.map((agreement) => {
          return (
            <Field
              key={agreement.id}
              type="radio"
              name={AGREEMENT_ID_NAME}
              value={agreement.id}
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
            const agreementChanged = enterprise?.conventions?.find(
              (agreement) => agreement.id.toString() === values.toString()
            );
            setAgreement(agreementChanged);
            onChange(enterprise, agreementChanged ?? null);
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
