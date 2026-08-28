import { sendEvent } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
import {
  AGREEMENT_DECLINATIONS_LABEL,
  ContributionAgreementDeclinations,
} from "../ContributionAgreementDeclinations";
import { AgreementDeclination } from "../type";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

// La catégorie et le chemin de l'event viennent de la route courante : on se
// place sur la fiche générique, d'où partent les liens de déclinaison.
jest.mock("next/navigation", () => ({
  usePathname: () => "/contribution/la-periode-dessai",
}));

const PATH = "contribution/la-periode-dessai";

const items: AgreementDeclination[] = [
  {
    shortTitle: "Banque",
    href: "/contribution/2120-la-periode-dessai",
  },
  {
    shortTitle: "Industries chimiques et connexes",
    href: "/contribution/44-la-periode-dessai",
  },
];

describe("<ContributionAgreementDeclinations />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("ne rend rien lorsqu'aucune déclinaison n'est disponible", () => {
    const { container } = render(
      <ContributionAgreementDeclinations items={[]} />
    );
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it("rend un lien par convention collective, libellé par son nom court", () => {
    const { getByRole } = render(
      <ContributionAgreementDeclinations items={items} />
    );

    expect(
      getByRole("button", { name: AGREEMENT_DECLINATIONS_LABEL })
    ).toBeInTheDocument();
    expect(getByRole("link", { name: "Banque" })).toHaveAttribute(
      "href",
      "/contribution/2120-la-periode-dessai"
    );
    expect(
      getByRole("link", { name: "Industries chimiques et connexes" })
    ).toHaveAttribute("href", "/contribution/44-la-periode-dessai");
  });

  it("rend les liens dans le HTML sans ouvrir l'accordéon (maillage interne)", () => {
    const { getByRole, getAllByRole } = render(
      <ContributionAgreementDeclinations items={items} />
    );

    expect(
      getByRole("button", { name: AGREEMENT_DECLINATIONS_LABEL })
    ).toHaveAttribute("aria-expanded", "false");
    expect(getAllByRole("link")).toHaveLength(2);
  });

  it("émet un event Matomo au clic sur une déclinaison", () => {
    const { getByText } = render(
      <ContributionAgreementDeclinations items={items} />
    );

    getByText("Banque").click();

    // `path` = la fiche générique d'où part le clic, `target` = la page de
    // convention atteinte. L'ancien schéma n'avait que la seconde.
    expect(sendEvent).toHaveBeenCalledWith({
      category: "contribution",
      action: "click_agreement_declination",
      name: `{"path":"${PATH}","target":"contribution/2120-la-periode-dessai"}`,
    });
  });
});
