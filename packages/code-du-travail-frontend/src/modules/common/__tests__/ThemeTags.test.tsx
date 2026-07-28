import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeTags } from "../ThemeTags";
import { sendEvent } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  usePathname: () => "/contribution/mon-slug",
}));

// L'ordre du tableau (racine → sous-thème le plus profond) porte la hiérarchie.
// `position` est l'ordre du thème parmi ses frères, pas sa profondeur : des
// valeurs non croissantes ([3, 1, 3]) sont donc réalistes et n'affectent pas
// la sélection, qui repose uniquement sur l'ordre du tableau.
const breadcrumbs = [
  { label: "Congés et repos", position: 3, slug: "/themes/conges-et-repos" },
  { label: "Congés", position: 1, slug: "/themes/conges" },
  {
    label: "Congés pour événement familial",
    position: 3,
    slug: "/themes/conges-pour-evenement-familial",
  },
];

describe("<ThemeTags />", () => {
  it("should render the root theme and the deepest sub theme as clickable tags", () => {
    const { getByText, queryByText, getAllByRole } = render(
      <ThemeTags breadcrumbs={breadcrumbs} />
    );

    expect(getAllByRole("link")).toHaveLength(2);
    expect(getByText("Congés et repos")).toHaveAttribute(
      "href",
      "/themes/conges-et-repos"
    );
    expect(getByText("Congés pour événement familial")).toHaveAttribute(
      "href",
      "/themes/conges-pour-evenement-familial"
    );
    expect(queryByText("Congés")).not.toBeInTheDocument();
  });

  it("should render a single tag when there is only one theme level", () => {
    const { getAllByRole } = render(
      <ThemeTags breadcrumbs={[breadcrumbs[0]]} />
    );

    const links = getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent("Congés et repos");
  });

  it("should display the shortened title for long themes while keeping the full label link", () => {
    const { getByText, queryByText } = render(
      <ThemeTags
        breadcrumbs={[
          {
            label: "Épargne salariale, participation et interessement",
            position: 1,
            slug: "/themes/epargne-salariale",
          },
        ]}
      />
    );

    // Le tag affiche le libellé raccourci...
    expect(getByText("Épargne salariale")).toHaveAttribute(
      "href",
      "/themes/epargne-salariale"
    );
    // ...et jamais le libellé complet.
    expect(
      queryByText("Épargne salariale, participation et interessement")
    ).not.toBeInTheDocument();
  });

  it("should shorten a theme even when the ES label uses a typographic apostrophe", () => {
    const { getByText, queryByText } = render(
      <ThemeTags
        breadcrumbs={[
          {
            // U+2019 (’) comme dans les libellés ingérés depuis Elasticsearch.
            label: "Temps d’équivalence, astreintes et temps d’habillage",
            position: 1,
            slug: "/themes/temps-de-travail",
          },
        ]}
      />
    );

    expect(
      getByText("Temps d'équivalence, astreinte et habillage")
    ).toBeInTheDocument();
    expect(
      queryByText("Temps d’équivalence, astreintes et temps d’habillage")
    ).not.toBeInTheDocument();
  });

  it("should render nothing when there is no breadcrumb", () => {
    const { container } = render(<ThemeTags breadcrumbs={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should track the click on a tag", async () => {
    jest.resetAllMocks();

    const { getByText } = render(<ThemeTags breadcrumbs={breadcrumbs} />);
    await userEvent.click(getByText("Congés pour événement familial"));

    expect(sendEvent).toHaveBeenCalledWith({
      category: "contribution",
      action: "clic_tag_theme",
      name: JSON.stringify({
        slug: "mon-slug",
        theme: "themes/conges-pour-evenement-familial",
      }),
    });
  });
});
