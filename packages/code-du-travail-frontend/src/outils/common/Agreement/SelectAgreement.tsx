import { FormApi } from "final-form";
import React, { useCallback, useEffect } from "react";

import { Agreement } from "../../../conventions/Search/api/type";
import { useLocalStorage } from "../../../lib/useLocalStorage";
import { FormContent } from "../type/WizardType";
import { AgreementSearch } from "./AgreementSearch";
import { AGREEMENT_NAME } from "./form-constants";
import { RouteSelection } from "./RouteSelection";
import { AgreementSupportInfo } from "./types";

type Props = {
  form: FormApi<FormContent>;
  supportedAgreements: AgreementSupportInfo[];
  onChange?: (oldValue: Agreement | null, newValue: Agreement | null) => void;
};

const SelectAgreement = ({
  form,
  supportedAgreements,
  onChange,
}: Props): JSX.Element => {
  const [storedConvention, setConvention] = useLocalStorage(
    "convention",
    undefined
  );

  const onSelectAgreement = useCallback(
    (data) => {
      const oldData = storedConvention;
      setConvention(data);
      if (window) {
        window.scrollTo(0, 0);
      }
      if (oldData !== data && onChange) {
        onChange(storedConvention, data);
      }
    },
    [storedConvention, setConvention, onChange]
  );

  useEffect(() => {
    form.batch(() => {
      form.change(AGREEMENT_NAME, storedConvention);
    });
    // eslint-disable-next-line
  }, [storedConvention]);

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
    </>
  );
};

export default SelectAgreement;
