import { FormContent } from "../common/type/WizardType";

/**
 * Take the form values from react-final-form and transform to a flat object for publicodes.
 */
export const mapToPublicodesSituation = (
  form: FormContent
): Record<string, string> => {
  const { ccn, infos, ...formWithoutCcn } = form;
  const ccnId = ccn ? `'IDCC${ccn.num.toString().padStart(4, "0")}'` : "''";
  return {
    "contrat salarié - convention collective": ccnId,
    ...infos,
    ...formWithoutCcn,
  };
};
