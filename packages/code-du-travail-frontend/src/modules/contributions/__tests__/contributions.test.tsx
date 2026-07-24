import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
  within,
} from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

import { ContributionLayout } from "../ContributionLayout";
import { ui } from "./ui";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { Contribution } from "../type";
import { searchAgreement } from "../../convention-collective";
import { sendEvent } from "@socialgouv/matomo-next";

const contribution = {
  source: "contributions",
  linkedContent: [],
  references: [],
  idcc: "0000",
  date: "05/12/2023",
  metas: {
    title: "SEO Title",
    description: "SEO Description",
  },
  title: "La période d’essai peut-elle être renouvelée ?",
  breadcrumbs: [],
  slug: "slug",
  type: "content",
  content: "my content",
  isGeneric: true,
  isNoCdt: false,
  ccSupported: ["0016", "3239"],
  ccUnextended: ["0029"],
  messageBlockGenericNoCDT: "message No CDT",
} as Partial<Contribution> as any;

jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

const pushMock = jest.fn();
const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

describe("<ContributionLayout />", () => {
  let rendering: RenderResult;
  beforeEach(() => {
    const ma = sendEvent as jest.MockedFunction<typeof sendEvent>;
    ma.mockReset();
    pushMock.mockClear();
    replaceMock.mockClear();
  });
  it("should render title only if generic", () => {
    rendering = render(<ContributionLayout contribution={contribution} />);
    const titreH1 = rendering.getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ?"
    );
    expect(
      rendering.getByText("Mis à jour le : 05/12/2023")
    ).toBeInTheDocument();
  });
  it("should render theme tags linking to the root theme and sub theme", () => {
    rendering = render(
      <ContributionLayout
        contribution={{
          ...contribution,
          breadcrumbs: [
            {
              label: "Embauche et contrat de travail",
              position: 1,
              slug: "/themes/embauche-et-contrat-de-travail",
            },
            {
              label: "Période d’essai",
              position: 2,
              slug: "/themes/periode-dessai",
            },
          ],
        }}
      />
    );
    const tagsGroup = rendering.container.querySelector("ul.fr-tags-group");
    expect(tagsGroup).toBeInTheDocument();
    const tags = within(tagsGroup as HTMLElement).getAllByRole("link");
    expect(tags).toHaveLength(2);
    expect(tags[0]).toHaveTextContent("Embauche et contrat de travail");
    expect(tags[0]).toHaveAttribute(
      "href",
      "/themes/embauche-et-contrat-de-travail"
    );
    expect(tags[1]).toHaveTextContent("Période d’essai");
    expect(tags[1]).toHaveAttribute("href", "/themes/periode-dessai");
  });
  it("should render title with cc short name if contribution with CC", () => {
    rendering = render(
      <ContributionLayout
        contribution={{
          ...contribution,
          idcc: "0029",
          isGeneric: false,
          ccnSlug: "cc-slug",
          ccnShortTitle: "Nom de la CC",
        }}
      />
    );
    const titreH1 = rendering.getByRole("heading", { level: 1 });
    expect(titreH1.textContent).toBe(
      "La période d’essai peut-elle être renouvelée ? Nom de la CC"
    );
    expect(
      rendering.getByText("Mis à jour le : 05/12/2023")
    ).toBeInTheDocument();
    const ccLink = rendering.getByRole("link", { name: "Nom de la CC" });
    expect(ccLink).toHaveAttribute("href", "/convention-collective/cc-slug");
  });
  it("should display the branch H2 above the answer on a CC-specific contribution", () => {
    rendering = render(
      <ContributionLayout
        contribution={{
          ...contribution,
          idcc: "0029",
          isGeneric: false,
          ccnSlug: "cc-slug",
          ccnShortTitle: "Nom de la CC",
        }}
      />
    );
    const heading = ui.branchAnswerTitle.get();
    expect(heading.textContent).toBe(
      "Réponse pour la convention : Nom de la CC"
    );
  });
  it("hiérarchise les titres : un seul h2 (la réponse), tout le reste en h3", () => {
    rendering = render(
      <ContributionLayout
        contribution={{
          ...contribution,
          idcc: "0029",
          isGeneric: false,
          ccnSlug: "cc-slug",
          ccnShortTitle: "Nom de la CC",
          content: '<span class="title">Ma section</span><p>texte</p>',
          references: [{ title: "Article 1", url: "https://exemple.test" }],
          messageBlock: "Un message d'attention",
          relatedItems: [
            {
              title: "Articles liés",
              items: [
                { title: "Un lien", url: "/lien", source: "contributions" },
              ],
            },
          ],
        }}
      />
    );
    // Un seul h2 : le titre de la réponse. Tout le reste descend en h3.
    const h2s = rendering.getAllByRole("heading", { level: 2 });
    expect(h2s).toHaveLength(1);
    expect(h2s[0].textContent).toContain("Réponse pour la convention");
    // Contenu, Références et Attention passent en h3.
    const contentHeading = rendering.getByRole("heading", {
      level: 3,
      name: "Ma section",
    });
    expect(contentHeading).toBeInTheDocument();
    // …mais conservent la taille visuelle du niveau parent (fr-h2) : le design
    // ne bouge pas.
    expect(contentHeading.className).toContain("fr-h2");
    expect(
      rendering.getByRole("heading", { level: 3, name: "Références" })
    ).toBeInTheDocument();
    expect(
      rendering.getByRole("heading", { level: 3, name: "Attention" })
    ).toBeInTheDocument();
  });
  describe("base", () => {
    beforeEach(async () => {
      window.localStorage.clear();
      rendering = render(<ContributionLayout contribution={contribution} />);
    });
    it("should display correctly when a selecting agreement 3239", async () => {
      fireEvent.click(ccUi.radio.enterpriseSearchOption.get());
      fireEvent.click(ccUi.searchByEnterprise.noEnterprise.get());

      fireEvent.click(ccUi.buttonDisplayInfo.get());
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith(
        "/contribution/3239-slug#votre-convention-collective",
        { scroll: false }
      );
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_traitée",
        category: "outil",
        name: "3239",
      });
    });

    it("should display the no-agreement banner and the generic content when the no-agreement option is selected", async () => {
      fireEvent.click(ui.generic.radioNoAgreement.get());
      expect(ui.generic.noAgreementBanner.query()).toBeInTheDocument();
      expect(ccUi.buttonDisplayInfo.query()).toBeInTheDocument();
      expect(rendering.getByText("my content")).toBeInTheDocument();

      fireEvent.click(ccUi.buttonDisplayInfo.get());

      expect(rendering.getByText("my content")).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
      // H2 « Code du travail » au-dessus de la réponse, visible avec elle.
      expect(ui.cdtAnswerTitle.get()).toBeInTheDocument();
      expect(
        rendering.container.querySelector("#cdt")?.className
      ).not.toContain("fr-hidden");
    });

    it("should display an error when clicking 'Afficher les informations' without selecting any radio option", async () => {
      expect(ui.generic.missingRouteError.query()).not.toBeInTheDocument();

      fireEvent.click(ccUi.buttonDisplayInfo.get());

      expect(ui.generic.missingRouteError.query()).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("should hide the error when a radio option is selected after the error is shown", async () => {
      fireEvent.click(ccUi.buttonDisplayInfo.get());
      expect(ui.generic.missingRouteError.query()).toBeInTheDocument();

      fireEvent.click(ui.generic.radioNoAgreement.get());

      expect(ui.generic.missingRouteError.query()).not.toBeInTheDocument();
    });

    it("should display correctly when a treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            id: "0016",
            num: 16,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
            shortTitle:
              "Transports routiers et activités auxiliaires du transport",
            slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
            title:
              "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "16");

      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC16.name.get());

      fireEvent.click(ccUi.buttonDisplayInfo.get());
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith(
        "/contribution/16-slug#votre-convention-collective",
        { scroll: false }
      );

      expect(ccUi.warning.nonTreatedAgreement.query()).not.toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_traitée",
        category: "outil",
        name: "16",
      });
    });

    it("should display correctly when a non-treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            num: 1388,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635267",
            effectif: 31273,
            shortTitle: "Industrie du pétrole",
            cdtnId: "8c50f32b7d",
            id: "1388",
            slug: "1388-industrie-du-petrole",
            title:
              "Convention collective nationale deo l'industrie du pétrole du 3 septembre 1985.  Etendue par arrêté du 31 juillet 1986 JORF 9 août 1986.",
            contributions: false,
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "1388");

      await ccUi.searchByName.autocompleteLines.IDCC1388.name.find();
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC1388.name.get());

      expect(ccUi.warning.title.query()).toBeInTheDocument();
      expect(ccUi.warning.nonTreatedAgreement.query()).toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_non_traitée",
        category: "outil",
        name: "1388",
      });
      fireEvent.click(ccUi.buttonDisplayInfo.get());
      expect(pushMock).not.toHaveBeenCalled();
      expect(ui.generic.nonTreatedInfo.query()).toBeInTheDocument();
    });
  });

  describe("no CDT", () => {
    beforeEach(() => {
      window.localStorage.clear();
      rendering = render(
        <ContributionLayout contribution={{ ...contribution, isNoCDT: true }} />
      );
    });
    it("should display correctly when no agreement is selected", () => {
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
    });

    it("should not display the no-agreement option in noCDT mode", () => {
      expect(ui.generic.radioNoAgreement.query()).not.toBeInTheDocument();
    });

    it("should display correctly when a treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            id: "0016",
            num: 16,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
            shortTitle:
              "Transports routiers et activités auxiliaires du transport",
            slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
            title:
              "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "16");
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC16.name.get());

      fireEvent.click(ccUi.buttonDisplayInfo.get());
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith(
        "/contribution/16-slug#votre-convention-collective",
        { scroll: false }
      );

      expect(ccUi.warning.nonTreatedAgreement.query()).not.toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_traitée",
        category: "outil",
        name: "16",
      });
    });

    it("should display correctly when a non-treated agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            num: 1388,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635267",
            effectif: 31273,
            shortTitle: "Industrie du pétrole",
            cdtnId: "8c50f32b7d",
            id: "1388",
            slug: "1388-industrie-du-petrole",
            title:
              "Convention collective nationale deo l'industrie du pétrole du 3 septembre 1985.  Etendue par arrêté du 31 juillet 1986 JORF 9 août 1986.",
            contributions: false,
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "1388");
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC1388.name.get());
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.warning.title.query()).toBeInTheDocument();
      expect(ccUi.warning.noCdtNonTreatedAgreement.query()).toBeInTheDocument();
      expect(
        rendering.getByText(new RegExp(contribution.messageBlockGenericNoCDT))
      ).toBeInTheDocument();
      expect(sendEvent).toHaveBeenCalledWith({
        action: "cc_select_non_traitée",
        category: "outil",
        name: "1388",
      });
    });

    it("should display correctly when a unextended agreement is selected", async () => {
      (searchAgreement as jest.Mock).mockImplementation(() =>
        Promise.resolve([
          {
            num: 29,
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635234",
            effectif: 1,
            shortTitle:
              "Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
            cdtnId: "394e29a64d",
            id: "0029",
            slug: "29-hospitalisation-privee-etablissements-prives-dhospitalisation-de-soins-d",
            title:
              "Convention collective nationale des etablissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif du 31 octobre 1951.",
            contributions: true,
          },
        ])
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "29");
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC29.name.get());
      expect(ccUi.buttonDisplayInfo.query()).not.toBeInTheDocument();
      expect(ccUi.warning.title.query()).toBeInTheDocument();
      expect(ccUi.warning.noCdtUnextendedAgreement.query()).toBeInTheDocument();
    });
  });

  describe("arrivée #cdt depuis une page CC", () => {
    beforeEach(() => {
      window.localStorage.clear();
      window.location.hash = "#cdt";
    });

    afterEach(() => {
      window.location.hash = "";
    });

    it("affiche la réponse Code du travail avec « je ne souhaite pas renseigner » cochée (storage vide)", async () => {
      rendering = render(<ContributionLayout contribution={contribution} />);

      await waitFor(() => {
        expect(
          (ui.generic.radioNoAgreement.get() as HTMLInputElement).checked
        ).toBe(true);
      });
      expect(
        rendering.container.querySelector("#cdt")?.className
      ).not.toContain("fr-hidden");
      expect(ui.cdtAnswerTitle.get()).toBeInTheDocument();
      // Pré-cochage automatique : aucun événement Matomo (pas une action usager).
      expect(sendEvent).not.toHaveBeenCalled();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it("affiche la réponse avec la CC non traitée pré-remplie et son alerte (storage avec CC non traitée)", async () => {
      window.localStorage.setItem(
        "convention",
        JSON.stringify({
          id: "1388",
          num: 1388,
          shortTitle: "Industrie du pétrole",
          slug: "1388-industrie-du-petrole",
          title: "Convention collective nationale de l'industrie du pétrole",
        })
      );

      rendering = render(<ContributionLayout contribution={contribution} />);

      await waitFor(() => {
        expect(
          (ccUi.radio.agreementSearchOption.get() as HTMLInputElement).checked
        ).toBe(true);
      });
      expect(
        rendering.container.querySelector("#cdt")?.className
      ).not.toContain("fr-hidden");
      expect(ui.generic.nonTreatedInfo.query()).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it("ne redirige pas vers la page CC (hash #cdt), même avec une CC valide en storage", async () => {
      window.localStorage.setItem(
        "convention",
        JSON.stringify({
          id: "0016",
          num: 16,
          shortTitle:
            "Transports routiers et activités auxiliaires du transport",
          slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
          title: "Convention collective nationale des transports routiers",
        })
      );

      render(<ContributionLayout contribution={contribution} />);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(replaceMock).not.toHaveBeenCalled();
    });
  });

  describe("arrivée avec une CC enregistrée (auto-redirection)", () => {
    // Une CC mémorisée et traitée renvoie directement vers la page CC. Pas de
    // boucle : « Réinitialiser » (page CC) efface la CC avant de revenir sur
    // la générique, et les hash #retour / #cdt désactivent la redirection.
    const validAgreement = {
      id: "0016",
      num: 16,
      shortTitle: "Transports routiers et activités auxiliaires du transport",
      slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
      title:
        "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
    };

    beforeEach(() => {
      window.localStorage.clear();
    });

    afterEach(() => {
      window.location.hash = "";
      window.localStorage.clear();
    });

    it("redirige vers la page CC quand une CC traitée est en storage", async () => {
      window.localStorage.setItem("convention", JSON.stringify(validAgreement));

      render(<ContributionLayout contribution={contribution} />);

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith("/contribution/16-slug");
      });
    });

    it("ne redirige pas quand la CC en storage n'est pas traitée", async () => {
      window.localStorage.setItem(
        "convention",
        JSON.stringify({
          id: "1388",
          num: 1388,
          shortTitle: "Industrie du pétrole",
          slug: "1388-industrie-du-petrole",
          title: "Convention collective nationale de l'industrie du pétrole",
        })
      );

      render(<ContributionLayout contribution={contribution} />);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it("ne redirige pas quand la CC en storage est non étendue", async () => {
      window.localStorage.setItem(
        "convention",
        JSON.stringify({
          id: "0029",
          num: 29,
          shortTitle: "Hospitalisation privée",
          slug: "29-hospitalisation-privee",
          title: "Convention collective nationale des établissements privés",
        })
      );

      render(<ContributionLayout contribution={contribution} />);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it("ne redirige pas avec le hash #retour (retour depuis « Réinitialiser »)", async () => {
      window.localStorage.setItem("convention", JSON.stringify(validAgreement));
      window.location.hash = "#retour";

      render(<ContributionLayout contribution={contribution} />);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it("ne redirige pas sans CC en storage", async () => {
      render(<ContributionLayout contribution={contribution} />);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(replaceMock).not.toHaveBeenCalled();
    });
  });
});
