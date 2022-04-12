import React from "react";

import { SelectAgreement } from "../../common";
import { PreavisRetraiteFormContent } from "../../common/type/WizardType";
import { getSupportedCC } from "./utils";
import { FormApi } from "final-form";

type Props = {
  form: FormApi<PreavisRetraiteFormContent>;
  title: string;
};

const AgreementStep = ({ form, title }: Props): JSX.Element => {
  return (
    <SelectAgreement
      title={title}
      form={form}
      onChange={() => {
        // Delete infos when change CC
        form.change("infos", undefined);
      }}
      supportedAgreements={getSupportedCC()}
    />
  );
};

export { AgreementStep };
