import React from "react";
import { StepInfoCCnMandatory } from "../../common/InfosCCn";
import data from "@cdt/data...preavis-demission/data.json";

import { isNotYetProcessed } from "../../common/situations.utils";

const StepInfoCCn = props => <StepInfoCCnMandatory {...props} />;
StepInfoCCn.validate = values => {
  const errors = {};
  const { ccn } = values;

  if (Object.keys(values).length === 0) {
    errors.ccn = "Quelle est la convention collective du salarié ?";
  }
  if (ccn && isNotYetProcessed(data.situations, ccn.convention.num)) {
    errors.ccn =
      "Nous n’avons pas encore traité cette convention collective. Le code du travail ne prévoyant pas de durée précise du préavis de démission, nous vous invitons à consulter le contenu de la convention collective.";
  }
  return errors;
};

export { StepInfoCCn };
