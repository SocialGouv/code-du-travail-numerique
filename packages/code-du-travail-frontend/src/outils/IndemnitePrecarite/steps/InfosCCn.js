import data from "@cdt/data...prime-precarite/precarite.data.json";
import { StepInfoCCnOptionnal } from "../../common/InfosCCn";

import { isNotYetProcessed } from "../../common/situations.utils";

StepInfoCCnOptionnal.validate = values => {
  const errors = {};
  const { ccn } = values;
  if (ccn && isNotYetProcessed(data, ccn.num)) {
    errors.ccn =
      "Nous n’avons pas encore traité votre convention collective mais nous vous invitons à poursuivre la simulation afin d’obtenir le montant défini par le Code du travail.";
  }
  return errors;
};

export const StepInfoCCn = StepInfoCCnOptionnal;
