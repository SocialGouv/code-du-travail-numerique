import React, { useRef, useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEvent } from "@socialgouv/matomo-next";
import { byRole, byTestId, byText } from "testing-library-selector";

import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { ui as entrepriseUi } from "../../enterprise/EnterpriseAgreementSearch/__tests__/ui";
import { mockAgreementSearch } from "./ui";
import { searchAgreement } from "../../convention-collective/search";
import { searchCities } from "../../enterprise/EnterpriseAgreementSearch/searchCities";
// Jeu de données d'entreprises du mock manuel du module, réinjecté par défaut
// dans `mockSearchEnterprises` (cf. plus bas).
import { searchEnterprises as enterpriseFixtures } from "../../enterprise/__mocks__/queries";
import { AgreementSearchInput } from "../../convention-collective/AgreementSearch/AgreementSearchInput";
import { EnterpriseAgreementSearchInput } from "../../enterprise/EnterpriseAgreementSearch/EnterpriseAgreementSearchInput";
import { ContributionGenericAgreementSearch } from "../ContributionGenericAgreementSearch";
import {
  TrackingCcFunnelAction,
  TrackingContributionCategory,
} from "../tracking";
import { Contribution } from "../type";
import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import { UserAction } from "src/modules/outils/common/utils/UserAction";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));

jest.mock("../../enterprise/EnterpriseAgreementSearch/searchCities", () => ({
  searchCities: jest.fn(),
}));

// Le jeu de données d'entreprises vient du mock manuel du module, mais
// `error_recherche_entreprise` exige de faire échouer la requête : on
// l'enveloppe dans un `jest.fn()` pour pouvoir le piloter au cas par cas.
// (Le préfixe `mock` est imposé par jest pour référencer la variable depuis la
// fabrique hissée ci-dessous.)
const mockSearchEnterprises = jest.fn();
jest.mock("../../enterprise/queries", () => ({
  searchEnterprises: (...args: unknown[]) => mockSearchEnterprises(...args),
}));

const TRACKING_ACTION_NAME = "/contribution/my-contrib";
// `toPageEventName` retire le slash initial : c'est la convention de nommage
// des events « page » du site (cf. src/modules/analytics/eventName.ts).
const EXPECTED_EVENT_NAME = "contribution/my-contrib";

const contribution = {
  date: "05/12/2023",
  isGeneric: true,
  isNoCDT: false,
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
  metas: { title: "SEO Title", description: "SEO Description" },
} as Partial<Contribution> as Contribution;

const funnelEvents = () =>
  (sendEvent as jest.Mock).mock.calls
    .map(([event]) => event)
    .filter(
      (event) =>
        event.category === TrackingContributionCategory.CC_SEARCH_FUNNEL
    );

const eventsFor = (action: TrackingCcFunnelAction) =>
  funnelEvents().filter((event) => event.action === action);

/** Assertion partagée : l'event est parti une fois, avec le nom de la page. */
const expectSingleFunnelEvent = (action: TrackingCcFunnelAction) =>
  expect(eventsFor(action)).toEqual([
    {
      category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
      action,
      name: EXPECTED_EVENT_NAME,
    },
  ]);

/**
 * La façade contribution attend un `selectedAgreement` piloté par la page :
 * ce harnais tient cet état pour que le bloc réagisse comme en production
 * (bouton actif/inactif, alerte « pas de réponse pour cette CC »).
 */
const Harness = ({
  contribution: contributionProp = contribution,
  defaultAgreement,
  defaultRoute,
}: {
  contribution?: Contribution;
  defaultAgreement?: Agreement;
  defaultRoute?: AgreementRoute;
}) => {
  const [selectedAgreement, setSelectedAgreement] = useState<
    Agreement | undefined
  >(defaultAgreement);
  const personalizeTitleRef = useRef<HTMLParagraphElement>(null);
  return (
    <ContributionGenericAgreementSearch
      contribution={contributionProp}
      onAgreementSelect={(agreement) => setSelectedAgreement(agreement)}
      onDisplayClick={() => {}}
      selectedAgreement={selectedAgreement}
      trackingActionName={TRACKING_ACTION_NAME}
      personalizeTitleRef={personalizeTitleRef}
      defaultRoute={defaultRoute}
    />
  );
};

