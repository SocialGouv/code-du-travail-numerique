import {
  getAllByRole as containerGetByAll,
  render,
} from "@testing-library/react";
import { Information } from "../Information";
import { information, informationDismissalProcess } from "./data";
import { format } from "../queries";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

const expectedModelsAndTools = [
  "Convocation à un entretien préalable au licenciement économique de moins de 10 salariés pendant 30 jours",
  "Lettre de licenciement économique avec entretien préalable - congé de reclassement",
  "Préavis de licenciement",
  "Indemnité de licenciement",
  "Heures d'absence pour rechercher un emploi",
  "Lettre de réclamation des documents de fin de contrat",
  "Certificat de travail",
  "Reçu pour solde de tout compte",
];

const expectedArticles = [
  "Le congé de reclassement",
  "La définition du licenciement pour motif économique",
  "Attestation employeur destinée à France Travail (anciennement Pôle emploi)",
];

describe("<Information />", () => {
  it("affiche une page information classique", () => {
    const data = format(information);
    const { getByRole, getAllByRole, getByText } = render(
      <Information
        slug={information.slug}
        dismissalProcess={data?.information.dismissalProcess}
        date={data!.information.date}
        title={data!.information.title}
        breadcrumbs={data!.information.breadcrumbs}
        description={data!.information.description}
        intro={data!.information.intro}
        contents={data!.information.contents}
        references={data?.information.references}
        relatedItems={[
          {
            title: "Articles liés",
            items: [
              {
                title:
                  "L'accompagnement des personnes sans emploi pour la création et la reprise d’entreprise",
                url: "/fiche-ministere-travail/accompagnement-des-personnes-sans-emploi-pour-la-creation-et-la-reprise-dentreprise",
                source: "fiches_ministere_travail",
              },
            ],
          },
        ]}
      />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Personnes vulnérables : accompagnement de la reprise d'activité"
    );
    expect(
      getByText(
        "Les personnes à risque de forme grave de Covid-19 peuvent reprendre leur activité professionnelle en présentiel, sous réserve de certaines mesures de protection."
      )
    ).toBeInTheDocument();
    const heading2 = getAllByRole("heading", { level: 2 });
    expect(heading2).toHaveLength(5);
    expect(heading2[0]).toHaveTextContent("Quelle situation ou pathologie ?");
    expect(heading2[1]).toHaveTextContent(
      "Retour en présentiel et mesures d'accompagnement"
    );
  });

  it("affiche une page information concernant une procédure de licenciement", () => {
    const data = format(informationDismissalProcess);
    const { getByRole, getAllByRole, getByText } = render(
      <Information
        slug={information.slug}
        dismissalProcess={data?.information.dismissalProcess}
        date={data!.information.date}
        title={data!.information.title}
        breadcrumbs={data!.information.breadcrumbs}
        description={data!.information.description}
        intro={data!.information.intro}
        contents={data!.information.contents}
        references={data?.information.references}
        relatedItems={data!.relatedItems}
      />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Petit licenciement collectif (2 à 9 salariés) pour motif économique dans une entreprise avec CSE : le congé de reclassement (CR)"
    );
    expect(getByText("Quelle est votre situation ?")).toBeInTheDocument();
    const heading2 = getAllByRole("heading", { level: 2 });
    const heading3 = getByRole("heading", { level: 3, name: /Télécharger/ });
    expect(heading2).toHaveLength(6);
    expect(heading2[0]).toHaveTextContent("Quelle est votre situation ?");
    expect(heading2[1]).toHaveTextContent("La procédure");
    expect(heading3).toHaveTextContent("Télécharger l'infographie");
    const lists = getAllByRole("list");
    expect(lists).toHaveLength(5);
    // On vérifie la bonne génération des modèles et outils liés
    const modelsAndToolsItems = containerGetByAll(lists[2], "listitem");
    expect(modelsAndToolsItems).toHaveLength(expectedModelsAndTools.length);
    modelsAndToolsItems.forEach((item, index) => {
      expect(item.textContent).toBe(expectedModelsAndTools[index]);
    });
    // On vérifie la bonne génération des articles liés
    const articleItems = containerGetByAll(lists[3], "listitem");
    expect(articleItems).toHaveLength(expectedArticles.length);
    articleItems.forEach((item, index) => {
      expect(item.textContent).toBe(expectedArticles[index]);
    });
  });
});
