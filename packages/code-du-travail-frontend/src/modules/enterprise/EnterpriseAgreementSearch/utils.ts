import { Agreement } from "src/modules/outils/indemnite-depart/types";

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
        "Ce code indique qu’aucune convention collective n’a été renseignée par l'entreprise. Pour savoir si une convention est tout de même appliquée, consultez votre bulletin de paie ou interrogez votre employeur.";
      disabled = true;
    } else {
      description =
        "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective.";
    }
    return {
      ...agreement,
      disabled,
      description,
    };
  });
};