const ui = {
  whatIsAgreementLink: byRole("link", {
    name: /La convention collective, c'est quoi/,
  }),
  displayInfoButton: byText("Afficher les informations"),
  modifyEnterpriseButton: byTestId("modify-enterprise-button"),
  modifyAgreementButton: byRole("button", { name: "Modifier" }),
  externalAgreementLink: byRole("link", { name: "ici" }),
  enterpriseResults: {
    hypermarches: byText("CARREFOUR HYPERMARCHES"),
    proximite: byText("CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)"),
    bricomanie: byText("BRICOMANIE"),
  },
  enterpriseAgreementRadio: byRole("radio", {
    name: /Commerce de détail et de gros à prédominance alimentaire IDCC 2216/,
  }),
  locationOptionParis: byText("Paris (75)"),
};

/** Ouvre le parcours 2 et lance une recherche d'entreprise aboutie. */
const searchEnterprise = async (query: string) => {
  const userAction = new UserAction();
  userAction.click(ccUi.radio.enterpriseSearchOption.get());
  userAction.setInput(ccUi.searchByEnterprise.input.get(), query);
  await act(async () => {
    userAction.click(ccUi.searchByEnterprise.submitButton.get());
  });
};

beforeEach(() => {
  (sendEvent as jest.Mock).mockReset();
  mockSearchEnterprises.mockReset();
  mockSearchEnterprises.mockImplementation(enterpriseFixtures);
  (searchAgreement as jest.Mock).mockReset();
  (searchCities as jest.Mock).mockReset();
});

