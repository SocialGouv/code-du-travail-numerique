/** @jest-environment jsdom */
import { sendEvent } from "@socialgouv/matomo-next";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import {
  ConventionCollective,
  pushAgreementEvents,
} from "../pushAgreementEvents";
import { Enterprise } from "src/modules/enterprise";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

const agreement: Agreement = {
  id: "AGREEMENT_ID",
  num: 3239,
  shortTitle: "Service à la personne",
  slug: "/convention/3239-service-a-la-personne",
  title: "Service à la personne",
  contributions: false,
};

const enterprise: Enterprise = {
  activitePrincipale:
    "Commerce de détail en magasin non spécialisé à prédominance alimentaire",
  conventions: [agreement],
  etablissements: 335,
  highlightLabel: "<b><u>MONOPRIX</u></b> EXPLOITATION, PAR ABREVIATION MPX",
  label: "MONOPRIX EXPLOITATION, PAR ABREVIATION MPX",
  matching: 272,
  simpleLabel: "MONOPRIX EXPLOITATION",
  siren: "552083297",
  siret: "55208329700012",
  address: "123 RUE DU BONHEUR 75000 PARIS",
  matchingEtablissementCount: 0,
  complements: {
    liste_idcc: ["3239"],
  },
};

const SIMULATOR = "Préavis de retraite";
const SIMULATOR_PATH = "outils/preavis-retraite";

// Émis depuis un store zustand : `sendPageEvent` lit la route sur
// `window.location`, pas via `usePathname()`.
const name = (payload: Record<string, unknown>): string =>
  JSON.stringify({ path: SIMULATOR_PATH, ...payload });

describe("Push agreement events on click next", () => {
  beforeEach(() => {
    window.history.pushState({}, "", `/${SIMULATOR_PATH}`);
    (sendEvent as jest.MockedFunction<typeof sendEvent>).mockReset();
  });

  // Tous ces events prennent la catégorie de la PAGE (`outil`), là où l'ancien
  // schéma répartissait la même étape de parcours sur quatre catégories
  // différentes : `cc_search_type_of_users`, `cc_select_p1`, `cc_select_p2`,
  // `enterprise_select` et `outil`.
  describe("user without agreement selected", () => {
    const data: ConventionCollective = { route: "not-selected" };

    it("envoie le parcours p3", () => {
      pushAgreementEvents(SIMULATOR, data, false, false);

      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(sendEvent).toHaveBeenCalledWith({
        category: "outil",
        action: "select_agreement_path_p3",
        name: name({ context: SIMULATOR }),
      });
    });
  });

  describe("user with agreement selected", () => {
    const data: ConventionCollective = {
      route: "agreement",
      selected: agreement,
    };

    it("envoie parcours p1, sélection de CC et support, CC non traitée", () => {
      pushAgreementEvents(SIMULATOR, data, false, false);

      expect(sendEvent).toHaveBeenCalledTimes(3);
      expect(sendEvent).toHaveBeenNthCalledWith(1, {
        category: "outil",
        action: "select_agreement_path_p1",
        name: name({ context: SIMULATOR }),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(2, {
        category: "outil",
        action: "select_agreement_p1",
        name: name({ context: SIMULATOR, idcc: agreement.num }),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(3, {
        category: "outil",
        action: "select_agreement_unsupported",
        name: name({ context: SIMULATOR, idcc: agreement.num }),
      });
    });

    it("distingue une CC prise en charge", () => {
      pushAgreementEvents(SIMULATOR, data, true, false);

      expect(sendEvent).toHaveBeenNthCalledWith(3, {
        category: "outil",
        action: "select_agreement_supported",
        name: name({ context: SIMULATOR, idcc: agreement.num }),
      });
    });
  });

  describe("user with enterprise selected", () => {
    const data: ConventionCollective = {
      enterprise,
      route: "enterprise",
      selected: agreement,
    };

    it("envoie parcours p2, entreprise, sélection de CC et support", () => {
      pushAgreementEvents(SIMULATOR, data, false, false);

      expect(sendEvent).toHaveBeenCalledTimes(4);
      expect(sendEvent).toHaveBeenNthCalledWith(1, {
        category: "outil",
        action: "select_agreement_path_p2",
        name: name({ context: SIMULATOR }),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(2, {
        category: "outil",
        action: "select_enterprise",
        name: name({
          context: SIMULATOR,
          label: enterprise.label,
          siren: enterprise.siren,
        }),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(3, {
        category: "outil",
        action: "select_agreement_p2",
        name: name({ context: SIMULATOR, idcc: agreement.num }),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(4, {
        category: "outil",
        action: "select_agreement_unsupported",
        name: name({ context: SIMULATOR, idcc: agreement.num }),
      });
    });
  });

  describe("user with no enterprise", () => {
    const data: ConventionCollective = {
      enterprise: undefined,
      route: "enterprise",
      selected: agreement,
    };

    it("ajoute l'event « je n'ai pas d'entreprise »", () => {
      pushAgreementEvents(SIMULATOR, data, false, true);

      expect(sendEvent).toHaveBeenCalledTimes(4);
      expect(sendEvent).toHaveBeenNthCalledWith(4, {
        category: "outil",
        action: "select_no_enterprise",
        name: name({ context: SIMULATOR }),
      });
    });
  });

  describe("convention 9999 (non identifiée)", () => {
    const agreement9999: Agreement = {
      id: "AGREEMENT_ID",
      num: 9999,
      shortTitle: "?",
      slug: "/convention/9999",
      title: "?",
      contributions: false,
    };

    it("émet quand même le parcours (le filtrage 9999 est en amont)", () => {
      pushAgreementEvents(
        SIMULATOR,
        {
          enterprise: { ...enterprise, conventions: [agreement9999] },
          route: "enterprise",
          selected: agreement9999,
        },
        false,
        false
      );

      expect(sendEvent).toHaveBeenCalledTimes(4);
    });
  });
});
