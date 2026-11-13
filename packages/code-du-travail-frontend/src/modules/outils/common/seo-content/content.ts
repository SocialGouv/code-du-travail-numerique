import { ToolSeoContentData, ToolSeoSlug } from "./types";

// Editorial texts validated by the legal team (#7584). They are displayed under
// the simulators so that the pages carry indexable content.
export const TOOL_SEO_CONTENT: Record<ToolSeoSlug, ToolSeoContentData> = {
  "simulateur-embauche": {
    title: "Comment passer d'un salaire brut à un salaire net ?",
    blocks: [
      {
        text: "Le salaire brut est le montant fixé dans le contrat de travail. Le salaire net est ce que le salarié reçoit après déduction des cotisations et contributions sociales salariales : assurance vieillesse, retraite complémentaire, CSG et CRDS, et selon les cas prévoyance et mutuelle.",
      },
      {
        lead: "La règle",
        text: "Ces prélèvements représentent en général environ 22 % du brut pour un salarié non cadre et environ 25 % pour un cadre. L'écart vient surtout de la retraite complémentaire et de la prévoyance des cadres. Le taux réel dépend du niveau de salaire, du temps de travail et des garanties prévues dans l'entreprise.",
      },
      {
        lead: "Exemple",
        text: "Un salarié non cadre payé 2 500 € brut par mois reçoit environ 1 950 € net avant impôt. Un cadre payé 2 500 € brut reçoit environ 1 875 € net avant impôt.",
      },
      {
        lead: "Net avant impôt, net à payer, net social",
        text: "Le bulletin de paie distingue :",
        items: [
          "le net avant impôt, calculé ci-dessus ;",
          "le net à payer, versé sur le compte, après le prélèvement à la source de l'impôt sur le revenu ;",
          "le montant net social, qui sert aux demandes de prime d'activité et de RSA.",
        ],
      },
      {
        lead: "Cas particuliers",
        text: "Les apprentis, les salariés à temps partiel et les heures supplémentaires suivent des règles de cotisations différentes. Le simulateur en tient compte.",
      },
      {
        lead: "Convention collective",
        text: "Elle fixe les salaires minimaux de chaque classification et peut prévoir des garanties de prévoyance qui changent le net.",
      },
    ],
    references:
      "articles L3243-2 et R3243-1 du Code du travail (bulletin de paie).",
  },
  "preavis-demission": {
    title: "Quelle est la durée du préavis en cas de démission ?",
    blocks: [
      {
        text: "Le salarié en CDI qui démissionne doit en principe respecter un préavis avant de quitter l'entreprise.",
      },
      {
        lead: "La règle",
        text: "Le Code du travail ne fixe pas de durée générale. Elle est prévue par la convention collective, un accord d'entreprise, les usages de la profession ou le contrat de travail. Dans beaucoup de conventions collectives, elle va de 1 mois pour un employé à 3 mois pour un cadre, parfois en fonction de l'ancienneté. Sans aucune règle applicable, aucun préavis n'est dû.",
      },
      {
        lead: "Quand commence-t-il ?",
        text: "Le préavis démarre le jour où l'employeur reçoit la démission (lettre remise en main propre ou recommandée). Il n'est pas suspendu par les congés payés, sauf accord entre les parties.",
      },
      {
        lead: "Exemple",
        text: "Une salariée cadre dont la convention prévoit 3 mois remet sa démission le 10 mars. Son contrat prend fin le 9 juin au soir, sauf dispense.",
      },
      {
        lead: "Dispense de préavis",
        items: [
          "Si l'employeur dispense le salarié, il lui verse une indemnité compensatrice égale au salaire de la période non travaillée.",
          "Si c'est le salarié qui demande à partir plus tôt et que l'employeur accepte, la période non travaillée n'est pas payée.",
          "Si le salarié part sans accord, l'employeur peut lui réclamer des dommages et intérêts.",
        ],
      },
      {
        lead: "Convention collective",
        text: "C'est elle qui donne la durée : renseignez-la dans le simulateur pour obtenir le préavis exact.",
      },
    ],
    references: "article L1237-1 du Code du travail.",
  },
  "indemnite-precarite": {
    title: "Qu'est-ce que la prime de précarité en fin de CDD ?",
    blocks: [
      {
        text: "À la fin d'un CDD, le salarié perçoit en principe une indemnité de fin de contrat, appelée prime de précarité. Elle compense l'absence d'emploi stable. Elle est versée avec le dernier salaire.",
      },
      {
        lead: "La règle",
        text: "Elle est égale à 10 % de la rémunération brute totale perçue pendant le contrat, primes comprises. Une convention ou un accord de branche peut la limiter à 6 % si le salarié a accès à des actions de formation.",
      },
      {
        lead: "Exemple",
        text: "Un CDD de 6 mois payé 2 000 € brut par mois, avec une prime de 300 € : rémunération totale 12 300 €, prime de précarité 1 230 €. L'indemnité de congés payés se calcule ensuite sur ce total, prime de précarité comprise.",
      },
      {
        lead: "Les cas où elle n'est pas due",
        text: "Les principaux :",
        items: [
          "le CDD se poursuit en CDI ;",
          "le salarié refuse un CDI pour le même emploi ou un emploi similaire, avec une rémunération au moins équivalente ;",
          "le salarié rompt le CDD de façon anticipée, ou le contrat est rompu pour faute grave ou force majeure ;",
          "contrat saisonnier ou CDD d'usage, sauf convention plus favorable ;",
          "emploi d'un jeune pendant ses vacances scolaires ou universitaires ;",
          "certains contrats aidés ou de formation, dont le contrat d'apprentissage et le contrat de professionnalisation.",
        ],
      },
      {
        lead: "Intérim",
        text: "Pour une mission d'intérim, l'équivalent est l'indemnité de fin de mission, aussi de 10 %.",
      },
      {
        lead: "Convention collective",
        text: "Elle peut prévoir un taux réduit (6 %) ou plus favorable.",
      },
    ],
    references: "articles L1243-8, L1243-9 et L1243-10 du Code du travail.",
  },
  "indemnite-rupture-conventionnelle": {
    title:
      "Quel est le montant minimum de l'indemnité de rupture conventionnelle ?",
    blocks: [
      {
        text: "En cas de rupture conventionnelle d'un CDI, le salarié reçoit une indemnité spécifique. Son montant est négocié entre le salarié et l'employeur, mais il ne peut pas être inférieur à un minimum.",
      },
      {
        lead: "La règle",
        text: "Le minimum est l'indemnité légale de licenciement, ou l'indemnité conventionnelle si la convention collective est plus favorable. L'indemnité légale vaut :",
        items: [
          "1/4 de mois de salaire par année d'ancienneté jusqu'à 10 ans ;",
          "1/3 de mois par année au-delà de 10 ans.",
        ],
      },
      {
        text: "Le salaire de référence est le plus favorable entre la moyenne des 12 derniers mois et celle des 3 derniers mois. Contrairement au licenciement, aucune ancienneté minimale de 8 mois n'est exigée : l'indemnité est calculée au prorata des mois de présence.",
      },
      {
        lead: "Exemple",
        text: "Un salarié avec 5 ans d'ancienneté et un salaire de référence de 2 000 € brut : 2 000 × 1/4 × 5 = 2 500 € minimum.",
      },
      {
        lead: "La procédure",
        text: "Un ou plusieurs entretiens, la signature d'une convention, un délai de rétractation de 15 jours calendaires, puis une demande d'homologation à l'administration, qui dispose de 15 jours ouvrables pour répondre. Le contrat ne peut pas prendre fin avant le lendemain de l'homologation.",
      },
      {
        lead: "Convention collective",
        text: "Si elle prévoit une indemnité de licenciement plus élevée, c'est ce montant qui sert de minimum dans la plupart des branches.",
      },
    ],
    references:
      "articles L1237-11 à L1237-16, L1234-9 et R1234-1 à R1234-4 du Code du travail.",
  },
  "convention-collective": {
    title: "Comment trouver sa convention collective ?",
    blocks: [
      {
        text: "La convention collective est un accord signé au niveau d'une branche professionnelle. Elle complète le Code du travail sur les salaires minimaux, le préavis, les indemnités, la durée du travail ou les congés. Elle s'applique à tous les salariés de l'entreprise qui relève de la branche.",
      },
      {
        lead: "Où la trouver",
        items: [
          "Sur le bulletin de paie : l'employeur doit y indiquer l'intitulé de la convention applicable.",
          "Dans le contrat de travail ou la lettre d'embauche.",
          "Sur l'affichage ou l'intranet de l'entreprise : l'employeur doit informer les salariés des textes applicables.",
          "Avec ce moteur de recherche, à partir du nom de l'entreprise, de son numéro SIRET ou de son activité.",
        ],
      },
      {
        lead: "L'IDCC",
        text: "Chaque convention a un identifiant à 4 chiffres, l'IDCC. Exemples : 1486 pour les bureaux d'études techniques (Syntec), 1979 pour les hôtels, cafés, restaurants, 2216 pour le commerce de détail et de gros à prédominance alimentaire.",
      },
      {
        lead: "Ce qui détermine la convention",
        text: "C'est l'activité principale réelle de l'entreprise. Le code APE (ou NAF) donne une indication, mais il ne suffit pas à lui seul. Une entreprise peut aussi ne relever d'aucune convention : seul le Code du travail s'applique alors.",
      },
      {
        lead: "Pourquoi c'est important",
        text: "La convention peut prévoir des règles plus favorables que la loi : préavis, indemnité de licenciement, primes, maintien du salaire en arrêt maladie. Les simulateurs du Code du travail numérique en tiennent compte quand vous la renseignez.",
      },
    ],
    references: "articles L2261-2, R2262-1 et R3243-1 du Code du travail.",
  },
  "indemnite-retraite": {
    title: "Quel est le montant de l'indemnité de départ à la retraite ?",
    blocks: [
      {
        text: "Le salarié qui quitte l'entreprise pour partir à la retraite a droit à une indemnité. Son montant dépend de qui prend l'initiative du départ.",
      },
      {
        lead: "Départ volontaire (à l'initiative du salarié)",
        text: "Avec au moins 10 ans d'ancienneté, l'indemnité légale vaut :",
        items: [
          "1/2 mois de salaire après 10 ans ;",
          "1 mois après 15 ans ;",
          "1 mois et demi après 20 ans ;",
          "2 mois après 30 ans.",
        ],
      },
      {
        lead: "Mise à la retraite (à l'initiative de l'employeur)",
        text: "L'indemnité est au moins égale à l'indemnité légale de licenciement, souvent plus élevée. L'employeur ne peut mettre un salarié à la retraite qu'à partir de 70 ans, ou dès l'âge du taux plein automatique (67 ans) si le salarié ne s'y oppose pas.",
      },
      {
        lead: "Salaire de référence",
        text: "Le plus favorable entre la moyenne des 12 derniers mois et celle des 3 derniers mois.",
      },
      {
        lead: "Exemple",
        text: "Une salariée part volontairement avec 22 ans d'ancienneté et un salaire de référence de 3 000 € brut : 1,5 × 3 000 = 4 500 €. Si son employeur l'avait mise à la retraite, le minimum serait l'indemnité de licenciement : 3 000 × (10 × 1/4 + 12 × 1/3) = 19 500 €.",
      },
      {
        lead: "Préavis",
        text: "Dans les deux cas, un préavis est dû, de même durée que pour un licenciement.",
      },
      {
        lead: "Convention collective",
        text: "Elle prévoit souvent une indemnité plus favorable : c'est le montant le plus élevé qui s'applique.",
      },
    ],
    references:
      "articles L1237-5 à L1237-10, D1237-1 et D1237-2 du Code du travail.",
  },
  "preavis-licenciement": {
    title: "Quelle est la durée du préavis en cas de licenciement ?",
    blocks: [
      {
        text: "Le salarié licencié en CDI effectue un préavis, sauf faute grave ou lourde. Pendant cette période, il continue à travailler et à être payé.",
      },
      {
        lead: "La règle légale",
        text: "Elle dépend de l'ancienneté :",
        items: [
          "moins de 6 mois : durée fixée par la convention collective ou les usages ;",
          "de 6 mois à moins de 2 ans : 1 mois ;",
          "2 ans et plus : 2 mois.",
        ],
      },
      {
        text: "Pour un salarié reconnu travailleur handicapé, la durée légale est doublée, dans la limite de 3 mois.",
      },
      {
        lead: "Exemple",
        text: "Un salarié avec 4 ans d'ancienneté reçoit sa lettre de licenciement le 15 avril. Son préavis de 2 mois court du 15 avril au 14 juin.",
      },
      {
        lead: "Dispense et cas particuliers",
        items: [
          "Si l'employeur dispense le salarié de préavis, il lui verse une indemnité compensatrice égale au salaire qu'il aurait perçu.",
          "En cas de licenciement pour inaptitude d'origine non professionnelle, le préavis n'est pas effectué ni payé, mais il compte dans l'ancienneté.",
          "En cas d'inaptitude d'origine professionnelle, une indemnité égale au préavis est versée.",
        ],
      },
      {
        lead: "Convention collective",
        text: "Elle peut prévoir un préavis plus long : c'est la durée la plus favorable au salarié qui s'applique.",
      },
    ],
    references:
      "articles L1234-1 à L1234-5, L5213-9 et L1226-14 du Code du travail.",
  },
  "preavis-retraite": {
    title: "Quel préavis respecter pour un départ à la retraite ?",
    blocks: [
      {
        text: "Qu'il parte de lui-même ou qu'il soit mis à la retraite par l'employeur, le salarié en CDI doit respecter un préavis.",
      },
      {
        lead: "La règle",
        text: "La durée est la même que pour un licenciement :",
        items: [
          "moins de 6 mois d'ancienneté : durée fixée par la convention collective ou les usages ;",
          "de 6 mois à moins de 2 ans : 1 mois ;",
          "2 ans et plus : 2 mois.",
        ],
      },
      {
        text: "Pour un départ volontaire, la convention collective ou le contrat peuvent prévoir une durée différente. Pour une mise à la retraite, une durée plus longue prévue par la convention s'applique.",
      },
      {
        lead: "Exemple",
        text: "Une salariée avec 25 ans d'ancienneté veut partir le 30 juin. Elle doit informer son employeur au plus tard le 30 avril, soit 2 mois avant.",
      },
      {
        lead: "Bon à savoir",
        text: "Prévenir l'employeur assez tôt permet aussi de préparer la demande de retraite auprès des caisses, qui se fait en général 4 à 6 mois avant la date de départ.",
      },
      {
        lead: "Convention collective",
        text: "Elle peut prévoir une durée plus favorable : renseignez-la dans le simulateur.",
      },
    ],
    references: "articles L1237-6, L1237-10 et L1234-1 du Code du travail.",
  },
};

export const getToolSeoContent = (slug: ToolSeoSlug): ToolSeoContentData =>
  TOOL_SEO_CONTENT[slug];