describe("Funnel de choix de convention collective (contributions)", () => {
  describe("entrée dans le funnel", () => {
    it("émet view_bloc_cc à l'affichage du bloc", () => {
      render(<Harness />);

      expectSingleFunnelEvent(TrackingCcFunnelAction.VIEW_BLOC_CC);
    });

    it("n'émet view_bloc_cc qu'une fois, même après plusieurs rendus", () => {
      const { rerender } = render(<Harness />);
      rerender(<Harness />);
      // Témoin : le bloc est toujours à l'écran après le second rendu.
      expect(ui.displayInfoButton.get()).toBeInTheDocument();

      expect(eventsFor(TrackingCcFunnelAction.VIEW_BLOC_CC)).toHaveLength(1);
    });

    it("émet click_c_est_quoi_une_cc au clic sur le lien d'explication", () => {
      render(<Harness />);

      new UserAction().click(ui.whatIsAgreementLink.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.CLICK_WHAT_IS_AGREEMENT);
    });
  });

  describe("choix du parcours", () => {
    it("émet select_p1 au clic sur « je sais quelle est ma CC »", () => {
      render(<Harness />);

      new UserAction().click(ccUi.radio.agreementSearchOption.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.SELECT_P1);
    });

    it("émet select_p2 au clic sur « je cherche mon entreprise »", () => {
      render(<Harness />);

      new UserAction().click(ccUi.radio.enterpriseSearchOption.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.SELECT_P2);
    });

    it("émet select_p3 au clic sur « je ne souhaite pas renseigner »", () => {
      render(<Harness />);

      new UserAction().click(
        screen.getByLabelText(
          /Je ne souhaite pas renseigner ma convention collective\./
        )
      );

      expectSingleFunnelEvent(TrackingCcFunnelAction.SELECT_P3);
    });

    it("n'émet aucun select_pX quand la route est seulement pré-cochée (defaultRoute)", async () => {
      render(<Harness defaultRoute="enterprise" />);

      await waitFor(() =>
        expect(
          (ccUi.radio.enterpriseSearchOption.get() as HTMLInputElement).checked
        ).toBe(true)
      );
      expect(eventsFor(TrackingCcFunnelAction.SELECT_P1)).toHaveLength(0);
      expect(eventsFor(TrackingCcFunnelAction.SELECT_P2)).toHaveLength(0);
      expect(eventsFor(TrackingCcFunnelAction.SELECT_P3)).toHaveLength(0);
    });

    it("n'émet aucun select_pX quand une CC est déjà sélectionnée (defaultAgreement)", async () => {
      render(
        <Harness
          defaultAgreement={
            {
              num: 1388,
              id: "1388",
              shortTitle: "Industrie du pétrole",
              slug: "1388-industrie-du-petrole",
              title: "Industrie du pétrole",
              contributions: true,
            } as Agreement
          }
        />
      );

      await waitFor(() =>
        expect(
          (ccUi.radio.agreementSearchOption.get() as HTMLInputElement).checked
        ).toBe(true)
      );
      expect(eventsFor(TrackingCcFunnelAction.SELECT_P1)).toHaveLength(0);
    });
  });

  describe("parcours 1 — recherche par nom de convention", () => {
    it("émet start_recherche_cc à la première frappe", async () => {
      mockAgreementSearch({
        num: 1388,
        shortTitle: "Industrie du pétrole",
        id: "1388",
      });
      render(<Harness />);

      new UserAction().click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "1388");

      expectSingleFunnelEvent(TrackingCcFunnelAction.START_AGREEMENT_SEARCH);
    });

    it("n'émet start_recherche_cc qu'une fois, quel que soit le nombre de frappes", async () => {
      mockAgreementSearch({
        num: 1388,
        shortTitle: "Industrie du pétrole",
        id: "1388",
      });
      render(<Harness />);

      new UserAction().click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "1388");

      // Témoin : sans cette assertion, le test passerait à vide si la
      // recherche cessait d'être déclenchée à chaque caractère.
      expect((searchAgreement as jest.Mock).mock.calls.length).toBeGreaterThan(
        1
      );
      expect(
        eventsFor(TrackingCcFunnelAction.START_AGREEMENT_SEARCH)
      ).toHaveLength(1);
    });

    it("émet no_result_cc quand la recherche ne remonte aucune convention", async () => {
      (searchAgreement as jest.Mock).mockResolvedValue([]);
      render(<Harness />);

      new UserAction().click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "zzz");

      // Témoin : la recherche de plus de deux caractères a bien été lancée.
      await waitFor(() => expect(searchAgreement).toHaveBeenCalledWith("zzz"));
      // L'état « aucun résultat » n'est atteint qu'au-delà de deux caractères :
      // un seul event pour la saisie « zzz ».
      expectSingleFunnelEvent(TrackingCcFunnelAction.NO_RESULT_AGREEMENT);
    });
  });

  describe("parcours 2 — recherche par entreprise", () => {
    it("émet start_recherche_entreprise à la première frappe, une seule fois", async () => {
      render(<Harness />);

      new UserAction().click(ccUi.radio.enterpriseSearchOption.get());
      await userEvent.click(ccUi.searchByEnterprise.input.get());
      await userEvent.type(ccUi.searchByEnterprise.input.get(), "carrefour");

      // Témoin : la saisie a bien été prise en compte dans son intégralité.
      expect(ccUi.searchByEnterprise.input.get()).toHaveValue("carrefour");
      expectSingleFunnelEvent(TrackingCcFunnelAction.START_ENTERPRISE_SEARCH);
    });

    it("émet submit_recherche_entreprise à chaque soumission", async () => {
      render(<Harness />);

      await searchEnterprise("carrefour");
      await searchEnterprise("bnp");

      expect(
        eventsFor(TrackingCcFunnelAction.SUBMIT_ENTERPRISE_SEARCH)
      ).toHaveLength(2);
    });

    it("émet no_result_entreprise quand la recherche ne remonte rien", async () => {
      render(<Harness />);

      await searchEnterprise("entreprise-inconnue");

      expectSingleFunnelEvent(TrackingCcFunnelAction.NO_RESULT_ENTERPRISE);
    });

    it("émet error_recherche_entreprise quand l'API échoue", async () => {
      mockSearchEnterprises.mockRejectedValueOnce("Service indisponible");
      render(<Harness />);

      await searchEnterprise("carrefour");

      expectSingleFunnelEvent(TrackingCcFunnelAction.ERROR_ENTERPRISE_SEARCH);
    });

    it("émet select_localisation quand une ville est renseignée", async () => {
      (searchCities as jest.Mock).mockResolvedValue([
        {
          nom: "Paris",
          codesPostaux: ["75001", "75002"],
          codeDepartement: "75",
          population: 2133111,
        },
      ]);
      render(<Harness />);

      new UserAction().click(ccUi.radio.enterpriseSearchOption.get());
      await userEvent.click(entrepriseUi.input.get());
      await userEvent.type(entrepriseUi.input.get(), "Paris");
      await waitFor(() =>
        expect(ui.locationOptionParis.query()).toBeInTheDocument()
      );
      await userEvent.click(ui.locationOptionParis.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.SELECT_LOCATION);
    });

    it("émet select_entreprise au clic sur une carte entreprise", async () => {
      render(<Harness />);

      await searchEnterprise("carrefour");
      new UserAction().click(ui.enterpriseResults.hypermarches.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.SELECT_ENTERPRISE);
    });

    it("émet entreprise_sans_cc quand l'entreprise ne déclare aucune convention", async () => {
      render(<Harness />);

      await searchEnterprise("bricomanie");
      new UserAction().click(ui.enterpriseResults.bricomanie.get());

      expect(
        entrepriseUi.enterpriseAgreementSearch.errorNotFound.notDeclared.query()
      ).toBeInTheDocument();
      expectSingleFunnelEvent(
        TrackingCcFunnelAction.ENTERPRISE_WITHOUT_AGREEMENT
      );
    });

    it("émet select_cc_entreprise au choix d'une CC parmi celles de l'entreprise", async () => {
      render(<Harness />);

      await searchEnterprise("carrefour");
      const userAction = new UserAction();
      userAction.click(ui.enterpriseResults.hypermarches.get());
      userAction.click(ui.enterpriseAgreementRadio.get());

      expectSingleFunnelEvent(
        TrackingCcFunnelAction.SELECT_ENTERPRISE_AGREEMENT
      );
    });

    it("émet select_particulier_employeur au clic sur la carte dédiée", async () => {
      render(<Harness />);

      new UserAction()
        .click(ccUi.radio.enterpriseSearchOption.get())
        .click(entrepriseUi.enterpriseAgreementSearch.childminder.title.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.SELECT_HOUSEHOLD_EMPLOYER);
    });
  });

  describe("retours arrière", () => {
    it("émet click_modifier_entreprise au clic sur « Modifier » de l'entreprise", async () => {
      render(<Harness />);

      await searchEnterprise("carrefour");
      const userAction = new UserAction();
      userAction.click(ui.enterpriseResults.hypermarches.get());
      userAction.click(ui.modifyEnterpriseButton.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.CLICK_MODIFY_ENTERPRISE);
    });

    it("émet click_modifier_cc au clic sur « Modifier » de la CC sélectionnée", async () => {
      render(<Harness />);

      await searchEnterprise("carrefour");
      new UserAction().click(ui.enterpriseResults.proximite.get());

      // L'entreprise n'a qu'une convention : on arrive directement sur l'écran
      // « Vous avez sélectionné la convention collective ».
      expect(
        byText(/Vous avez sélectionné la convention collective/).query()
      ).toBeInTheDocument();
      await act(async () => {
        new UserAction().click(ui.modifyAgreementButton.get());
      });

      expectSingleFunnelEvent(TrackingCcFunnelAction.CLICK_MODIFY_AGREEMENT);
    });
  });

  describe("bouton « Afficher les informations »", () => {
    it("émet click_afficher_les_informations pour toute tentative, même bloquée", () => {
      render(<Harness />);

      new UserAction().click(ui.displayInfoButton.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.CLICK_DISPLAY_INFORMATION);
    });

    it("émet blocked_sans_option quand aucune option n'est cochée", () => {
      render(<Harness />);

      new UserAction().click(ui.displayInfoButton.get());

      expectSingleFunnelEvent(TrackingCcFunnelAction.BLOCKED_WITHOUT_ROUTE);
    });

    it("émet blocked_sans_cc_p1 quand le parcours 1 est ouvert sans CC choisie", () => {
      render(<Harness />);

      new UserAction()
        .click(ccUi.radio.agreementSearchOption.get())
        .click(ui.displayInfoButton.get());

      expectSingleFunnelEvent(
        TrackingCcFunnelAction.BLOCKED_WITHOUT_AGREEMENT_P1
      );
    });

    it("émet blocked_sans_cc_p2 quand le parcours 2 est ouvert sans CC choisie", () => {
      render(<Harness />);

      new UserAction()
        .click(ccUi.radio.enterpriseSearchOption.get())
        .click(ui.displayInfoButton.get());

      expectSingleFunnelEvent(
        TrackingCcFunnelAction.BLOCKED_WITHOUT_AGREEMENT_P2
      );
    });
  });

  describe("alerte « pas de réponse pour cette convention »", () => {
    it("émet show_alerte_cc_non_traitee une seule fois pour une CC non traitée", async () => {
      mockAgreementSearch({
        num: 16,
        shortTitle: "Transports routiers et activités auxiliaires du transport",
        id: "0016",
      });
      render(<Harness />);

      new UserAction().click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "16");
      await waitFor(() =>
        expect(
          ccUi.searchByName.autocompleteLines.IDCC16.name.query()
        ).toBeInTheDocument()
      );
      new UserAction().click(
        ccUi.searchByName.autocompleteLines.IDCC16.name.get()
      );

      expect(ccUi.warning.nonTreatedAgreement.query()).toBeInTheDocument();
      expectSingleFunnelEvent(
        TrackingCcFunnelAction.SHOW_UNTREATED_AGREEMENT_ALERT
      );
    });

    it("n'émet pas show_alerte_cc_non_traitee pour une CC traitée", async () => {
      mockAgreementSearch({
        num: 1388,
        shortTitle: "Industrie du pétrole",
        id: "1388",
      });
      render(<Harness />);

      new UserAction().click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "1388");
      await waitFor(() =>
        expect(
          ccUi.searchByName.autocompleteLines.IDCC1388.name.query()
        ).toBeInTheDocument()
      );
      new UserAction().click(
        ccUi.searchByName.autocompleteLines.IDCC1388.name.get()
      );

      // Témoin : la CC a bien été retenue (le bloc n'affiche pas l'alerte).
      expect(ccUi.warning.title.query()).not.toBeInTheDocument();
      expect(
        eventsFor(TrackingCcFunnelAction.SHOW_UNTREATED_AGREEMENT_ALERT)
      ).toHaveLength(0);
    });

    it("émet click_lien_cc_externe au clic sur le lien « ici » de l'alerte", async () => {
      mockAgreementSearch({
        num: 1388,
        shortTitle: "Industrie du pétrole",
        id: "1388",
      });
      render(
        <Harness
          contribution={
            {
              ...contribution,
              isNoCDT: true,
              ccSupported: [],
              ccUnextended: ["1388"],
            } as Contribution
          }
        />
      );

      new UserAction().click(ccUi.radio.agreementSearchOption.get());
      await userEvent.click(ccUi.searchByName.input.get());
      await userEvent.type(ccUi.searchByName.input.get(), "1388");
      await waitFor(() =>
        expect(
          ccUi.searchByName.autocompleteLines.IDCC1388.name.query()
        ).toBeInTheDocument()
      );
      new UserAction().click(
        ccUi.searchByName.autocompleteLines.IDCC1388.name.get()
      );

      expect(ccUi.warning.noCdtUnextendedAgreement.query()).toBeInTheDocument();
      new UserAction().click(ui.externalAgreementLink.get());

      expectSingleFunnelEvent(
        TrackingCcFunnelAction.CLICK_EXTERNAL_AGREEMENT_LINK
      );
    });
  });
});

