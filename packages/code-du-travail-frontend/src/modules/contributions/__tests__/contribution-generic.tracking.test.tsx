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
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(),
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

    render(<ContributionGeneric contribution={contribution} />);
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
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          action: "/contribution/my-contrib",
          category: "cc_select_p1",
          name: "idcc1388",
        },
      ],
      [
        {
          action: "click_p1",
          category: "cc_search_type_of_users",
          name: "/contribution/my-contrib",
        },
      ],
      [
        {
          action: "cc_select_traitée",
          category: "outil",
          name: "1388",
        },
      ],
    ]);
    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    expect(sendEvent).toHaveBeenCalledTimes(4);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_afficher_les_informations_CC",
      category: "contribution",
      name: "/contribution/my-contrib",
    });
  });

  it("je connais ma CC - cc non traité", async () => {
    mockAgreementSearch({
      num: 16,
      shortTitle: "Transports routiers et activités auxiliaires du transport",
      id: "0016",
    });
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);
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
          action: "/contribution/my-contrib",
          category: "cc_select_p1",
          name: "idcc16",
        },
      ],
      [
        {
          action: "click_p1",
          category: "cc_search_type_of_users",
          name: "/contribution/my-contrib",
        },
      ],
      [
        {
          action: "cc_select_non_traitée",
          category: "outil",
          name: "16",
        },
      ],
    ]);
    fireEvent.click(ccUi.buttonDisplayInfo.get());
    expect(sendEvent).toHaveBeenCalledTimes(4);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_afficher_les_informations_générales",
      category: "contribution",
      name: "/contribution/my-contrib",
    });
  });

  it("je ne connais pas ma CC", async () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);
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

    expect(sendEvent).toHaveBeenCalledTimes(5);
    // @ts-ignore
    expect(sendEvent.mock.calls).toEqual([
      [
        {
          action: "/contribution/my-contrib",
          category: "enterprise_search",
          name: '{"query":"carrefour"}',
        },
      ],
      [
        {
          action: "/contribution/my-contrib",
          category: "enterprise_select",
          name: '{"label":"CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)","siren":"345130488"}',
        },
      ],
      [
        {
          action: "/contribution/my-contrib",
          category: "cc_select_p2",
          name: "idcc2216",
        },
      ],
      [
        {
          action: "click_p2",
          category: "cc_search_type_of_users",
          name: "/contribution/my-contrib",
        },
      ],
      [
        {
          action: "cc_select_non_traitée",
          category: "outil",
          name: "2216",
        },
      ],
    ]);
  });

  it("afficher les infos - sans radio sélectionné : le clic sur le bouton principal est bloqué et n'envoie aucun évènement", async () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);
    expect(ui.generic.buttonDisplayInfo.get()).toBeInTheDocument();
    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    expect(ui.generic.missingRouteError.query()).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledTimes(0);
  });

  it("voir les infos générales via l'option « Je ne souhaite pas renseigner ma convention collective »", () => {
    expect(sendEvent).toHaveBeenCalledTimes(0);

    render(<ContributionGeneric contribution={contribution} />);

    fireEvent.click(ui.generic.radioNoAgreement.get());
    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenLastCalledWith({
      action: "click_p3",
      category: "cc_search_type_of_users",
      name: "/contribution/my-contrib",
    });

    fireEvent.click(ui.generic.buttonDisplayInfo.get());
    // No additional event is emitted: click_p3 already captures the intent
    expect(sendEvent).toHaveBeenCalledTimes(1);
  });

  it("affiche le lien « La convention collective, c'est quoi ? » (mise en page moteur accords d'entreprise)", () => {
    render(<ContributionGeneric contribution={contribution} />);

    const link = byRole("link", {
      name: /La convention collective, c'est quoi/,
    }).get();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "/quelles-regles-s-appliquent-dans-votre-entreprise#convention-collective"
    );
  });

  describe("sélection de CC et erreurs inline", () => {
    it("émet click_p1 quand on sélectionne une CC traitée", async () => {
      mockAgreementSearch({
        num: 1388,
        shortTitle: "Industrie du pétrole",
        id: "1388",
      });

      render(<ContributionGeneric contribution={contribution} />);
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
        action: "click_p1",
        category: "cc_search_type_of_users",
        name: "/contribution/my-contrib",
      });
    });

    it("affiche le message d'erreur sous les radios quand on clique 'Afficher les informations' sans rien sélectionner", () => {
      render(<ContributionGeneric contribution={contribution} />);

      expect(ui.generic.missingRouteError.query()).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(ui.generic.missingRouteError.query()).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("affiche une erreur inline sur la recherche de convention quand on clique 'Afficher les informations' sans avoir choisi de CC", () => {
      render(<ContributionGeneric contribution={contribution} />);

      fireEvent.click(ccUi.radio.agreementSearchOption.get());
      expect(ui.generic.agreementRequiredError.query()).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(ui.generic.agreementRequiredError.query()).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("affiche une erreur inline sur la recherche d'entreprise quand on clique 'Afficher les informations' sans avoir saisi d'entreprise", () => {
      render(<ContributionGeneric contribution={contribution} />);

      fireEvent.click(ccUi.radio.enterpriseSearchOption.get());
      expect(
        ui.generic.enterpriseRequiredError.query()
      ).not.toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfo.get());

      expect(ui.generic.enterpriseRequiredError.query()).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("affiche une erreur de sélection quand on a cherché une entreprise sans en choisir une", async () => {
      render(<ContributionGeneric contribution={contribution} />);

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
      render(<ContributionGeneric contribution={contribution} />);

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
        <ContributionGeneric contribution={contribution} />
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
