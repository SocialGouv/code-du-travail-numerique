/** @jest-environment node */

import { fetchFicheSP } from "../queries";

describe("Fiches SP", () => {
  it("fetchFicheSP", async () => {
    const result = await fetchFicheSP(
      "arret-maladie-pendant-le-preavis-quelles-consequences"
    );
    expect(result).toEqual({
      _id: "4",
      breadcrumbs: [
        {
          label: "Santé, sécurité et conditions de travail",
          position: 6,
          slug: "/themes/sante-securite-et-conditions-de-travail",
        },
        {
          label: "Santé au travail",
          position: 3,
          slug: "/themes/sante-au-travail",
        },
        {
          label: "Maladie",
          position: 1,
          slug: "/themes/maladie",
        },
      ],
      cdtnId: "36c2fc8868",
      date: "09/10/2019",
      description:
        "Le salarié en arrêt maladie pendant son préavis perçoit les indemnités habituelles. Le préavis est prolongé si l'arrêt est d'origine professionnelle.",
      raw: {
        attributes: {
          ID: "F2614",
          spUrl: "https://www.service-public.fr/particuliers/vosdroits/F2614",
          type: "Fiche Question-réponse",
          "xmlns:dc": "http://purl.org/dc/elements/1.1/",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:noNamespaceSchemaLocation": "../Schemas/3.3/Publication.xsd",
        },
        children: [
          {
            children: [
              {
                text: "Arrêt maladie pendant le préavis : quelles conséquences ?",
                type: "text",
              },
            ],
            name: "dc:title",
            type: "element",
          },
          {
            children: [
              {
                text: "Direction de l'information légale et administrative",
                type: "text",
              },
            ],
            name: "dc:creator",
            type: "element",
          },
          {
            children: [
              {
                text: "Travail",
                type: "text",
              },
            ],
            name: "dc:subject",
            type: "element",
          },
          {
            children: [
              {
                text: "Le salarié en arrêt maladie pendant son préavis perçoit les indemnités habituelles. Le préavis est prolongé si l'arrêt est d'origine professionnelle.",
                type: "text",
              },
            ],
            name: "dc:description",
            type: "element",
          },
          {
            children: [
              {
                text: "Direction de l'information légale et administrative",
                type: "text",
              },
            ],
            name: "dc:publisher",
            type: "element",
          },
          {
            children: [
              {
                text: "Direction de l'information légale et administrative (Premier ministre)",
                type: "text",
              },
            ],
            name: "dc:contributor",
            type: "element",
          },
          {
            children: [
              {
                text: "modified 2019-10-09",
                type: "text",
              },
            ],
            name: "dc:date",
            type: "element",
          },
          {
            children: [
              {
                text: "Question-réponse",
                type: "text",
              },
            ],
            name: "dc:type",
            type: "element",
          },
          {
            children: [
              {
                text: "text/xml",
                type: "text",
              },
            ],
            name: "dc:format",
            type: "element",
          },
          {
            children: [
              {
                text: "F2614",
                type: "text",
              },
            ],
            name: "dc:identifier",
            type: "element",
          },
          {
            children: [
              {
                text: "https://www.legifrance.gouv.fr/affichJuriJudi.do?idTexte=JURITEXT000007023096, https://www.legifrance.gouv.fr/affichJuriJudi.do?idTexte=JURITEXT000007038010",
                type: "text",
              },
            ],
            name: "dc:source",
            type: "element",
          },
          {
            children: [
              {
                text: "Fr",
                type: "text",
              },
            ],
            name: "dc:language",
            type: "element",
          },
          {
            children: [
              {
                text: "isPartOf N526",
                type: "text",
              },
            ],
            name: "dc:relation",
            type: "element",
          },
          {
            children: [
              {
                text: "France entière",
                type: "text",
              },
            ],
            name: "dc:coverage",
            type: "element",
          },
          {
            children: [
              {
                text: "https://www.service-public.fr/a-propos/mentions-legales",
                type: "text",
              },
            ],
            name: "dc:rights",
            type: "element",
          },
          {
            children: [
              {
                text: "Question-réponse",
                type: "text",
              },
            ],
            name: "SurTitre",
            type: "element",
          },
          {
            children: [
              {
                text: "Particuliers",
                type: "text",
              },
            ],
            name: "Audience",
            type: "element",
          },
          {
            children: [
              {
                text: "www.service-public.fr",
                type: "text",
              },
            ],
            name: "Canal",
            type: "element",
          },
          {
            children: [
              {
                attributes: {
                  ID: "Particuliers",
                },
                children: [
                  {
                    text: "Accueil particuliers",
                    type: "text",
                  },
                ],
                name: "Niveau",
                type: "element",
              },
              {
                attributes: {
                  ID: "N19806",
                },
                children: [
                  {
                    text: "Travail",
                    type: "text",
                  },
                ],
                name: "Niveau",
                type: "element",
              },
              {
                attributes: {
                  ID: "N526",
                },
                children: [
                  {
                    text: "Maladie ou accident du travail dans le secteur privé",
                    type: "text",
                  },
                ],
                name: "Niveau",
                type: "element",
              },
              {
                attributes: {
                  ID: "F2614",
                  type: "Fiche Question-réponse",
                },
                children: [
                  {
                    text: "Arrêt maladie pendant le préavis : quelles conséquences ?",
                    type: "text",
                  },
                ],
                name: "Niveau",
                type: "element",
              },
            ],
            name: "FilDAriane",
            type: "element",
          },
          {
            attributes: {
              ID: "N19806",
            },
            children: [
              {
                children: [
                  {
                    text: "Travail",
                    type: "text",
                  },
                ],
                name: "Titre",
                type: "element",
              },
            ],
            name: "Theme",
            type: "element",
          },
          {
            attributes: {
              ID: "N19965",
            },
            children: [
              {
                text: "Santé, sécurité et conditions de travail",
                type: "text",
              },
            ],
            name: "SousThemePere",
            type: "element",
          },
          {
            attributes: {
              ID: "N526",
            },
            children: [
              {
                children: [
                  {
                    text: "Maladie ou accident du travail dans le secteur privé",
                    type: "text",
                  },
                ],
                name: "Titre",
                type: "element",
              },
              {
                attributes: {
                  ID: "N526-1",
                },
                children: [
                  {
                    children: [
                      {
                        text: "Arrêt maladie",
                        type: "text",
                      },
                    ],
                    name: "Titre",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F303",
                    },
                    children: [
                      {
                        text: "Démarches à effectuer",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F3053",
                    },
                    children: [
                      {
                        text: "Indemnités journalières versées au salarié",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F144",
                    },
                    children: [
                      {
                        text: "Reprise du travail",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F726",
                    },
                    children: [
                      {
                        text: "Inaptitude du salarié",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                ],
                name: "SousDossier",
                type: "element",
              },
              {
                attributes: {
                  ID: "N526-2",
                },
                children: [
                  {
                    children: [
                      {
                        text: "Accident du travail",
                        type: "text",
                      },
                    ],
                    name: "Titre",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F171",
                    },
                    children: [
                      {
                        text: "Démarches à effectuer",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F175",
                    },
                    children: [
                      {
                        text: "Indemnités journalières pendant l'arrêt de travail",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F14840",
                    },
                    children: [
                      {
                        text: "Indemnisation en cas d'incapacité permanente",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F32157",
                    },
                    children: [
                      {
                        text: "Reprise du travail",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F15341",
                    },
                    children: [
                      {
                        text: "Inaptitude du salarié",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                ],
                name: "SousDossier",
                type: "element",
              },
              {
                attributes: {
                  ID: "N526-3",
                },
                children: [
                  {
                    children: [
                      {
                        text: "Maladie professionnelle",
                        type: "text",
                      },
                    ],
                    name: "Titre",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F176",
                    },
                    children: [
                      {
                        text: "Démarches à effectuer",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F32148",
                    },
                    children: [
                      {
                        text: "Indemnités journalières pendant l'arrêt de travail",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F348",
                    },
                    children: [
                      {
                        text: "Indemnisation en cas d'incapacité permanente",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F32158",
                    },
                    children: [
                      {
                        text: "Reprise du travail",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                  {
                    attributes: {
                      ID: "F32161",
                    },
                    children: [
                      {
                        text: "Inaptitude du salarié",
                        type: "text",
                      },
                    ],
                    name: "Fiche",
                    type: "element",
                  },
                ],
                name: "SousDossier",
                type: "element",
              },
            ],
            name: "DossierPere",
            type: "element",
          },
          {
            children: [
              {
                children: [
                  {
                    text: "Vous pouvez être en arrêt de travail pour maladie durant votre préavis (de démission, de licenciement, etc.). Vous percevez alors les ",
                    type: "text",
                  },
                  {
                    attributes: {
                      LienPublication: "F3053",
                      audience: "Particuliers",
                      type: "Fiche d'information",
                    },
                    children: [
                      {
                        text: "indemnités journalières versées par la Sécurité sociale et, si vous y avez droit, l'indemnité complémentaire de l'employeur",
                        type: "text",
                      },
                    ],
                    name: "LienInterne",
                    type: "element",
                  },
                  {
                    text: ".",
                    type: "text",
                  },
                ],
                name: "Paragraphe",
                type: "element",
              },
              {
                children: [
                  {
                    text: "Concernant la durée du préavis, la possibilité de reporter son terme dépend de l'origine professionnelle ou non professionnelle de la maladie ou de l'accident.",
                    type: "text",
                  },
                ],
                name: "Paragraphe",
                type: "element",
              },
              {
                attributes: {
                  affichage: "onglet",
                },
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            text: "Cas général",
                            type: "text",
                          },
                        ],
                        name: "Titre",
                        type: "element",
                      },
                      {
                        children: [
                          {
                            text: "L’arrêt de travail pour maladie non professionnelle n’interrompt pas le préavis. Par conséquent, le préavis n'est pas prolongé.",
                            type: "text",
                          },
                        ],
                        name: "Paragraphe",
                        type: "element",
                      },
                      {
                        children: [
                          {
                            text: "Vous n'êtes pas en droit d'obtenir le versement d'une ",
                            type: "text",
                          },
                          {
                            attributes: {
                              LienPublication: "F24660",
                              audience: "Particuliers",
                              type: "Fiche d'information",
                            },
                            children: [
                              {
                                text: "indemnité compensatrice",
                                type: "text",
                              },
                            ],
                            name: "LienInterne",
                            type: "element",
                          },
                          {
                            text: " pour la période de préavis non effectuée en raison de l'arrêt maladie.",
                            type: "text",
                          },
                        ],
                        name: "Paragraphe",
                        type: "element",
                      },
                      {
                        children: [
                          {
                            text: "Le contrat s'achève à la date initialement prévue. Ainsi, vous revenez travailler si votre arrêt maladie s'achève avant la date de fin de votre contrat (sauf dispense de l'employeur).",
                            type: "text",
                          },
                        ],
                        name: "Paragraphe",
                        type: "element",
                      },
                    ],
                    name: "Cas",
                    type: "element",
                  },
                  {
                    children: [
                      {
                        children: [
                          {
                            text: "Accident du travail ou maladie professionnelle",
                            type: "text",
                          },
                        ],
                        name: "Titre",
                        type: "element",
                      },
                      {
                        children: [
                          {
                            text: "L'arrêt de travail pour cause d'accident du travail ou de maladie professionnelle interrompt le préavis. Par conséquent, le préavis est prolongé d'une durée équivalente à celle de l'arrêt de travail.",
                            type: "text",
                          },
                        ],
                        name: "Paragraphe",
                        type: "element",
                      },
                    ],
                    name: "Cas",
                    type: "element",
                  },
                ],
                name: "BlocCas",
                type: "element",
              },
            ],
            name: "Texte",
            type: "element",
          },
          {
            attributes: {
              ID: "R53377",
              URL: "https://www.legifrance.gouv.fr/affichJuriJudi.do?idTexte=JURITEXT000007023096",
              type: "Texte de référence",
            },
            children: [
              {
                children: [
                  {
                    text: "Cour de cassation - Chambre sociale - n° 46-42931",
                    type: "text",
                  },
                ],
                name: "Titre",
                type: "element",
              },
            ],
            name: "Reference",
            type: "element",
          },
          {
            attributes: {
              ID: "R53379",
              URL: "https://www.legifrance.gouv.fr/affichJuriJudi.do?idTexte=JURITEXT000007038010",
              type: "Texte de référence",
            },
            children: [
              {
                children: [
                  {
                    text: "Cour de cassation - Chambre sociale - n° 93-43581",
                    type: "text",
                  },
                ],
                name: "Titre",
                type: "element",
              },
            ],
            name: "Reference",
            type: "element",
          },
        ],
        name: "Publication",
        type: "element",
      },
      referencedTexts: [],
      slug: "arret-maladie-pendant-le-preavis-quelles-consequences",
      title: "Arrêt maladie pendant le préavis : quelles conséquences ?",
      url: "https://www.service-public.fr/particuliers/vosdroits/F2614",
    });
  });
});
