import { Agreement } from "src/modules/outils/common/indemnite-depart/types";

export type DescribedEnterpriseAgreement = Agreement & {
  disabled: boolean;
  description: string;
};

export const getEnterpriseAgreements = (agreements: Agreement[]) => {
  return agreements.map((agreement) => {
    const { slug, url, contributions } = agreement;
    let disabled = false;
    let description;
    if (slug && !(url || contributions)) {
      description =
        "Nous n’avons pas d’informations concernant cette convention collective";
      disabled = true;
    } else if (!slug) {
      description =
        "Cette convention collective déclarée par l’entreprise n’est pas reconnue par notre site";
      disabled = true;
    } else {
      description =
        "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective";
    }
    return {
      ...agreement,
      disabled,
      description,
    };
  });
};
