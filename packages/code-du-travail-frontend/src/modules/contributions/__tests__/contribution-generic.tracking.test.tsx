import { act, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEvent, useABTestVariant } from "@socialgouv/matomo-next";
import { mockAgreementSearch, ui } from "./ui";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { byText } from "testing-library-selector";
import { ContributionGeneric } from "../ContributionGeneric";
import { Contribution } from "../type";
import { ContributionAfficherInfoVariations } from "../../config/abTests";

beforeEach(() => {
  localStorage.clear();
});

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
  useABTestVariant: jest.fn(() => null),
}));

const setVariant = (variant: string | null) => {
  (useABTestVariant as jest.Mock).mockReturnValue(variant);
};

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
    setVariant(null);
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

  describe("variante 'radio_button'", () => {
    beforeEach(() => {
      setVariant(ContributionAfficherInfoVariations.RADIO_BUTTON);
    });

    it("suffixe la variante dans les événements quand on sélectionne une CC traitée", async () => {
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
        name: "/contribution/my-contrib|variant=radio_button",
      });
    });
  });

  describe("variante 'original'", () => {
    beforeEach(() => {
      setVariant(ContributionAfficherInfoVariations.ORIGINAL);
    });

    it("affiche le bouton externe 'Afficher les infos sans CC' et émet click_p3 + click_afficher_les_informations_sans_CC suffixés", () => {
      render(<ContributionGeneric contribution={contribution} />);

      expect(ui.generic.radioNoAgreement.query()).not.toBeInTheDocument();
      expect(ui.generic.buttonDisplayInfoWithoutCc.get()).toBeInTheDocument();

      fireEvent.click(ui.generic.buttonDisplayInfoWithoutCc.get());

      expect(sendEvent).toHaveBeenCalledWith({
        action: "click_p3",
        category: "cc_search_type_of_users",
        name: "/contribution/my-contrib|variant=original",
      });
      expect(sendEvent).toHaveBeenCalledWith({
        action: "click_afficher_les_informations_sans_CC",
        category: "contribution",
        name: "/contribution/my-contrib|variant=original",
      });
    });

    it("ne bloque pas le clic sur 'Afficher les informations' sans option sélectionnée (pas d'erreur)", () => {
      render(<ContributionGeneric contribution={contribution} />);

      fireEvent.click(ui.generic.buttonDisplayInfo.get());
      expect(ui.generic.missingRouteError.query()).not.toBeInTheDocument();
    });
  });

  describe("variante 'regular_button'", () => {
    beforeEach(() => {
      setVariant(ContributionAfficherInfoVariations.REGULAR_BUTTON);
    });

    it("masque les radios et affiche la recherche par entreprise par défaut", () => {
      render(<ContributionGeneric contribution={contribution} />);

      expect(ccUi.radio.agreementSearchOption.query()).not.toBeInTheDocument();
      expect(ccUi.radio.enterpriseSearchOption.query()).not.toBeInTheDocument();
      expect(ccUi.searchByEnterprise.input.get()).toBeInTheDocument();
    });

    it("affiche les 3 boutons d'action en bas de la modale", () => {
      render(<ContributionGeneric contribution={contribution} />);

      expect(ui.generic.buttonDisplayInfo.get()).toBeInTheDocument();
      expect(ui.generic.regularButtonAgreement.get()).toBeInTheDocument();
      expect(ui.generic.regularButtonNoAgreement.get()).toBeInTheDocument();
    });

    it("bascule vers la saisie manuelle au clic sur 'Non, je saisis ma convention collective'", async () => {
      render(<ContributionGeneric contribution={contribution} />);

      fireEvent.click(ui.generic.regularButtonAgreement.get());

      expect(ccUi.searchByName.input.get()).toBeInTheDocument();
      expect(ui.generic.regularButtonEnterprise.get()).toBeInTheDocument();
    });

    it("émet click_p3 suffixé de la variante au clic sur 'Je veux juste le code du travail'", () => {
      render(<ContributionGeneric contribution={contribution} />);

      fireEvent.click(ui.generic.regularButtonNoAgreement.get());

      expect(sendEvent).toHaveBeenCalledWith({
        action: "click_p3",
        category: "cc_search_type_of_users",
        name: "/contribution/my-contrib|variant=regular_button",
      });
    });
  });
});
