import React, { useState } from "react";
import { Paragraph, Section as SectionUi } from "@socialgouv/cdtn-ui";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../../conventions/Search/api/type";
import { SearchParams } from "../../../ConventionCollective/common/NavContext";
import { TrackingProps } from "../../../ConventionCollective/types";
import styled from "styled-components";
import {
  AgreementSupportInfo,
  OnSelectAgreementFn,
} from "../../../common/Agreement/types";
import ShowAgreements from "./ShowAgreements";
import ShowAgreement from "../../../common/Agreement/EnterpriseSearch/ShowAgreement";
import SelectedEnterprise from "../../../common/Agreement/EnterpriseSearch/SelectedEnterprise";
import { SearchEnterpriseInput } from "../../../common/Agreement/EnterpriseSearch/EntrepriseSearchInput/SearchEnterpriseInput";
import { renderResults } from "../../../common/Agreement/EnterpriseSearch/EntrepriseSearchResult";

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
  selectedAgreement,
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
            agreement={selectedAgreement}
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
    } else {
      onSelectAgreement(null, enterprise);
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
