import { FormApi } from "final-form";
import React from "react";

import { FormContent } from "../type/WizardType";
import { RouteSelection } from "./RouteSelection";

type Props = {
  form: FormApi<FormContent>;
};

const SelectAgreement = ({ form }: Props): JSX.Element => {
  return <RouteSelection form={form} />;
};

export default SelectAgreement;
