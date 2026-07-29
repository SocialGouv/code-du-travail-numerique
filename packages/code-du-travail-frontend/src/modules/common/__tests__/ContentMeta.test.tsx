import { render } from "@testing-library/react";
import { ContentMeta } from "../ContentMeta";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  usePathname: () => "/information/mon-slug",
}));

const breadcrumbs = [
  { label: "Congés et repos", position: 3, slug: "/themes/conges-et-repos" },
  {
    label: "Congés pour événement familial",
    position: 3,
    slug: "/themes/conges-pour-evenement-familial",
  },
];

describe("<ContentMeta />", () => {
  it("affiche la date « Mis à jour le » puis les tags", () => {
    const { getByText, getAllByRole } = render(
      <ContentMeta date="04/01/2024" breadcrumbs={breadcrumbs} />
    );

    expect(getByText(/Mis à jour le/)).toBeInTheDocument();
    expect(getByText(/04\/01\/2024/)).toBeInTheDocument();
    expect(getAllByRole("link").length).toBeGreaterThan(0);
  });

  it("affiche la source quand elle est fournie", () => {
    const { getByText, getByRole } = render(
      <ContentMeta
        date="18/06/2026"
        breadcrumbs={breadcrumbs}
        source={{ url: "https://example.gouv.fr", name: "Ma source" }}
      />
    );

    expect(getByText(/Source/)).toBeInTheDocument();
    expect(getByRole("link", { name: "Ma source" })).toHaveAttribute(
      "href",
      "https://example.gouv.fr"
    );
    expect(getByText(/Mis à jour le/)).toBeInTheDocument();
  });

  it("n'affiche pas de date quand elle est absente (ex: infographies)", () => {
    const { queryByText, getAllByRole } = render(
      <ContentMeta breadcrumbs={breadcrumbs} />
    );

    expect(queryByText(/Mis à jour le/)).not.toBeInTheDocument();
    expect(getAllByRole("link").length).toBeGreaterThan(0);
  });
});
