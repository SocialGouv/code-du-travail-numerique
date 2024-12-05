import { SOURCES } from "@socialgouv/cdtn-utils";

export const agreementRelatedItems = [
  {
    title: "Articles liés",
    items: [
      {
        url: `/fiche-service-public/convention-collective`,
        title: "Convention collective",
        source: SOURCES.SHEET_SP,
      },
      {
        url: `/fiche-service-public/comment-consulter-un-accord-dentreprise`,
        source: SOURCES.SHEET_SP,
        title: "Comment consulter un accord d'entreprise ?",
      },
      {
        url: `/droit-du-travail/#hierarchie`,
        source: SOURCES.LABOUR_LAW,
        title:
          "Droit du travail: Existe-t-il une hiérarchie entre les textes ?",
      },
    ],
  },
];
