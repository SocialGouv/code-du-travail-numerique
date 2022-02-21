import { FormApi } from "final-form";
import React, { useCallback, useEffect, useState } from "react";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../conventions/Search/api/type";
import { useLocalStorage } from "../../../lib/useLocalStorage";
import { AgreementRoute, FormContent } from "../type/WizardType";
import { AgreementSearch } from "./AgreementSearch";
import { EnterpriseSearch } from "./EnterpriseSearch";
import { AGREEMENT_NAME, ENTERPRISE_NAME, ROUTE_NAME } from "./form-constants";
import { RouteSelection } from "./RouteSelection";
import { AgreementSupportInfo, OnSelectAgreementFn } from "./types";

export type Props = {
  form: FormApi<FormContent>;
  supportedAgreements: AgreementSupportInfo[];
  onChange?: (oldValue: Agreement | null, newValue: Agreement | null) => void;
  defaultSelectedAgreement?: Agreement;
};

const SelectAgreement = ({
  form,
  supportedAgreements,
  onChange,
  defaultSelectedAgreement,
}: Props): JSX.Element => {
  const [storedConvention, setConvention] = useLocalStorage(
    "convention",
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
  useEffect(() => {
    if (values.ccn?.route === "not-selected") {
      setConvention(null);
    }
  }, [setConvention, values.ccn?.route]);

  return (
    <>
      <RouteSelection form={form} />
      {values.ccn?.route === "agreement" && (
        <AgreementSearch
          supportedAgreements={supportedAgreements}
          selectedAgreement={values.ccn.selected}
          onSelectAgreement={onSelectAgreement}
        />
      )}
      {values.ccn?.route === "enterprise" && (
        <EnterpriseSearch
          selectedEnterprise={enterprise}
          onSelectAgreement={onSelectAgreement}
          supportedAgreements={supportedAgreements}
        />
      )}
    </>
  );
};

export default SelectAgreement;
