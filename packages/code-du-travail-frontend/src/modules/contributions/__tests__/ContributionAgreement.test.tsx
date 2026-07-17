import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

import {
  AGREEMENT_FOCUS_HASH,
  ContributionAgreement,
} from "../ContributionAgreement";
import { Contribution } from "../type";
import { focusableTitle } from "../../common/focusableTitle";
import { isExternalArrival } from "../externalArrival";
import { ui } from "./ui";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { searchAgreement } from "../../convention-collective";
import type { GenericContributionInfos } from "../queries";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("../ContributionAgreementContent", () => ({
  ContributionAgreementContent: () => <div>contenu convention</div>,
}));

jest.mock("../externalArrival", () => ({
  isExternalArrival: jest.fn(() => false),
}));

jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

const isExternalArrivalMock = isExternalArrival as jest.MockedFunction<
  typeof isExternalArrival
>;

const contribution = {
  slug: "0016-slug",
  idcc: "0016",
  ccnShortTitle: "Transports routiers",
  ccnSlug: "0016-transports-routiers",
  relatedItems: [],
  references: [],
  title: "Titre",
  metas: { title: "Titre", description: "desc" },
} as Partial<Contribution> as any;

const genericInfos: GenericContributionInfos = {
  ccSupported: ["0016", "3239"],
  ccUnextended: ["0029"],
  type: "content",
  messageBlockGenericNoCDT: "message No CDT",
} as GenericContributionInfos;

beforeEach(() => {
  pushMock.mockClear();
  isExternalArrivalMock.mockReset();
  isExternalArrivalMock.mockReturnValue(false);
  window.localStorage.clear();
});

describe("<ContributionAgreement /> accessibilité", () => {
  afterEach(() => {
    window.location.hash = "";
  });

  it("place le focus sur le titre quand on arrive via le formulaire (hash) et lui donne un anneau de focus visible", async () => {
    window.location.hash = AGREEMENT_FOCUS_HASH;

    const { getByText } = render(
      <ContributionAgreement contribution={contribution} />
    );

    const title = getByText(
      "Réponse personnalisée pour la convention collective"
    );
    expect(title).toHaveAttribute("tabindex", "-1");
    // Anneau de focus visible même lors d'un focus programmatique.
    expect(title.className).toContain(focusableTitle);

    await waitFor(() => {
      expect(document.activeElement).toBe(title);
    });
  });

  it("scrolle le titre dans la vue quand on arrive via le formulaire (hash)", async () => {
    window.location.hash = AGREEMENT_FOCUS_HASH;
    // `scrollIntoView` est mocké globalement (jsdom ne l'implémente pas) ;
    // on repart d'un historique vide pour ne pas compter les appels d'autres tests.
    const scrollSpy = jest
      .spyOn(Element.prototype, "scrollIntoView")
      .mockClear();

    const { getByText } = render(
      <ContributionAgreement contribution={contribution} />
    );

    const title = getByText(
      "Réponse personnalisée pour la convention collective"
    );

    // Le focus et le scroll sont posés dans le même effet : une fois le focus
    // sur le titre, le scroll a forcément eu lieu.
    await waitFor(() => {
      expect(document.activeElement).toBe(title);
    });
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });

    scrollSpy.mockRestore();
  });

  it("ne scrolle pas lors d'une arrivée directe sans hash", async () => {
    window.location.hash = "";
    const scrollSpy = jest
      .spyOn(Element.prototype, "scrollIntoView")
      .mockClear();

    render(<ContributionAgreement contribution={contribution} />);

    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(scrollSpy).not.toHaveBeenCalled();

    scrollSpy.mockRestore();
  });

  it("ne vole pas le focus lors d'une arrivée directe sans hash (SEO/Google, lien partagé, reload)", async () => {
    window.location.hash = "";

    const { getByText } = render(
      <ContributionAgreement contribution={contribution} />
    );

    const title = getByText(
      "Réponse personnalisée pour la convention collective"
    );
    // Laisse passer le délai du setTimeout(100) de l'effet pour vérifier
    // qu'aucun focus n'est posé.
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(document.activeElement).not.toBe(title);
  });
});

