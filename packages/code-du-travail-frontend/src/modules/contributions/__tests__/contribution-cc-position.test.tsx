import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEvent, useABTestVariant } from "@socialgouv/matomo-next";
import { ContributionGeneric } from "../ContributionGeneric";
import { Contribution } from "../type";
import { TrackingCcFunnelAction } from "../tracking";
import {
  CONTRIBUTION_CC_POSITION_TEST,
  ContributionCcPositionVariations,
} from "../../config/abTests";
import { mockAgreementSearch, ui } from "./ui";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
  useABTestVariant: jest.fn(() => null),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));

jest.mock("../../enterprise/queries");

const TESTED_SLUG = "les-conges-pour-evenements-familiaux";

// Contenu éditorial type : une introduction puis un groupe d'accordéons.
const CONTENT = `
  <p>Introduction de la fiche.</p>
  <details><summary>Décès</summary><div><p>Réponse décès.</p></div></details>
  <details><summary>Mariage</summary><div><p>Réponse mariage.</p></div></details>
`;

const buildContribution = (slug = TESTED_SLUG) =>
  ({
    date: "05/12/2023",
    isGeneric: true,
    isNoCDT: false,
    messageBlockGenericNoCDT: "",
    ccSupported: ["1388"],
    ccUnextended: [],
    type: "content",
    content: CONTENT,
    source: "contributions",
    linkedContent: [],
    references: [],
    relatedItems: [],
    idcc: "0000",
    title: "Congés pour évènements familiaux",
    slug,
    breadcrumbs: [],
    metas: { title: "SEO Title", description: "SEO Description" },
  }) as Partial<Contribution> as Contribution;

const setVariant = (variant: ContributionCcPositionVariations | null) =>
  (useABTestVariant as jest.Mock).mockImplementation((name: string) =>
    name === CONTRIBUTION_CC_POSITION_TEST ? variant : null
  );

const renderPage = (contribution = buildContribution()) =>
  render(
    <ContributionGeneric
      contribution={contribution}
      agreementDeclinations={[]}
    />
  );

/** Titres « Personnalisez la réponse… » présents dans la page. */
const blockTitles = () =>
  screen.queryAllByRole("heading", {
    level: 2,
    name: /Personnalisez la réponse avec votre convention collective/,
  });

const cdtBlock = () => document.getElementById("cdt") as HTMLElement;

const isCdtHidden = () => cdtBlock().classList.contains("fr-hidden");

const viewBlocCcEvents = () =>
  (sendEvent as jest.Mock).mock.calls
    .map(([event]) => event)
    .filter((event) => event.action === TrackingCcFunnelAction.VIEW_BLOC_CC);

beforeEach(() => {
  localStorage.clear();
  window.location.hash = "";
  (sendEvent as jest.Mock).mockReset();
  setVariant(null);
});

