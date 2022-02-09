import { Section } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import { Field } from "react-final-form";

import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../../conventions/Search/api/type";
import { SearchParams } from "../../../ConventionCollective/common/NavContext";
import { EnterpriseSearchStep } from "../../../ConventionCollective/steps/EnterpriseSearch";
import { ErrorField } from "../../ErrorField";
import { required } from "../../validators";
import { ENTERPRISE_NAME } from "../form-constants";
import { AgreementSupportInfo, OnSelectAgreementFn } from "../types";
import SelectedEnterprise from "./SelectedEnterprise";
import ShowAgreement from "./ShowAgreement";
import ShowAgreements from "./ShowAgreements";

export type Props = {
  supportedAgreements?: AgreementSupportInfo[];
  selectedEnterprise?: Enterprise;
  selectedAgreement?: Agreement;
  onSelectAgreement: OnSelectAgreementFn;
};

const EnterpriseSearch = ({
  supportedAgreements,
  selectedEnterprise,
  onSelectAgreement,
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
      <Section>
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
          />
        ) : (
          <ShowAgreements
            enterprise={enterprise}
            onChange={(enterprise, agreement) => {
              onSelectAgreement(agreement, enterprise);
            }}
            supportedAgreements={supportedAgreements}
          />
        )}
      </Section>
    );
  }

  return (
    <>
      <EnterpriseSearchStep
        handleEnterpriseSelection={(enterprise) => {
          if (enterprise.conventions.length === 1) {
            onSelectAgreement(enterprise.conventions[0], enterprise);
          }
          setEnterprise(enterprise);
        }}
        searchParams={searchParams}
        onSearchParamsChange={(params) => {
          setSearchParams(params);
        }}
      />
      <ErrorField name={ENTERPRISE_NAME} />
      <Field
        type="input"
        name={ENTERPRISE_NAME}
        validate={required}
        hidden
        render={({ input, ...props }) => {
          return <input {...input} {...props} />;
        }}
      />
    </>
  );
};

export default EnterpriseSearch;
