import { Tool } from "@socialgouv/cdtn-types";

export const fetchTools = async (_params: any): Promise<Tool[]> => {
  return Promise.resolve([
    {
      date: "18/10/2018",
      icon: "Indemnity",
      order: 1,
      action: "Estimer",
      metaTitle: "Simulateur - Calcul de l'indemnité de licenciement",
      questions: [
        "Quelle est mon indemnité de licenciement",
        "Comment calculer mon indemnité de licenciement",
        "indemnité de licenciement pour inaptitude d'origine professionnelle",
        "indemnité de licenciement pour inaptitude d'origine professionnelle",
        "indemnité spéciale de licenciement pour inaptitude d'origine professionnelle",
        "indemnité de licenciement en cas d'alternance temps plein temps partiel",
        "calculez le montant d'une indemnité de licenciement en fonction de votre situation",
      ],
      description:
        "Estimez simplement le montant de l’indemnité de licenciement",
      displayTitle: "Calculer l'indemnité de licenciement",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 7,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Licenciement : droits des salariés et procédures",
          position: 4,
          slug: "/themes/licenciement-droits-des-salaries-et-procedures",
        },
      ],
      cdtnId: "d8a3605790",
      excludeFromSearch: false,
      id: "085a07ba-2936-4b0c-89c5-89c3e0cdb773",
      isPublished: true,
      metaDescription:
        "Estimez simplement le montant de l’indemnité de licenciement",
      slug: "indemnite-licenciement",
      source: "outils",
      text: "Quelle est mon indemnité de licenciement\nComment calculer mon indemnité de licenciement\nindemnité de licenciement pour inaptitude d’origine professionnelle\nindemnité de licenciement pour inaptitude d’origine professionnelle\nindemnité spéciale de licenciement pour inaptitude ’origine professionnelle\nindemnité de licenciement en cas d’alternance temps plein temps partiel\ncalculez le montant d’une indemnité de licenciement en fonction de votre situation",
      title: "Indemnité de licenciement",
      _id: "d8a3605790",
      displayTool: true,
    },
  ] as any as Tool[]);
};
