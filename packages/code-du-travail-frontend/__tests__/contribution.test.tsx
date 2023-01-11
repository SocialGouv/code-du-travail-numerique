import { render } from "@testing-library/react";
import React from "react";

import FicheContribution from "../pages/contribution/[slug]";

const data = {
  answers: {
    conventions: [
      {
        idcc: "1996",
        markdown: "La convention collective ne prévoit rien sur ce point.",
        references: [],
      },
      {
        idcc: "2111",
        markdown:
          "Le décès de l’employeur met fin au contrat de travail. Le contrat ne se poursuit pas automatiquement avec les héritiers. Ces derniers doivent notifier au salarié la lettre de licenciement. \n\nLa date du décès de l’employeur fixe le départ du préavis.\n\nSont dus au salarié :\n\n- Le dernier salaire ;\n- Les indemnités de préavis et de licenciement auxquelles le salarié peut prétendre ;\n- L’indemnité de congés payés.",
        references: [
          {
            agreement: {
              active: true,
              date_publi: "2000-03-11T00:00:00.000Z",
              effectif: 1173,
              etat: "VIGUEUR_ETEN",
              id: "KALICONT000005635792",
              mtime: 1561665007,
              nature: "IDCC",
              num: 2111,
              shortTitle: "Salariés du particulier employeur",
              texte_de_base: "KALITEXT000005672603",
              title:
                "Convention collective nationale des salariés du particulier employeur du 24 novembre 1999.  ",
              url:
                "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635792",
            },
            answer_id: "7affe443-d898-4766-8cc7-387bd0b95193",
            category: "agreement",
            created_at: "2019-08-05T13:26:01.095555+00:00",
            id: "1d46ea4d-cc4e-4f9c-a8d2-e379e261ccce",
            title: "Article 13",
            updated_at: "2019-08-05T13:26:01.095555+00:00",
            url: null,
          },
          {
            answer_id: "7affe443-d898-4766-8cc7-387bd0b95193",
            category: null,
            created_at: "2019-09-18T13:14:43.564732+00:00",
            id: "290746f9-7474-41e7-8360-ef48061eff9d",
            title: "Cass. Soc., 26 septembre 2012, n°11-11697",
            updated_at: "2019-09-18T13:14:43.564732+00:00",
            url:
              "https://www.legifrance.gouv.fr/affichJuriJudi.do?oldAction=rechJuriJudi&idTexte=JURITEXT000026442060&fastReqId=167357055&fastPos=1",
          },
        ],
      },
    ],
    generic: {
      description:
        "Le décès de l’employeur a des conséquences différentes sur le contrat de travail, selon que l’employeur est une entreprise individuelle ou un employeur…",
      markdown:
        "Le décès de l’employeur a des conséquences différentes sur le contrat de travail, selon que l’employeur est une entreprise individuelle ou un employeur particulier.\n\nLorsque l’employeur est une entreprise individuelle (artisan, etc.),  les héritiers de l'entrepreneur peuvent décider de :\n\n- Poursuivre l’activité : dans ce cas, il n’y a aucune conséquence sur les contrats de travail ;\n\n- Vendre l’entreprise dans son ensemble : dans ce cas, les contrats de travail sont transférés automatiquement à l’acheteur, en application de l’article L1224-1 du code du travail. Ce principe s'applique aux entreprises et aux salariés.\n\n- Fermer l’entreprise : dans ce cas, les salariés seront licenciés pour motif économique en application de l’article L1233-3 du code du travail.\n\nLorsque l’employeur est un particulier, son décès peut entraîner la fin du contrat de travail. La convention collective applicable en définit les conditions.\n\nPour plus d'informations, voir la fiche :\n[Que devient le contrat du salarié au décès du particulier employeur ?](https://www.service-public.fr/particuliers/vosdroits/F31231)\n\n_Sources_ :\n[Article L1233-3 du code du travail](https://www.legifrance.gouv.fr/affichCodeArticle.do;?idArticle=LEGIARTI000036762081&cidTexte=LEGITEXT000006072050)\n[Article L1224-1 du code du travail](https://www.legifrance.gouv.fr/affichCodeArticle.do;?idArticle=LEGIARTI000006900875&cidTexte=LEGITEXT000006072050)",
      references: [],
      text:
        "Le décès de l’employeur a des conséquences différentes sur le contrat de travail, selon que l’employeur est une entreprise individuelle ou un employeur particulier.\nLorsque l’employeur est une entreprise individuelle (artisan, etc.),  les héritiers de l'entrepreneur peuvent décider de :\n\nPoursuivre l’activité : dans ce cas, il n’y a aucune conséquence sur les contrats de travail ;\n\nVendre l’entreprise dans son ensemble : dans ce cas, les contrats de travail sont transférés automatiquement à l’acheteur, en application de l’article L1224-1 du code du travail. Ce principe s'applique aux entreprises et aux salariés.\n\nFermer l’entreprise : dans ce cas, les salariés seront licenciés pour motif économique en application de l’article L1233-3 du code du travail.\n\nLorsque l’employeur est un particulier, son décès peut entraîner la fin du contrat de travail. La convention collective applicable en définit les conditions.\n\nPour plus d'informations, voir la fiche :\nQue devient le contrat du salarié au décès du particulier employeur ?\n\nSources :\nArticle L1233-3 du code du travail\nArticle L1224-1 du code du travail",
    },
  },
  breadcrumbs: [
    {
      label: "Départ de l'entreprise",
      slug: "/themes/8-depart-de-lentreprise",
    },
    {
      label: "Autres départs",
      slug: "/themes/86-autres-departs",
    },
  ],
  description:
    "Le décès de l’employeur a des conséquences différentes sur le contrat de travail, selon que l’employeur est une entreprise individuelle ou un employeur particulier.\nLorsque l’employeur est une entreprise individuelle (artisan, etc.),  les héritiers de l'entrepreneur peuvent décider de :\n\nPoursuivre l’activité : dans ce cas, il n’y a aucune conséquence sur les contrats de travail ;\n\nVendre l’entreprise dans son ensemble : dans ce cas, les contrats de travail sont transférés automatiquement à l’acheteur, en application de l’article L1224-1 du code du travail. Ce principe s'applique aux entreprises et aux salariés.\n\nFermer l’entreprise : dans ce cas, les salariés seront licenciés pour motif économique en application de l’article L1233-3 du code du travail.\n\nLorsque l’employeur est un particulier, son décès peut entraîner la fin du contrat de travail. La convention collective applicable en définit les conditions.\n\nPour plus d'informations, voir la fiche :\nQue devient le contrat du salarié au décès du particulier employeur ?\n\nSources :\nArticle L1233-3 du code du travail\nArticle L1224-1 du code du travail",
  title:
    "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
  relatedItems: [],
  url: "/arret-maladie-pendant-la-periode-dessai-quelles-sont-les-regles",
  content: "",
};

describe("<FicheContribution />", () => {
  it("should render with external content", () => {
    const { container } = render(<FicheContribution {...data} />);
    expect(container).toMatchSnapshot();
  });
  it("should render without external content", () => {
    const { container } = render(<FicheContribution {...data} />);
    expect(container).toMatchSnapshot();
  });
});
