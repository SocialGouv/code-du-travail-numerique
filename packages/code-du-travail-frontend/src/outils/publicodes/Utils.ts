import { FormContent } from "../common/type/WizardType";

/**
 * Take the form values from react-final-form and transform to a flat object for publicodes.
 */
export const mapToPublicodesSituation = (
  form: FormContent
): Record<string, string> => {
  const { ccn, infos, ...formWithoutCcn } = form;
  if (ccn) {
    return {
      "contrat salarié - convention collective": `'IDCC${ccn.num
        .toString()
        .padStart(4, "0")}'`,
      ...infos,
      ...formWithoutCcn,
    };
  }
  return {
    ...infos,
    ...formWithoutCcn,
  };
};

export const reverseValues = (
  values: Record<string, string>
): Record<string, string> =>
  Object.entries(values).reduce((state, [key, value]) => {
    state[value] = key;
    return state;
  }, {});
