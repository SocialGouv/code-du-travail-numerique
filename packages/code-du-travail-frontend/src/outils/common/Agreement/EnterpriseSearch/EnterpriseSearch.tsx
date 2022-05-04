import React, { useState } from "react";
import { Field } from "react-final-form";
import {
  Input,
  Label,
  Paragraph,
  Section as SectionUi,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../../conventions/Search/api/type";
import { SearchParams } from "../../../ConventionCollective/common/NavContext";
import { TrackingProps } from "../../../ConventionCollective/types";
import { ErrorField } from "../../ErrorField";
import { required } from "../../validators";
import { ENTERPRISE_NAME } from "../form-constants";
import { AgreementSupportInfo, OnSelectAgreementFn } from "../types";
import SelectedEnterprise from "./SelectedEnterprise";
import ShowAgreement from "./ShowAgreement";
import ShowAgreements from "./ShowAgreements";
import { renderResults } from "./EntrepriseSearchResult";
import { SearchEnterpriseInput } from "./EntrepriseSearchInput/SearchEnterpriseInput";
import styled from "styled-components";

export type Props = {
  supportedAgreements: AgreementSupportInfo[];
  selectedEnterprise?: Enterprise;
  selectedAgreement?: Agreement;
  onSelectAgreement: OnSelectAgreementFn;
  alertAgreementNotSupported?: (string) => JSX.Element;
} & TrackingProps;

const EnterpriseSearch = ({
  supportedAgreements,
  selectedEnterprise,
  onSelectAgreement,
  onUserAction,
  alertAgreementNotSupported,
}: Props): JSX.Element => {
  const [enterprise, setEnterprise] = useState<Enterprise | undefined>(
    selectedEnterprise
  );
  const [searchParams, setSearchParams] = useState<SearchParams>({
    address: "",
    query: "",
  });

  if (enterprise) {
    return (
      <>
        <SelectedEnterprise
          enterprise={enterprise}
          onRemoveEnterprise={() => {
            setEnterprise(undefined);
            onSelectAgreement(null);
          }}
        />
        {enterprise.conventions.length === 1 ? (
          <ShowAgreement
            agreement={enterprise.conventions[0]}
            supportedAgreements={supportedAgreements}
            alertAgreementNotSupported={alertAgreementNotSupported}
          />
        ) : (
          <ShowAgreements
            enterprise={enterprise}
            onChange={(enterprise, agreement) => {
              onSelectAgreement(agreement, enterprise);
            }}
            supportedAgreements={supportedAgreements}
            alertAgreementNotSupported={alertAgreementNotSupported}
          />
        )}
      </>
    );
  }
  const handleEnterpriseSelection = (enterprise) => {
    if (enterprise.conventions.length === 1) {
      onSelectAgreement(enterprise.conventions[0], enterprise);
    }
    setEnterprise(enterprise);
  };
  return (
    <Section>
      <Paragraph noMargin fontWeight="600" fontSize="default">
        Précisez et sélectionnez votre entreprise
      </Paragraph>
      <SearchEnterpriseInput
        searchParams={searchParams}
        onUserAction={onUserAction}
        onSearchParamsChange={setSearchParams}
        renderResults={renderResults({
          handleEnterpriseSelection,
          onUserAction,
        })}
      />
      <ErrorField
        name={ENTERPRISE_NAME}
        errorText={"Vous devez séléctionner une entreprise"}
      />
      <Field
        type="input"
        name={ENTERPRISE_NAME}
        validate={required}
        hidden
        render={({ input, ...props }) => {
          return <input {...input} {...props} />;
        }}
      />
    </Section>
  );
};

export default EnterpriseSearch;

const Section = styled(SectionUi)`
  padding-top: 0;
  label {
    font-weight: 400;
  }
`;
