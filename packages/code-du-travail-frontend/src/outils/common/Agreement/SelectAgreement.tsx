import { FormApi } from "final-form";
import React, { useCallback, useEffect, useState } from "react";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../conventions/Search/api/type";
import { useLocalStorage } from "../../../lib/useLocalStorage";
import { OnUserAction } from "../../ConventionCollective/types";
import { AgreementRoute, FormContent } from "../type/WizardType";
import { AgreementSearch } from "./AgreementSearch";
import { EnterpriseSearch } from "./EnterpriseSearch";
import { AGREEMENT_NAME, ENTERPRISE_NAME, ROUTE_NAME } from "./form-constants";
import { RouteSelection } from "./RouteSelection";
import { handleTrackEvent } from "./tracking";
import { AgreementSupportInfo, OnSelectAgreementFn } from "./types";
import { SmallText } from "../stepStyles";
import { ErrorField } from "../ErrorField";
import { STORAGE_KEY_AGREEMENT } from "../../types";

export type Props = {
  title: string;
  form: FormApi<FormContent>;
  supportedAgreements: AgreementSupportInfo[];
  onChange?: (oldValue: Agreement | null, newValue: Agreement | null) => void;
  defaultSelectedAgreement?: Agreement;
  required?: boolean;
  note?: string;
  alertAgreementNotSupported?: (string) => JSX.Element;
};

const SelectAgreement = ({
  title,
  form,
  supportedAgreements,
  onChange,
  defaultSelectedAgreement,
  required = false,
  note,
  alertAgreementNotSupported,
}: Props): JSX.Element => {
  const [storedConvention, setConvention] = useLocalStorage(
    STORAGE_KEY_AGREEMENT,
    defaultSelectedAgreement
  );
  const [enterprise, setEnterprise] = useState<Enterprise | undefined>(
    form.getState().values.ccn?.enterprise
  );

  const onSelectAgreement = useCallback<OnSelectAgreementFn>(
    (agreement, enterprise) => {
      const oldData = storedConvention;
      setConvention(agreement);
      setEnterprise(enterprise);
      if (oldData !== agreement && onChange) {
        onChange(storedConvention, agreement);
      }
    },
    [storedConvention, setConvention, onChange]
  );

  const onUserAction: OnUserAction = (action, extra) => {
    handleTrackEvent(title, action, extra);
  };

  useEffect(() => {
    form.batch(() => {
      form.change(AGREEMENT_NAME, storedConvention);
      form.change(ENTERPRISE_NAME, enterprise);
      if (
        storedConvention != null &&
        form.getState().values.ccn?.route === undefined
      ) {
        form.change(ROUTE_NAME, "agreement" as AgreementRoute);
      }
    });
    // eslint-disable-next-line
  }, [storedConvention, enterprise]);

  const values = form.getState().values;
  const onRouteChange = (route: AgreementRoute) => {
    switch (route) {
      case "not-selected": {
        setConvention(undefined);
        setEnterprise(undefined);
        break;
      }
      case "agreement": {
        setEnterprise(undefined);
        break;
      }
      case "enterprise": {
        setConvention(undefined);
        break;
      }
    }
  };

  return (
    <>
      <RouteSelection
        form={form}
        canBeSkip={!required}
        onChange={onRouteChange}
      />
      {note && <SmallText>{note}</SmallText>}
      {values.ccn?.route === "agreement" && (
        <AgreementSearch
          supportedAgreements={supportedAgreements}
          selectedAgreement={values.ccn.selected}
          onSelectAgreement={onSelectAgreement}
          onUserAction={onUserAction}
          alertAgreementNotSupported={alertAgreementNotSupported}
        />
      )}
      {values.ccn?.route === "enterprise" && (
        <EnterpriseSearch
          selectedEnterprise={enterprise}
          onSelectAgreement={onSelectAgreement}
          supportedAgreements={supportedAgreements}
          onUserAction={onUserAction}
          alertAgreementNotSupported={alertAgreementNotSupported}
        />
      )}
      <ErrorField
        name="agreementMissing"
        errorText={
          "La simulation ne peut pas se poursuivre avec cette convention collective"
        }
      />
    </>
  );
};

export default SelectAgreement;