describe("A/B test « emplacement du bloc CC » (#7481)", () => {
  describe("témoin", () => {
    it("variante A : bloc en tête, trois options, réponse masquée", () => {
      setVariant(ContributionCcPositionVariations.A);
      renderPage();

      expect(blockTitles()).toHaveLength(1);
      expect(ui.generic.radioNoAgreement.get()).toBeInTheDocument();
      expect(isCdtHidden()).toBe(true);
      // Le bloc précède la réponse dans le DOM.
      expect(
        blockTitles()[0].compareDocumentPosition(cdtBlock()) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
    });

    it("variante inconnue (Matomo muet) : comportement témoin", () => {
      setVariant(null);
      renderPage();

      expect(blockTitles()).toHaveLength(1);
      expect(ui.generic.radioNoAgreement.get()).toBeInTheDocument();
      expect(isCdtHidden()).toBe(true);
    });

    it("hors de la fiche testée, une variante D n'a aucun effet", () => {
      setVariant(ContributionCcPositionVariations.D);
      renderPage(buildContribution("une-autre-contribution"));

      expect(blockTitles()).toHaveLength(1);
      expect(ui.generic.radioNoAgreement.get()).toBeInTheDocument();
      expect(isCdtHidden()).toBe(true);
    });
  });

  describe("variante B : réponse visible, bloc inchangé en tête", () => {
    it("affiche la réponse par défaut et retire l'option « sans CC »", () => {
      setVariant(ContributionCcPositionVariations.B);
      renderPage();

      expect(isCdtHidden()).toBe(false);
      expect(ui.generic.radioNoAgreement.query()).not.toBeInTheDocument();
      expect(ccUi.radio.agreementSearchOption.get()).toBeInTheDocument();
      expect(ccUi.radio.enterpriseSearchOption.get()).toBeInTheDocument();
      expect(blockTitles()).toHaveLength(1);
      expect(
        blockTitles()[0].compareDocumentPosition(cdtBlock()) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
      // Le bouton reste affiché (wording inchangé).
      expect(ui.generic.buttonDisplayInfo.get()).toBeInTheDocument();
    });
  });

  describe("variante C : bloc entre l'introduction et les accordéons", () => {
    it("place le bloc après l'introduction, avant le premier accordéon", () => {
      setVariant(ContributionCcPositionVariations.C);
      renderPage();

      expect(isCdtHidden()).toBe(false);
      expect(ui.generic.radioNoAgreement.query()).not.toBeInTheDocument();
      expect(blockTitles()).toHaveLength(1);

      const title = blockTitles()[0];
      const intro = screen.getByText("Introduction de la fiche.");
      const accordion = screen.getByRole("button", { name: "Décès" });
      expect(
        intro.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
      expect(
        title.compareDocumentPosition(accordion) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
      // Et dans la zone de réponse, pas en tête de page.
      expect(cdtBlock().contains(title)).toBe(true);
    });
  });

  describe("variante D : bloc en pied de chaque accordéon", () => {
    it("rend une instance par accordéon, aucune ailleurs", () => {
      setVariant(ContributionCcPositionVariations.D);
      renderPage();

      expect(isCdtHidden()).toBe(false);
      expect(ui.generic.radioNoAgreement.query()).not.toBeInTheDocument();

      const accordions = document.querySelectorAll(".fr-accordions-group");
      expect(accordions).toHaveLength(1);
      const titles = blockTitles();
      expect(titles).toHaveLength(2);
      titles.forEach((title) =>
        expect(accordions[0].contains(title)).toBe(true)
      );

      // Chaque instance ferme son accordéon : le bloc suit le dernier
      // paragraphe.
      const deathAnswer = screen.getByText("Réponse décès.");
      expect(
        deathAnswer.compareDocumentPosition(titles[0]) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
    });

    it("distingue les instances par leurs identifiants", () => {
      setVariant(ContributionCcPositionVariations.D);
      renderPage();

      const ids = blockTitles().map((title) => title.id);
      expect(new Set(ids).size).toBe(2);
      ids.forEach((id) => expect(id).toMatch(/^personalize-response-title-/));
    });

    it("n'émet view_bloc_cc qu'une fois malgré plusieurs instances", () => {
      setVariant(ContributionCcPositionVariations.D);
      renderPage();

      expect(viewBlocCcEvents()).toHaveLength(1);
    });

    it("les instances sont indépendantes : cocher l'une ne coche pas l'autre", () => {
      setVariant(ContributionCcPositionVariations.D);
      renderPage();

      const radios = ccUi.radio.agreementSearchOption.getAll();
      expect(radios).toHaveLength(2);
      radios[0].click();

      expect(radios[0]).toBeChecked();
      expect(radios[1]).not.toBeChecked();
      // Le champ de recherche n'apparaît que dans l'instance cochée.
      expect(
        within(radios[0].closest("form") ?? document.body).getAllByTestId(
          "AgreementSearchAutocomplete"
        )
      ).toHaveLength(1);
    });
  });

  describe("sélection d'une CC prise en charge", () => {
    // Retenir une CC traitée navigue vers la page CC au clic sur le bouton ;
    // entre-temps, la réponse et le bloc doivent rester à l'écran.
    const selectSupportedAgreement = async (radio: HTMLElement) => {
      mockAgreementSearch({
        num: 1388,
        shortTitle: "Industrie du pétrole",
        id: "1388",
      });
      await userEvent.click(radio);
      const input = ccUi.searchByName.input.get();
      await userEvent.click(input);
      await userEvent.type(input, "1388");
      await waitFor(() =>
        expect(
          ccUi.searchByName.autocompleteLines.IDCC1388.name.query()
        ).toBeInTheDocument()
      );
      await userEvent.click(
        ccUi.searchByName.autocompleteLines.IDCC1388.name.get()
      );
    };

    it("variante D : la réponse et les blocs restent affichés", async () => {
      setVariant(ContributionCcPositionVariations.D);
      renderPage();

      await selectSupportedAgreement(
        ccUi.radio.agreementSearchOption.getAll()[0]
      );

      expect(screen.getByText("Introduction de la fiche.")).toBeInTheDocument();
      expect(screen.getByText("Réponse décès.")).toBeInTheDocument();
      expect(blockTitles()).toHaveLength(2);
      expect(ui.generic.buttonDisplayInfo.getAll()).toHaveLength(2);
    });

    it("variante C : la réponse et le bloc restent affichés", async () => {
      setVariant(ContributionCcPositionVariations.C);
      renderPage();

      await selectSupportedAgreement(ccUi.radio.agreementSearchOption.get());

      expect(screen.getByText("Introduction de la fiche.")).toBeInTheDocument();
      expect(blockTitles()).toHaveLength(1);
    });

    it("variante A : la réponse est démontée jusqu'au clic (comportement historique)", async () => {
      setVariant(ContributionCcPositionVariations.A);
      renderPage();

      await selectSupportedAgreement(ccUi.radio.agreementSearchOption.get());

      expect(
        screen.queryByText("Introduction de la fiche.")
      ).not.toBeInTheDocument();
      expect(blockTitles()).toHaveLength(1);
    });
  });

  describe("bascule de variante après le montage", () => {
    it("passe du témoin à la variante D quand Matomo répond", () => {
      setVariant(null);
      const { rerender } = renderPage();
      expect(isCdtHidden()).toBe(true);
      expect(blockTitles()).toHaveLength(1);

      setVariant(ContributionCcPositionVariations.D);
      rerender(
        <ContributionGeneric
          contribution={buildContribution()}
          agreementDeclinations={[]}
        />
      );

      expect(isCdtHidden()).toBe(false);
      expect(blockTitles()).toHaveLength(2);
      expect(ui.generic.radioNoAgreement.query()).not.toBeInTheDocument();
      expect(viewBlocCcEvents()).toHaveLength(1);
    });
  });
});
