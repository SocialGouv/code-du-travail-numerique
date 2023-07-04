import React, { useState } from "react";
import { Field } from "react-final-form";
import { Paragraph, Section as SectionUi } from "@socialgouv/cdtn-ui";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "@socialgouv/cdtn-utils";
import { SearchParams } from "../../../ConventionCollective/common/NavContext";
import { TrackingProps } from "../../../ConventionCollective/types";
import { ErrorField } from "../../ErrorField";
import { required } from "../../validators";
import { ENTERPRISE_NAME } from "../form-constants";
import { AgreementSupportInfo, OnSelectAgreementFn } from "../types";
import SelectedEnterprise from "./SelectedEnterprise";
import ShowAgreement from "./ShowAgreement";
import ShowAgreements from "./ShowAgreements";
import { SearchEnterpriseInput } from "./EntrepriseSearchInput/SearchEnterpriseInput";
import styled from "styled-components";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

export type Props = {
  supportedAgreements: AgreementSupportInfo[];
  selectedEnterprise?: Enterprise;
  selectedAgreement?: Agreement;
  onSelectAgreement: OnSelectAgreementFn;
  alertAgreementNotSupported?: (string) => JSX.Element;
  isDisabled?: boolean;
  setHasSelectedEnterprise?: (hasSelectedEnterprise: boolean) => void;
} & TrackingProps;

const EnterpriseSearch = ({
  supportedAgreements,
  selectedEnterprise,
  onSelectAgreement,
  onUserAction,
  alertAgreementNotSupported,
  isDisabled,
  setHasSelectedEnterprise,
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
            setHasSelectedEnterprise?.(false);
            onSelectAgreement(null);
          }}
        />
        {enterprise.conventions.length === 1 ? (
          <ShowAgreement
            agreement={enterprise.conventions[0]}
            supportedAgreements={supportedAgreements}
            alertAgreementNotSupported={alertAgreementNotSupported}
            simulator={PublicodesSimulator.PREAVIS_RETRAITE}
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
    setHasSelectedEnterprise?.(true);
  };
  return (
    <Section>
      <Paragraph
        noMargin
        fontWeight="600"
        fontSize="default"
        disabled={isDisabled}
      >
        Précisez et sélectionnez votre entreprise
      </Paragraph>
      <SearchEnterpriseInput
        isDisabled={isDisabled}
        searchParams={searchParams}
        onUserAction={onUserAction}
        onSearchParamsChange={setSearchParams}
        handleEnterpriseSelection={handleEnterpriseSelection}
      />
      <ErrorField
        name={ENTERPRISE_NAME}
        errorText={"Vous devez sélectionner une entreprise"}
      />
      {!isDisabled && (
        <Field
          type="input"
          name={ENTERPRISE_NAME}
          validate={required}
          hidden
          render={({ input, ...props }) => {
            return <input {...input} {...props} />;
          }}
        />
      )}
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