describe("<ContributionAgreement /> réinitialisation à l'arrivée externe (#7361)", () => {
  const renderReset = () =>
    render(
      <ContributionAgreement
        contribution={contribution}
        genericInfos={genericInfos}
      />
    );

  const getContent = (rendering: ReturnType<typeof render>) =>
    rendering.getByText("contenu convention");

  const selectAgreement = async (agreement: {
    id: string;
    num: number;
    shortTitle: string;
    slug: string;
  }) => {
    (searchAgreement as jest.Mock).mockImplementation(() =>
      Promise.resolve([
        {
          ...agreement,
          url: "https://www.legifrance.gouv.fr/affichIDCC.do",
          title: agreement.shortTitle,
        },
      ])
    );
    fireEvent.click(ccUi.radio.agreementSearchOption.get());
    await userEvent.click(ccUi.searchByName.input.get());
    await userEvent.type(ccUi.searchByName.input.get(), String(agreement.num));
    fireEvent.click(
      await screen.findByText(`${agreement.shortTitle} (IDCC ${agreement.num})`)
    );
  };

  afterEach(() => {
    window.location.hash = "";
  });

  it("affiche le bloc de sélection réinitialisé en gardant le contenu visible", async () => {
    isExternalArrivalMock.mockReturnValue(true);

    const rendering = renderReset();

    expect(
      rendering.getByText(
        "Personnalisez la réponse avec votre convention collective"
      )
    ).toBeInTheDocument();
    expect(
      rendering.queryByText(
        "Réponse personnalisée pour la convention collective"
      )
    ).not.toBeInTheDocument();
    // Arrivée externe (Google) : la réponse de la CC reste visible (non masquée,
    // contrairement à un clic sur « Réinitialiser »).
    expect(getContent(rendering).parentElement?.className).not.toContain(
      "fr-hidden"
    );
    // Aucun des 3 boutons radio n'est pré-sélectionné.
    expect(
      (ccUi.radio.agreementSearchOption.get() as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (ccUi.radio.enterpriseSearchOption.get() as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (ui.generic.radioNoAgreement.get() as HTMLInputElement).checked
    ).toBe(false);
  });

  it("ignore la CC du localStorage, même celle de la page (toujours réinitialiser)", async () => {
    isExternalArrivalMock.mockReturnValue(true);
    window.localStorage.setItem(
      "convention",
      JSON.stringify({
        id: "0016",
        num: 16,
        shortTitle: "Transports routiers",
        slug: "16-transports-routiers",
      })
    );

    renderReset();

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(
      (ccUi.radio.agreementSearchOption.get() as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (ccUi.radio.enterpriseSearchOption.get() as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (ui.generic.radioNoAgreement.get() as HTMLInputElement).checked
    ).toBe(false);
  });

  it("bascule sur place en état résultat quand la CC de la page est choisie", async () => {
    isExternalArrivalMock.mockReturnValue(true);

    const rendering = renderReset();
    await selectAgreement({
      id: "0016",
      num: 16,
      shortTitle: "Transports routiers et activités auxiliaires du transport",
      slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
    });

    fireEvent.click(ccUi.buttonDisplayInfo.get());

    expect(pushMock).not.toHaveBeenCalled();
    const title = rendering.getByText(
      "Réponse personnalisée pour la convention collective"
    );
    expect(title).toBeInTheDocument();
    expect(getContent(rendering)).toBeVisible();
    // La CC choisie est persistée pour le reste du site (header inclus).
    expect(
      JSON.parse(window.localStorage.getItem("convention") as string).num
    ).toBe(16);
    // Focus déplacé sur le titre du bloc résultat.
    await waitFor(() => {
      expect(document.activeElement).toBe(title);
    });
  });

  it("navigue vers la page de l'autre CC quand une CC traitée différente est choisie", async () => {
    isExternalArrivalMock.mockReturnValue(true);

    renderReset();
    await selectAgreement({
      id: "3239",
      num: 3239,
      shortTitle: "Particuliers employeurs et emploi à domicile",
      slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
    });

    fireEvent.click(ccUi.buttonDisplayInfo.get());

    expect(pushMock).toHaveBeenCalledWith(
      "/contribution/3239-slug#votre-convention-collective",
      { scroll: false }
    );
  });

  it("navigue vers la fiche générique (#cdt) quand une CC non traitée est choisie", async () => {
    isExternalArrivalMock.mockReturnValue(true);

    renderReset();
    await selectAgreement({
      id: "1388",
      num: 1388,
      shortTitle: "Industrie du pétrole",
      slug: "1388-industrie-du-petrole",
    });

    fireEvent.click(ccUi.buttonDisplayInfo.get());

    expect(pushMock).toHaveBeenCalledWith("/contribution/slug#cdt", {
      scroll: false,
    });
    // La CC non traitée reste persistée : la générique pré-cochera la 1re
    // option avec cette CC et affichera l'alerte dédiée.
    expect(
      JSON.parse(window.localStorage.getItem("convention") as string).num
    ).toBe(1388);
  });

  it("navigue vers la fiche générique (#cdt) avec « je ne souhaite pas renseigner ma CC »", async () => {
    isExternalArrivalMock.mockReturnValue(true);
    window.localStorage.setItem(
      "convention",
      JSON.stringify({ id: "0016", num: 16 })
    );

    renderReset();
    fireEvent.click(ui.generic.radioNoAgreement.get());
    // Le choix explicite « sans CC » efface la CC stockée.
    expect(window.localStorage.getItem("convention")).toBeNull();

    fireEvent.click(ccUi.buttonDisplayInfo.get());

    expect(pushMock).toHaveBeenCalledWith("/contribution/slug#cdt", {
      scroll: false,
    });
  });

  it("affiche l'erreur sans choix de radio et ne navigue pas", async () => {
    isExternalArrivalMock.mockReturnValue(true);

    renderReset();
    fireEvent.click(ccUi.buttonDisplayInfo.get());

    expect(ui.generic.missingRouteError.query()).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("garde l'état résultat pour une arrivée interne", () => {
    isExternalArrivalMock.mockReturnValue(false);

    const rendering = renderReset();

    expect(
      rendering.getByText("Réponse personnalisée pour la convention collective")
    ).toBeInTheDocument();
    expect(getContent(rendering)).toBeVisible();
  });

  it("affiche la CC de la page et le bouton « Réinitialiser » en arrivée interne", () => {
    isExternalArrivalMock.mockReturnValue(false);

    const rendering = renderReset();

    expect(
      rendering.getByText("Transports routiers (IDCC 0016)")
    ).toBeInTheDocument();
    expect(
      rendering.getByRole("button", { name: "Réinitialiser" })
    ).toBeInTheDocument();
  });

  it("« Réinitialiser » réaffiche le bloc à 3 radios, masque le contenu et y place le focus", async () => {
    isExternalArrivalMock.mockReturnValue(false);

    const rendering = renderReset();

    fireEvent.click(rendering.getByRole("button", { name: "Réinitialiser" }));

    expect(
      rendering.getByText(
        "Personnalisez la réponse avec votre convention collective"
      )
    ).toBeInTheDocument();
    expect(
      rendering.queryByText(
        "Réponse personnalisée pour la convention collective"
      )
    ).not.toBeInTheDocument();
    // « Réinitialiser » masque la réponse (choix explicite de repartir de zéro).
    // jsdom n'applique pas la CSS DSFR : on contrôle la classe `fr-hidden` du
    // conteneur plutôt que la visibilité calculée.
    expect(getContent(rendering).parentElement?.className).toContain(
      "fr-hidden"
    );
    // Aucun radio pré-coché après réinitialisation.
    expect(
      (ccUi.radio.agreementSearchOption.get() as HTMLInputElement).checked
    ).toBe(false);
    // Le focus est déplacé sur le titre du bloc de sélection.
    await waitFor(() => {
      expect(document.activeElement).toBe(
        document.getElementById("personalize-response-title")
      );
    });
  });

  it("garde l'état résultat sans les infos de la fiche générique (fetch en échec)", () => {
    isExternalArrivalMock.mockReturnValue(true);

    const rendering = render(
      <ContributionAgreement contribution={contribution} />
    );

    expect(
      rendering.getByText("Réponse personnalisée pour la convention collective")
    ).toBeInTheDocument();
    expect(getContent(rendering)).toBeVisible();
  });
});
