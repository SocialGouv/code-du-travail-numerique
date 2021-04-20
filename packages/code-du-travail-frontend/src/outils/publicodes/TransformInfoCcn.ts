import { FormContent } from "../common/type/WizardType";

export const transformInfoCcn = (form: FormContent): Record<string, string> => {
  const { ccn, ...formWithoutCcn } = form;
  const ccnId = ccn ? `'IDCC${ccn.num.toString().padStart(4, "0")}'` : "''";
  return {
    "contrat salarié - convention collective": ccnId,
    ...formWithoutCcn,
  };
};
