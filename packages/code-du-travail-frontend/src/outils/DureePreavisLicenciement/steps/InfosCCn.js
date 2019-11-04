import { StepInfoCCnMandatory } from "../../common/InfosCCn";
import data from "@cdt/data...preavis-licenciement/data.json";

import { isNotYetProcessed } from "../../common/situations.utils";

StepInfoCCnMandatory.validate = values => {
  const errors = {};
  const { ccn } = values;
  if (Object.keys(values).length === 0) {
    errors.ccn = "Veuillez renseigner votre convention collective ?";
  }
  if (ccn && isNotYetProcessed(data, ccn.num)) {
    errors.ccn =
      "Nous n’avons pas encore traité votre convention collective. Le code du travail ne prévoyant pas de durée précise du préavis de démission, nous vous invitons à consulter le contenu de votre convention collective.";
  }
  return errors;
};

export const StepInfoCCn = StepInfoCCnMandatory;
