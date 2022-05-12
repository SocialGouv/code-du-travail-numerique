import {
  Paragraph,
  Section as SectionUi,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import { Agreement } from "../../../../conventions/Search/api/type";
import { TrackingProps } from "../../../ConventionCollective/types";
import { ErrorField } from "../../ErrorField";
import { Question } from "../../Question";
import { required } from "../../validators";
import { AGREEMENT_NAME } from "../form-constants";
import ShowAlert from "../components/ShowAlert";
import { AgreementSupportInfo } from "../types";
import { renderResults } from "./AgreementSearchResult";
import { SearchAgreementInput } from "./AgreementInput/SearchAgreementInput";

export type Props = {
  supportedAgreements: AgreementSupportInfo[];
  selectedAgreement?: Agreement;
  onSelectAgreement: (agreement: Agreement | null) => void;
  alertAgreementNotSupported?: (string) => JSX.Element;
} & TrackingProps;

const AgreementSearch = ({
  supportedAgreements,
  selectedAgreement,
  onSelectAgreement,
  onUserAction,
  alertAgreementNotSupported,
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
          currentAgreement={selectedAgreement}
          supportedAgreements={supportedAgreements}
          alertAgreementNotSupported={alertAgreementNotSupported}
        />
      </>
    );
  }
  return (
    <Section>
      <Paragraph noMargin fontWeight="600" fontSize="default">
        Précisez et sélectionnez votre convention collective
      </Paragraph>
      <SearchAgreementInput
        onUserAction={onUserAction}
        renderResults={renderResults({
          onSelectAgreement,
          onUserAction,
        })}
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
    </Section>
  );
};

const { spacings } = theme;

const Section = styled(SectionUi)`
  padding-top: 0;
  label {
    font-weight: 400;
  }
`;
const SelectedAgreement = styled(Toast)`
  margin-bottom: ${spacings.base};
`;

export default AgreementSearch;
