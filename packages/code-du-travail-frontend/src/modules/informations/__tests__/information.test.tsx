import { render } from "@testing-library/react";
import { Information } from "../Information";
import { information } from "./data";
import { format } from "../queries";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("<Information />", () => {
  it("affiche une page information classique", () => {
    const data = format(information);
    const { getByRole, getAllByRole, getByText } = render(
      <Information
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
    // Le bloc « Partager la page » (role heading niveau 2) n'est plus affiché
    expect(heading2).toHaveLength(4);
    expect(heading2[0]).toHaveTextContent("Quelle situation ou pathologie ?");
    expect(heading2[1]).toHaveTextContent(
      "Retour en présentiel et mesures d'accompagnement"
    );
  });
});
