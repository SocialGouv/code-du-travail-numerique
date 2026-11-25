import { ToolSeoContentData, ToolSeoSlug } from "./types";

// Editorial texts displayed under the simulators so that the pages carry
// indexable content (#7584, #7586). Each h2 targets a common search query and
// stays short: Google reuses anchored headings as "jump to" links under the
// search result, and long ones get truncated.
export const TOOL_SEO_CONTENT: Record<ToolSeoSlug, ToolSeoContentData> = {
  "simulateur-embauche": {
    sections: [
      {
        id: "difference-brut-net",
        title: "Salaire brut ou salaire net : quelle est la différence ?",
        paragraphs: [
          "Le salaire brut correspond à l'ensemble des sommes versées au salarié avant déduction des cotisations et des contributions salariales (cotisations de sécurité sociale, CSG et CRDS notamment), ainsi que, selon les cas, des cotisations de prévoyance et de mutuelle.",
          "Le salaire net correspond au montant effectivement perçu par le salarié après déduction des cotisations et des contributions salariales et du prélèvement à la source de l'impôt sur le revenu.",
          "À noter : le salaire net à payer au salarié se distingue :",
        ],
        items: [
          "du salaire net avant impôt, qui correspond au salaire restant après déduction des cotisations salariales, mais avant le prélèvement à la source ;",
          "du montant net social, qui correspond au montant de référence à déclarer pour bénéficier de certaines prestations sociales.",
        ],
      },
      {
        id: "meme-brut-meme-net",
        title: "Un même salaire brut donne-t-il toujours le même salaire net ?",
        paragraphs: [
          "Deux salariés d'une même entreprise ayant le même salaire brut peuvent avoir un salaire net différent en fonction, notamment, de leur temps de travail, de leur couverture complémentaire et des cotisations salariales prélevées.",
        ],
      },
      {
        id: "convention-collective",
        title:
          "La convention collective a-t-elle un impact sur le montant du salaire net ?",
        paragraphs: [
          "La convention collective peut prévoir des garanties de prévoyance et de complémentaire santé qui ont une incidence sur le montant des cotisations salariales et donc sur le salaire net.",
        ],
      },
    ],
    references: ["R3243-1", "R3243-2"],
  },
};

export const getToolSeoContent = (slug: ToolSeoSlug): ToolSeoContentData =>
  TOOL_SEO_CONTENT[slug];