// Les deux composants de recherche sont partagés avec les simulateurs, la page
// « Trouver sa convention collective » et les widgets : sans `funnelTracking`,
// aucun event de la catégorie du funnel ne doit partir.
describe("Non-régression : aucun event de funnel hors contributions", () => {
  it("<AgreementSearchInput /> sans funnelTracking n'émet aucun event cc_search_funnel", async () => {
    mockAgreementSearch({
      num: 1388,
      shortTitle: "Industrie du pétrole",
      id: "1388",
    });
    render(<AgreementSearchInput level={2} onAgreementSelect={jest.fn()} />);

    await userEvent.click(ccUi.searchByName.input.get());
    await userEvent.type(ccUi.searchByName.input.get(), "1388");
    await waitFor(() =>
      expect(
        ccUi.searchByName.autocompleteLines.IDCC1388.name.query()
      ).toBeInTheDocument()
    );
    new UserAction().click(
      ccUi.searchByName.autocompleteLines.IDCC1388.name.get()
    );

    expect(funnelEvents()).toHaveLength(0);
  });

  it("<EnterpriseAgreementSearchInput /> sans funnelTracking n'émet aucun event cc_search_funnel", async () => {
    render(
      <EnterpriseAgreementSearchInput
        level={2}
        onAgreementSelect={jest.fn()}
        trackingActionName="Simulateur - Indemnité de licenciement"
      />
    );

    const userAction = new UserAction();
    userAction.setInput(
      entrepriseUi.enterpriseAgreementSearch.input.get(),
      "carrefour"
    );
    await act(async () => {
      userAction.click(
        entrepriseUi.enterpriseAgreementSearch.submitButton.get()
      );
    });
    userAction.click(
      entrepriseUi.enterpriseAgreementSearch.resultLines.carrefour.title.get()
    );

    // Témoin : le parcours a bien avancé (les events historiques, eux, partent).
    expect((sendEvent as jest.Mock).mock.calls.length).toBeGreaterThan(0);
    expect(funnelEvents()).toHaveLength(0);
  });
});
