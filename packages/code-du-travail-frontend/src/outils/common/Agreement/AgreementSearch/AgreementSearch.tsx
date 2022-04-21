import { theme, Toast } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import { Agreement } from "../../../../conventions/Search/api/type";
import { AgreementSearchStep } from "../../../ConventionCollective/steps/AgreementSearch";
import { TrackingProps } from "../../../ConventionCollective/types";
import { ErrorField } from "../../ErrorField";
import { Question } from "../../Question";
import { required } from "../../validators";
import { AGREEMENT_NAME } from "../form-constants";
import ShowAlert from "../ShowAlert";
import { AgreementSupportInfo } from "../types";

export type Props = {
  supportedAgreements: AgreementSupportInfo[];
  selectedAgreement?: Agreement;
  onSelectAgreement: (agreement: Agreement | null) => void;
  alertCCUnsupported?: (string) => JSX.Element;
} & TrackingProps;

const AgreementSearch = ({
  supportedAgreements,
  selectedAgreement,
  onSelectAgreement,
  onUserAction,
  alertCCUnsupported,
}: Props): JSX.Element => {
  if (selectedAgreement) {
    return (
      <>
        <Question required={false} as="p">
          Vous avez sélectionné la convention collective&nbsp;:&nbsp;
        </Question>
        <SelectedAgreement
          variant="secondary"
          onRemove={(event) => {
            event.preventDefault();
            onSelectAgreement(null);
          }}
        >
          {selectedAgreement.shortTitle}
        </SelectedAgreement>
        <ShowAlert
          currentIdcc={selectedAgreement}
          supportedAgreements={supportedAgreements}
          alertCCUnsupported={alertCCUnsupported}
        />
      </>
    );
  }
  return (
    <>
      <AgreementSearchStep
        onUserAction={onUserAction}
        embeddedForm={false}
        onSelectAgreement={onSelectAgreement}
      />
      <ErrorField
        name={AGREEMENT_NAME}
        errorText={"Vous devez séléctionner une convention collective"}
      />
      <Field
        type="input"
        name={AGREEMENT_NAME}
        validate={required}
        hidden
        render={({ input, ...props }) => {
          return <input {...props} {...input} />;
        }}
      />
    </>
  );
};

const { spacings } = theme;

const SelectedAgreement = styled(Toast)`
  margin-bottom: ${spacings.base};
`;

export default AgreementSearch;
