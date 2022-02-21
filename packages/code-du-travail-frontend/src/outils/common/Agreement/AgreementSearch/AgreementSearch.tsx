import { Paragraph, theme, Toast } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import { Agreement } from "../../../../conventions/Search/api/type";
import { AgreementSearchStep } from "../../../ConventionCollective/steps/AgreementSearch";
import { ErrorField } from "../../ErrorField";
import { required } from "../../validators";
import { AGREEMENT_NAME } from "../form-constants";
import ShowAlert from "../ShowAlert";
import { AgreementSupportInfo } from "../types";

export type Props = {
  supportedAgreements: AgreementSupportInfo[];
  selectedAgreement?: Agreement;
  onSelectAgreement: (agreement: Agreement | null) => void;
};

const AgreementSearch = ({
  supportedAgreements,
  selectedAgreement,
  onSelectAgreement,
}: Props): JSX.Element => {
  if (selectedAgreement) {
    return (
      <>
        <SelectedAgreementTitle>
          Vous avez sélectionné la convention collective&nbsp;:&nbsp;
        </SelectedAgreementTitle>
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
          currentIdcc={selectedAgreement.num}
          supportedAgreements={supportedAgreements}
        />
        <Paragraph>
          Cliquez sur Suivant pour poursuivre la simulation.
        </Paragraph>
      </>
    );
  }
  return (
    <>
      <AgreementSearchStep
        embeddedForm={false}
        onSelectAgreement={onSelectAgreement}
      />
      <ErrorField name={AGREEMENT_NAME} />
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
  margin-bottom: ${spacings.medium};
`;

const SelectedAgreementTitle = styled(Paragraph)`
  margin-bottom: ${spacings.small};
  font-weight: bold;
`;

export default AgreementSearch;
