import { act, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEvent } from "@socialgouv/matomo-next";
import { mockAgreementSearch, ui } from "./ui";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { byRole, byText } from "testing-library-selector";
import { ContributionGeneric } from "../ContributionGeneric";
import { Contribution } from "../type";

beforeEach(() => {
  localStorage.clear();
});

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

const pushMock = jest.fn();
const replaceMock = jest.fn();

// La catégorie et le chemin des events viennent de la route courante : la fiche
// générique de la contribution. `CONTEXT` est le contexte du parcours de choix
// de convention, passé par le composant appelant.
const PAGE = "/contribution/my-contrib";
const PATH = "contribution/my-contrib";
const CONTEXT = "contribution/my-contrib";
const named = (payload: Record<string, unknown>) =>
  JSON.stringify({ path: PATH, ...payload });
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(() => "/contribution/my-contrib"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));

jest.mock("../../enterprise/queries");

describe("<ContributionGeneric />", () => {
  beforeEach(() => {
    const ma = sendEvent as jest.MockedFunction<typeof sendEvent>;
    ma.mockReset();
    pushMock.mockClear();
  });
  const contribution = {
    date: "05/12/2023",
    isGeneric: true,
    isNoCdt: false,
    messageBlockGenericNoCDT: "message No CDT",
    ccSupported: ["1388"],
    ccUnextended: [],
    type: "content",
    content: "<p>hello <strong>generic</strong></p>",
    source: "contributions",
    linkedContent: [],
    references: [],
    idcc: "0000",
    title: "Ma contrib",
    slug: "my-contrib",
    breadcrumbs: [],
    metas: {
      title: "SEO Title",
      description: "SEO Description",
    },
  } as Partial<Contribution> as any;

  it("je connais ma CC - cc traité", async () => {
    mockAgreementSearch({
      num: 1388,
      shortTitle: "Industrie du pétrole",
      id: "1388",
    });
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(
      <ContributionGeneric
        contribution={contribution}
        agreementDeclinations={[]}
      />
    );
    fireEvent.click(ccUi.radio.agreementSearchOption.get());
    await userEvent.click(ccUi.searchByName.input.get());
    await userEvent.type(ccUi.searchByName.input.get(), "1388");
    await waitFor(() =>
      expect(
        ccUi.searchByName.autocompleteLines.IDCC1388.name.get()
      ).toBeInTheDocument()
    );
    fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC1388.name.get());
    expect(ui.generic.buttonDisplayInfo.get()).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledTimes(3);
    // @ts-ignore
    // Les trois events partagent désormais la même catégorie — le type de la
    // page — là où l'ancien schéma les répartissait sur `cc_select_p1`,
    // `cc_search_type_of_users` et `outil`.
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          category: "contribution",
          action: "select_agreement_p1",
          name: named({ context: CONTEXT, idcc: 1388 }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_agreement_path_p1",
          name: named({ context: CONTEXT }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_agreement_supported",
          name: named({ idcc: 1388 }),
        },
      ],
    ]);
    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    expect(sendEvent).toHaveBeenCalledTimes(4);
    expect(sendEvent).toHaveBeenLastCalledWith({
      category: "contribution",
      action: "click_show_agreement_content",
      name: named({ target: CONTEXT }),
    });
  });

  it("je connais ma CC - cc non traité", async () => {
    mockAgreementSearch({
      num: 16,
      shortTitle: "Transports routiers et activités auxiliaires du transport",
      id: "0016",
    });
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(
      <ContributionGeneric
        contribution={contribution}
        agreementDeclinations={[]}
      />
    );
    fireEvent.click(ccUi.radio.agreementSearchOption.get());
    await userEvent.click(ccUi.searchByName.input.get());
    await userEvent.type(ccUi.searchByName.input.get(), "16");
    await waitFor(() =>
      expect(
        byText(
          /Transports routiers et activités auxiliaires du transport/
        ).query()
      ).toBeInTheDocument()
    );
    fireEvent.click(
      byText(/Transports routiers et activités auxiliaires du transport/).get()
    );
    expect(ccUi.buttonDisplayInfo.query()).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledTimes(3);
    // @ts-ignore
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          category: "contribution",
          action: "select_agreement_p1",
          name: named({ context: CONTEXT, idcc: 16 }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_agreement_path_p1",
          name: named({ context: CONTEXT }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_agreement_unsupported",
          name: named({ idcc: 16 }),
        },
      ],
    ]);
    fireEvent.click(ccUi.buttonDisplayInfo.get());
    expect(sendEvent).toHaveBeenCalledTimes(4);
    expect(sendEvent).toHaveBeenLastCalledWith({
      category: "contribution",
      action: "click_show_general_content",
      name: named({ target: CONTEXT }),
    });
  });

  it("je ne connais pas ma CC", async () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(
      <ContributionGeneric
        contribution={contribution}
        agreementDeclinations={[]}
      />
    );
    await userEvent.click(ccUi.radio.enterpriseSearchOption.get());
    await userEvent.click(ccUi.searchByEnterprise.input.get());
    await userEvent.type(ccUi.searchByEnterprise.input.get(), "carrefour");
    await act(async () => {
      await userEvent.click(ccUi.searchByEnterprise.submitButton.get());
    });
    await waitFor(() => {
      fireEvent.click(
        ccUi.searchByEnterprise.resultLines.carrefour.title.get()
      );
    });

    expect(
      byText(/Vous avez sélectionné la convention collective/).query()
    ).toBeInTheDocument();

    expect(sendEvent).toHaveBeenCalledTimes(6);
    // @ts-ignore
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          category: "contribution",
          action: "search_enterprise",
          name: named({ context: CONTEXT, query: "carrefour" }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_enterprise",
          name: named({
            context: CONTEXT,
            label: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
            siren: "345130488",
          }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_agreement_p2",
          name: named({ context: CONTEXT, idcc: 2216 }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_agreement_path_p2",
          name: named({ context: CONTEXT }),
        },
      ],
      [
        {
          category: "contribution",
          action: "select_agreement_unsupported",
          name: named({ idcc: 2216 }),
        },
      ],
      // Le nombre de CC trouvées pour l'entreprise part depuis un `useEffect`,
      // donc après les events émis dans les gestionnaires de clic : il ferme la
      // séquence. Carrefour Proximité n'a qu'une convention, d'où `count: 1`.
      [
        {
          category: "contribution",
          action: "show_enterprise_agreements",
          name: named({ count: 1 }),
          value: 1,
        },
      ],
    ]);
  });

  it("afficher les infos - sans radio sélectionné : le clic sur le bouton principal est bloqué et n'envoie aucun évènement", async () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(
      <ContributionGeneric
        contribution={contribution}
        agreementDeclinations={[]}
      />
    );
    expect(ui.generic.buttonDisplayInfo.get()).toBeInTheDocument();
    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    expect(ui.generic.missingRouteError.query()).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledTimes(0);
  });

  it("voir les infos générales via l'option « Je ne souhaite pas renseigner ma convention collective »", () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(
      <ContributionGeneric
        contribution={contribution}
        agreementDeclinations={[]}
      />
    );

    fireEvent.click(ui.generic.radioNoAgreement.get());
    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenLastCalledWith({
      category: "contribution",
      action: "select_agreement_path_p3",
      name: named({ context: CONTEXT }),
    });

    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    // Afficher le Code du travail sans CC émet l'évènement d'affichage dédié
    // (en plus du parcours p3 déjà émis à la sélection de la dernière option).
    expect(sendEvent).toHaveBeenCalledTimes(2);
    expect(sendEvent).toHaveBeenLastCalledWith({
      category: "contribution",
      action: "click_show_content_without_agreement",
      name: named({ target: CONTEXT }),
    });
  });

  it("affiche le lien « La convention collective, c'est quoi ? » dès l'arrivée, en haut de la façade (et sans le dupliquer dans le flux entreprise)", async () => {
    render(
      <ContributionGeneric
        contribution={contribution}
        agreementDeclinations={[]}
      />
    );

    const link = byRole("link", {
      name: /La convention collective, c'est quoi/,
    });

    // Le lien est affiché d'emblée en haut du bloc de personnalisation.
    expect(link.get()).toHaveAttribute(
      "href",
      "/quelles-regles-s-appliquent-dans-votre-entreprise#convention-collective"
    );

    await userEvent.click(ccUi.radio.enterpriseSearchOption.get());
    await userEvent.click(ccUi.searchByEnterprise.input.get());
    await userEvent.type(ccUi.searchByEnterprise.input.get(), "carrefour");
    await act(async () => {
      await userEvent.click(ccUi.searchByEnterprise.submitButton.get());
    });
    await waitFor(() => {
      fireEvent.click(
        ccUi.searchByEnterprise.resultLines.carrefour.title.get()
      );
    });

    expect(
      byText(/Vous avez sélectionné la convention collective/).query()
    ).toBeInTheDocument();
    // Le lien n'est pas dupliqué dans le flux « recherche entreprise » : il
    // reste unique (celui du haut de la façade).
    expect(link.getAll()).toHaveLength(1);
  });

  describe("sélection de CC et erreurs inline", () => {
    it("émet le parcours p1 quand on sélectionne une CC traitée", async () => {
      mockAgreementSearch({
        num: 1388,
        shortTitle: "Industrie du pétrole",
        id: "1388",
      });

      render(
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={[]}
        />
      );
      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "1388");
      await waitFor(() =>
        expect(
          ccUi.searchByName.autocompleteLines.IDCC1388.name.get()
        ).toBeInTheDocument()
      );
      fireEvent.click(ccUi.searchByName.autocompleteLines.IDCC1388.name.get());

      expect(sendEvent).toHaveBeenCalledWith({
        category: "contribution",
        action: "select_agreement_path_p1",
        name: named({ context: CONTEXT }),
      });
    });

    it("affiche le message d'erreur sous les radios quand on clique 'Afficher les informations' sans rien sélectionner", () => {
      render(
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={[]}
        />
      );

      expect(ui.generic.missingRouteError.query()).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(ui.generic.missingRouteError.query()).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("affiche une erreur inline sur la recherche de convention quand on clique 'Afficher les informations' sans avoir choisi de CC", () => {
      render(
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={[]}
        />
      );

      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ui.generic.agreementRequiredError.query()).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(ui.generic.agreementRequiredError.query()).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("affiche une erreur inline sur la recherche d'entreprise quand on clique 'Afficher les informations' sans avoir saisi d'entreprise", () => {
      render(
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={[]}
        />
      );

      fireEvent.click(ccUi.radio.enterpriseSearchOption.get());
      expect(
        ui.generic.enterpriseRequiredError.query()
      ).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(ui.generic.enterpriseRequiredError.query()).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("affiche une erreur de sélection quand on a cherché une entreprise sans en choisir une", async () => {
      render(
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={[]}
        />
      );

      fireEvent.click(ccUi.radio.enterpriseSearchOption.get());
      await userEvent.click(ccUi.searchByEnterprise.input.get());
      await userEvent.type(ccUi.searchByEnterprise.input.get(), "carrefour");
      await userEvent.click(ccUi.searchByEnterprise.submitButton.get());

      expect(
        ui.generic.enterpriseSelectionRequiredError.query()
      ).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(
        ui.generic.enterpriseSelectionRequiredError.query()
      ).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("affiche une erreur de sélection quand l'entreprise a plusieurs conventions et qu'aucune n'est choisie", async () => {
      render(
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={[]}
        />
      );

      fireEvent.click(ccUi.radio.enterpriseSearchOption.get());
      await userEvent.click(ccUi.searchByEnterprise.input.get());
      await userEvent.type(ccUi.searchByEnterprise.input.get(), "carrefour");
      await act(async () => {
        await userEvent.click(ccUi.searchByEnterprise.submitButton.get());
      });

      await waitFor(() =>
        expect(byText("CARREFOUR HYPERMARCHES").get()).toBeInTheDocument()
      );
      fireEvent.click(byText("CARREFOUR HYPERMARCHES").get());

      expect(
        ui.generic.conventionSelectionRequiredError.query()
      ).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(
        ui.generic.conventionSelectionRequiredError.query()
      ).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  describe("retour sur le formulaire (#retour)", () => {
    afterEach(() => {
      window.location.hash = "";
    });

    it("scrolle et place le focus sur le titre « Personnalisez… » au retour (#retour)", async () => {
      window.location.hash = "#retour";
      const scrollSpy = jest
        .spyOn(Element.prototype, "scrollIntoView")
        .mockClear();

      const { getByText } = render(
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={[]}
        />
      );

      const title = getByText(
        "Personnalisez la réponse avec votre convention collective"
      );

      // Le focus et le scroll sont posés dans le même effet : une fois le
      // focus sur le titre, le scroll a forcément eu lieu.
      await waitFor(() => {
        expect(document.activeElement).toBe(title);
      });
      expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });

      scrollSpy.mockRestore();
    });
  });
});
