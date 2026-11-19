import { ToolSeoContentData, ToolSeoSlug } from "./types";

// Editorial texts displayed under the simulators so that the pages carry
// indexable content (#7584, #7586). Each h2 targets a common search query.
export const TOOL_SEO_CONTENT: Record<ToolSeoSlug, ToolSeoContentData> = {
  "simulateur-embauche": {
    sections: [
      {
        id: "difference-salaire-brut-net",
        title: "Quelle est la différence entre salaire brut et salaire net ?",
        text: "Le salaire brut est le montant fixé dans le contrat de travail. Le salaire net est ce que le salarié reçoit après déduction des cotisations et contributions sociales salariales : assurance vieillesse, retraite complémentaire, CSG et CRDS, et selon les cas prévoyance et mutuelle.",
      },
      {
        id: "calculer-salaire-net",
        title: "Comment convertir un salaire brut en net ?",
        text: "Les cotisations salariales représentent en général environ 22 % du brut pour un salarié non cadre et environ 25 % pour un cadre. Pour une estimation rapide, multipliez le salaire brut par 0,78 (non cadre) ou par 0,75 (cadre). L'écart vient surtout de la retraite complémentaire et de la prévoyance des cadres. Le taux réel dépend du niveau de salaire, du temps de travail et des garanties prévues dans l'entreprise : le simulateur calcule le montant exact.",
      },
      {
        id: "exemple-brut-net",
        title: "Combien font 2 000 € ou 2 500 € brut en net ?",
        text: "Un salarié non cadre payé 2 500 € brut par mois reçoit environ 1 950 € net avant impôt. Un cadre payé 2 500 € brut reçoit environ 1 875 € net avant impôt. Pour 2 000 € brut, le net avant impôt est d'environ 1 560 € pour un non cadre et 1 500 € pour un cadre.",
      },
      {
        id: "net-avant-impot-net-a-payer",
        title:
          "Net avant impôt, net à payer, net social : quelles différences ?",
        text: "Le bulletin de paie distingue :",
        items: [
          "le net avant impôt, calculé ci-dessus ;",
          "le net à payer, versé sur le compte, après le prélèvement à la source de l'impôt sur le revenu ;",
          "le montant net social, qui sert aux demandes de prime d'activité et de RSA.",
        ],
      },
      {
        id: "cas-particuliers",
        title:
          "Apprentis, temps partiel, heures supplémentaires : quel salaire net ?",
        text: "Les apprentis, les salariés à temps partiel et les heures supplémentaires suivent des règles de cotisations différentes. Le simulateur en tient compte.",
      },
      {
        id: "convention-collective",
        title: "La convention collective change-t-elle le salaire net ?",
        text: "Elle fixe les salaires minimaux de chaque classification et peut prévoir des garanties de prévoyance qui changent le net.",
      },
    ],
    references:
      "articles L3243-2 et R3243-1 du Code du travail (bulletin de paie).",
  },
};

export const getToolSeoContent = (slug: ToolSeoSlug): ToolSeoContentData =>
  TOOL_SEO_CONTENT[slug];
