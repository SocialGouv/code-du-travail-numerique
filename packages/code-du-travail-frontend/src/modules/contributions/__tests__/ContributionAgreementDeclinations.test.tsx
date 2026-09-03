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

  // #7458 : sur une contribution sans réponse générique, l'accordéon suit
  // directement le h1 de la page — il doit alors porter un h2.
  it("titre l'accordéon en h3 par défaut et en h2 sur demande", () => {
    const { getByRole, unmount } = render(
      <ContributionAgreementDeclinations items={items} />
    );
    expect(
      getByRole("heading", { level: 3, name: AGREEMENT_DECLINATIONS_LABEL })
    ).toBeInTheDocument();
    unmount();

    const { getByRole: getByRoleAsH2 } = render(
      <ContributionAgreementDeclinations items={items} titleAs="h2" />
    );
    expect(
      getByRoleAsH2("heading", {
        level: 2,
        name: AGREEMENT_DECLINATIONS_LABEL,
      })
    ).toBeInTheDocument();
  });

  it("émet un event Matomo au clic sur une déclinaison", () => {
    const { getByText } = render(
      <ContributionAgreementDeclinations items={items} />
    );

    getByText("Banque").click();

    expect(sendEvent).toHaveBeenCalledWith({
      category: "contribution",
      action: "clic_declinaison_cc",
      name: "contribution/2120-la-periode-dessai",
    });
  });
});
