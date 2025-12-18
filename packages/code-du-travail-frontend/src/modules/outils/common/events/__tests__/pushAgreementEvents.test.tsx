import { sendEvent } from "@socialgouv/matomo-next";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import {
  ConventionCollective,
  pushAgreementEvents,
} from "../pushAgreementEvents";
import { Enterprise } from "src/modules/enterprise";
import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
  MatomoAgreementEvent,
  MatomoSimulatorEvent,
} from "src/modules/analytics";

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
  complements: {
    liste_idcc: ["3239"],
  },
};

describe("Push agreement events on click next", () => {
  beforeEach(() => {
    const ma = sendEvent as jest.MockedFunction<typeof sendEvent>;
    ma.mockReset();
  });

  describe("user without agreement selected", () => {
    const data: ConventionCollective = {
      route: "not-selected",
    };
    it("should send a search type of users matomo event", () => {
      const pageTitle = "Préavis de retraite";
      pushAgreementEvents(pageTitle, data, false, false);
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(sendEvent).toHaveBeenCalledWith({
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: "click_p3",
        name: pageTitle,
      });
    });
  });

  describe("user with agreement selected", () => {
    const data: ConventionCollective = {
      route: "agreement",
      selected: agreement,
    };
    describe("agreement not treated", () => {
      it("should send matomo events", () => {
        const pageTitle = "Préavis de retraite";
        pushAgreementEvents(pageTitle, data, false, false);
        expect(sendEvent).toHaveBeenCalledTimes(3);
        expect(sendEvent).toHaveBeenNthCalledWith(1, {
          category:
            MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
          action: "click_p1",
          name: pageTitle,
        });
        expect(sendEvent).toHaveBeenNthCalledWith(2, {
          category: MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1,
          action: pageTitle,
          name: `idcc${agreement.num.toString()}`,
        });
        expect(sendEvent).toHaveBeenNthCalledWith(3, {
          category: MatomoBaseEvent.OUTIL,
          action: MatomoAgreementEvent.CC_UNTREATED,
          name: agreement.num.toString(),
        });
      });
    });
    describe("agreement treated", () => {
      it("should send matomo events", () => {
        const pageTitle = "Préavis de retraite";
        pushAgreementEvents(pageTitle, data, true, false);
        expect(sendEvent).toHaveBeenCalledTimes(3);
        expect(sendEvent).toHaveBeenNthCalledWith(1, {
          category:
            MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
          action: "click_p1",
          name: pageTitle,
        });
        expect(sendEvent).toHaveBeenNthCalledWith(2, {
          category: MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1,
          action: pageTitle,
          name: `idcc${agreement.num.toString()}`,
        });
        expect(sendEvent).toHaveBeenNthCalledWith(3, {
          category: MatomoBaseEvent.OUTIL,
          action: MatomoAgreementEvent.CC_TREATED,
          name: agreement.num.toString(),
        });
      });
    });
  });

  describe("user with enterprise selected", () => {
    const data: ConventionCollective = {
      enterprise: enterprise,
      route: "enterprise",
      selected: agreement,
    };

    it("should send matomo events", () => {
      const pageTitle = "Préavis de retraite";
      pushAgreementEvents(pageTitle, data, false, false);
      expect(sendEvent).toHaveBeenCalledTimes(4);
      expect(sendEvent).toHaveBeenNthCalledWith(1, {
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: "click_p2",
        name: pageTitle,
      });
      expect(sendEvent).toHaveBeenNthCalledWith(2, {
        category: MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
        action: pageTitle,
        name: JSON.stringify({
          label: enterprise.label,
          siren: enterprise.siren,
        }),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(3, {
        category: MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
        action: pageTitle,
        name: `idcc${agreement.num.toString()}`,
      });
      expect(sendEvent).toHaveBeenNthCalledWith(4, {
        category: MatomoBaseEvent.OUTIL,
        action: MatomoAgreementEvent.CC_UNTREATED,
        name: agreement.num.toString(),
      });
    });
  });

  describe("user with no enterprise", () => {
    const data: ConventionCollective = {
      enterprise: undefined,
      route: "enterprise",
      selected: agreement,
    };

    it("should send matomo events", () => {
      const pageTitle = "Préavis de retraite";
      pushAgreementEvents(pageTitle, data, false, true);
      expect(sendEvent).toHaveBeenCalledTimes(4);
      expect(sendEvent).toHaveBeenNthCalledWith(1, {
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: "click_p2",
        name: pageTitle,
      });
      expect(sendEvent).toHaveBeenNthCalledWith(2, {
        category: MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
        action: pageTitle,
        name: `idcc${agreement.num.toString()}`,
      });
      expect(sendEvent).toHaveBeenNthCalledWith(3, {
        category: MatomoBaseEvent.OUTIL,
        action: MatomoAgreementEvent.CC_UNTREATED,
        name: agreement.num.toString(),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(4, {
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: MatomoSimulatorEvent.SELECT_NO_COMPANY,
        name: pageTitle,
      });
    });
  });

  describe("not tracking", () => {
    it("should not send matomo events if agreement is 9999", () => {
      const agreement9999: Agreement = {
        id: "AGREEMENT_ID",
        num: 9999,
        shortTitle: "?",
        slug: "/convention/9999",
        title: "?",
        contributions: false,
      };
      const pageTitle = "Blabla";
      pushAgreementEvents(
        pageTitle,
        {
          enterprise: {
            activitePrincipale:
              "Commerce de détail en magasin non spécialisé à prédominance alimentaire",
            conventions: [agreement9999],
            etablissements: 335,
            highlightLabel:
              "<b><u>MONOPRIX</u></b> EXPLOITATION, PAR ABREVIATION MPX",
            label: "MONOPRIX EXPLOITATION, PAR ABREVIATION MPX",
            matching: 272,
            simpleLabel: "MONOPRIX EXPLOITATION",
            siren: "552083297",
            complements: {
              liste_idcc: ["9999"],
            },
          },
          route: "enterprise",
          selected: agreement9999,
        },
        false,
        false
      );
      expect(sendEvent).toHaveBeenCalledTimes(4);
      expect(sendEvent).toHaveBeenNthCalledWith(1, {
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: "click_p2",
        name: pageTitle,
      });
      expect(sendEvent).toHaveBeenNthCalledWith(2, {
        category: MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
        action: pageTitle,
        name: JSON.stringify({
          label: enterprise.label,
          siren: enterprise.siren,
        }),
      });
      expect(sendEvent).toHaveBeenNthCalledWith(3, {
        category: MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
        action: pageTitle,
        name: "idcc9999",
      });
      expect(sendEvent).toHaveBeenNthCalledWith(4, {
        category: MatomoBaseEvent.OUTIL,
        action: MatomoAgreementEvent.CC_UNTREATED,
        name: "9999",
      });
    });
  });
});
