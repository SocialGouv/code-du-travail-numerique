import { FormApi } from "final-form";
import React, { useCallback, useEffect } from "react";

import { Agreement } from "../../../conventions/Search/api/type";
import { useLocalStorage } from "../../../lib/useLocalStorage";
import { FormContent } from "../type/WizardType";
import AgreementSearch from "./AgreementSearch";
import { AGREEMENT_NAME } from "./form-constants";
import { RouteSelection } from "./RouteSelection";

type Props = {
  form: FormApi<FormContent>;
  onChange?: (oldValue: Agreement | null, newValue: Agreement | null) => void;
};

const SelectAgreement = ({ form, onChange }: Props): JSX.Element => {
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
  return (
    <>
      <RouteSelection form={form} />
      {values.ccn?.route === "agreement" && (
        <AgreementSearch
          selectedAgreement={values.ccn.selected}
          onSelectAgreement={onSelectAgreement}
        />
      )}
    </>
  );
};

export default SelectAgreement;
