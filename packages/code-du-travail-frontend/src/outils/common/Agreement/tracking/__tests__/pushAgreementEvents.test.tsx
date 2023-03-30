import { Enterprise } from "../../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../../../conventions/Search/api/type";
import {
  MatomoAgreementEvent,
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import { ConventionCollective } from "../../../type/WizardType";
import { pushAgreementEvents } from "../index";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

const agreement: Agreement = {
  id: "AGREEMENT_ID",
  num: 3239,
  shortTitle: "Service à la personne",
  slug: "/convention/3239-service-a-la-personne",
  title: "Service à la personne",
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
};

describe("Push agreement events on click next", () => {
  beforeEach(() => {
    const ma = matopush as jest.MockedFunction<typeof matopush>;
    ma.mockReset();
  });

  describe("user without agreement selected", () => {
    const data: ConventionCollective = {
      route: "not-selected",
    };
    it("should send a search type of users matomo event", () => {
      const pageTitle = "Préavis de retraite";
      pushAgreementEvents(pageTitle, data, false);
      expect(matopush).toHaveBeenCalledTimes(1);
      expect(matopush).toHaveBeenCalledWith([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        "click_p3",
        pageTitle,
      ]);
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
        pushAgreementEvents(pageTitle, data, false);
        expect(matopush).toHaveBeenCalledTimes(3);
        expect(matopush).toHaveBeenNthCalledWith(1, [
          MatomoBaseEvent.TRACK_EVENT,
          MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
          "click_p1",
          pageTitle,
        ]);
        expect(matopush).toHaveBeenNthCalledWith(2, [
          MatomoBaseEvent.TRACK_EVENT,
          MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1,
          pageTitle,
          `idcc${agreement.num.toString()}`,
        ]);
        expect(matopush).toHaveBeenNthCalledWith(3, [
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          MatomoAgreementEvent.CC_UNTREATED,
          agreement.num,
        ]);
      });
    });
    describe("agreement treated", () => {
      it("should send matomo events", () => {
        const pageTitle = "Préavis de retraite";
        pushAgreementEvents(pageTitle, data, true);
        expect(matopush).toHaveBeenCalledTimes(3);
        expect(matopush).toHaveBeenNthCalledWith(1, [
          MatomoBaseEvent.TRACK_EVENT,
          MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
          "click_p1",
          pageTitle,
        ]);
        expect(matopush).toHaveBeenNthCalledWith(2, [
          MatomoBaseEvent.TRACK_EVENT,
          MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1,
          pageTitle,
          `idcc${agreement.num.toString()}`,
        ]);
        expect(matopush).toHaveBeenNthCalledWith(3, [
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          MatomoAgreementEvent.CC_TREATED,
          agreement.num,
        ]);
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
      pushAgreementEvents(pageTitle, data, false);
      expect(matopush).toHaveBeenCalledTimes(4);
      expect(matopush).toHaveBeenNthCalledWith(1, [
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        "click_p2",
        pageTitle,
      ]);
      expect(matopush).toHaveBeenNthCalledWith(2, [
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
        pageTitle,
        JSON.stringify({ label: enterprise.label, siren: enterprise.siren }),
      ]);
      expect(matopush).toHaveBeenNthCalledWith(3, [
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
        pageTitle,
        `idcc${agreement.num.toString()}`,
      ]);
      expect(matopush).toHaveBeenNthCalledWith(4, [
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        MatomoAgreementEvent.CC_UNTREATED,
        agreement.num,
      ]);
    });
  });
});
